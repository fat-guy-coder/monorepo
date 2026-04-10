// scripts/gen-api.ts
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import { Command } from 'commander';
import prettier from 'prettier';
import { genApiConfig } from '../../config/index';

type OpenAPI = any;

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

type Operation = {
  operationId?: string;
  summary?: string;
  description?: string;
  parameters?: any[];
  requestBody?: any;
  responses?: any;
};

type PathItem = {
  [key in HttpMethod]?: Operation;
};

type SchemaObject = {
  type?: string;
  format?: string;
  properties?: Record<string, SchemaObject>;
  required?: string[];
  items?: SchemaObject;
  enum?: Array<string | number | boolean | null>;
  additionalProperties?: boolean | SchemaObject;
  oneOf?: SchemaObject[];
  anyOf?: SchemaObject[];
  allOf?: SchemaObject[];
  $ref?: string;
  description?: string;
};

function toPascalCase(input: string): string {
  return input
    .replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, (_, __, c) => c.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');
}

function toCamelCase(input: string): string {
  const pascal = toPascalCase(input);
  return pascal ? pascal[0].toLowerCase() + pascal.slice(1) : input;
}

function resolveRefName(ref: string): string {
  // #/components/schemas/Name
  const parts = ref.split('/');
  return parts[parts.length - 1];
}

function isObjectSchema(s: SchemaObject | undefined): boolean {
  return !!s && (s.type === 'object' || (!!s.properties && typeof s.additionalProperties !== 'boolean'));
}

function schemaToTs(
  schema: SchemaObject | undefined,
  ctx: {
    refToTypeName: (ref: string) => string;
  }
): string {
  if (!schema) return 'unknown';

  if (schema.$ref) {
    return ctx.refToTypeName(schema.$ref);
  }

  if (schema.oneOf && schema.oneOf.length) {
    return schema.oneOf.map((s) => schemaToTs(s, ctx)).join(' | ');
  }

  if (schema.anyOf && schema.anyOf.length) {
    return schema.anyOf.map((s) => schemaToTs(s, ctx)).join(' | ');
  }

  if (schema.allOf && schema.allOf.length) {
    // naive intersection
    return schema.allOf.map((s) => schemaToTs(s, ctx)).join(' & ');
  }

  const processObject = (s: SchemaObject) => {
    if (s.additionalProperties) {
      if (s.additionalProperties === true) return 'Record<string, unknown>';
      return `Record<string, ${schemaToTs(s.additionalProperties as SchemaObject, ctx)}>`;
    }
    const props = s.properties ?? {};
    const required = new Set(s.required ?? []);
    const lines = Object.entries(props).map(([k, v]) => {
      const optional = required.has(k) ? '' : '?';
      const description = v.description ? `/** ${v.description} */\n` : '';
      return `${description}${JSON.stringify(k)}${optional}: ${schemaToTs(v, ctx)};`;
    });
    return `{\n${lines.join('\n')}\n}`;
  };

  switch (schema.type) {
    case 'string':
      if (schema.enum) {
        return schema.enum.map((v) => JSON.stringify(v)).join(' | ');
      }
      return 'string';
    case 'integer':
    case 'number':
      if (schema.enum) {
        return schema.enum.map((v) => JSON.stringify(v)).join(' | ');
      }
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'array':
      return `Array<${schemaToTs(schema.items, ctx)}>`;
    case 'object':
      return processObject(schema);
    default:
      if (isObjectSchema(schema)) {
        return processObject(schema);
      }
      return 'unknown';
  }
}

function pickSuccessResponseSchema(op: any): SchemaObject | undefined {
  const resp = op.responses?.['200'] ?? op.responses?.['201'] ?? op.responses?.['default'];
  const content = resp?.content?.['application/json'] ?? resp?.content?.['application/*+json'];
  return content?.schema;
}

function pickRequestBodySchema(op: any): SchemaObject | undefined {
  const content = op.requestBody?.content?.['application/json'] ?? op.requestBody?.content?.['application/*+json'];
  return content?.schema;
}

function getServerBaseFromSpec(spec: OpenAPI): string {
  const url: string | undefined = spec?.servers?.[0]?.url;
  // 过滤掉完整 URL，只保留路径部分（如 /api/v2）
  if (typeof url === 'string') {
    // 如果是完整 URL（包含 http:// 或 https://），返回空字符串
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return '';
    }
    return url;
  }
  return '';
}

function scanSwaggerFiles(apiV2Dir: string): Array<{ module: string; swaggerPath: string }> {
  if (!fs.existsSync(apiV2Dir)) return [];
  const modules = fs.readdirSync(apiV2Dir, { withFileTypes: true }).filter((d) => d.isDirectory());
  const results: Array<{ module: string; swaggerPath: string }> = [];
  for (const m of modules) {
    // 优先查找 swagger.yaml，如果不存在则查找 swagger.json
    const swaggerYamlPath = path.join(apiV2Dir, m.name, 'swagger.yaml');
    const swaggerJsonPath = path.join(apiV2Dir, m.name, 'swagger.json');
    let swaggerPath: string | null = null;

    if (fs.existsSync(swaggerYamlPath)) {
      swaggerPath = swaggerYamlPath;
    } else if (fs.existsSync(swaggerJsonPath)) {
      swaggerPath = swaggerJsonPath;
    }

    if (swaggerPath) {
      results.push({ module: m.name, swaggerPath });
    }
  }
  return results;
}

async function emitModuleApi(
  opts: {
    module: string;
    swaggerPath: string;
    outDir: string;
    outFile?: string;
    serverBase?: string;
    urlPrefix?: string;
  }
): Promise<void> {
  const raw = fs.readFileSync(opts.swaggerPath, 'utf-8');
  const isJson = opts.swaggerPath.endsWith('.json');
  const spec = isJson ? JSON.parse(raw) as OpenAPI : yaml.load(raw) as OpenAPI;

  const serverBaseFromSpec = getServerBaseFromSpec(spec);
  const serverBase = (serverBaseFromSpec || opts.serverBase || '').replace(/\/$/, '');
  const urlPrefix = serverBaseFromSpec ? '' : opts.urlPrefix ?? '';

  const schemas: Record<string, SchemaObject> = spec?.components?.schemas ?? {};

  // 构建 schema name -> type name 的映射，处理 def-* 等自动命名的情况
  const schemaNameToTypeName: Record<string, string> = {};
  for (const [name, schema] of Object.entries(schemas)) {
    // 如果有 title，使用 title 作为类型名
    schemaNameToTypeName[name] = (schema as any).title || name;
  }

  const refToTypeName = (ref: string) => {
    const resolved = resolveRefName(ref);
    return schemaNameToTypeName[resolved] || resolved;
  };

  const typeChunks: string[] = [];
  for (const [name, schema] of Object.entries(schemas)) {
    const typeName = schemaNameToTypeName[name];
    const ts = schemaToTs(schema, { refToTypeName });
    const asInterface = schema.type === 'object' || (!!schema.properties && !schema.additionalProperties);
    if (asInterface && ts.startsWith('{')) {
      typeChunks.push(`export interface ${typeName} ${ts}`);
    } else {
      typeChunks.push(`export type ${typeName} = ${ts};`);
    }
  }

  const funcChunks: string[] = [];
  const pathsObj: Record<string, PathItem> = spec?.paths ?? {};

  for (const [p, methods] of Object.entries(pathsObj)) {
    for (const [m, op] of Object.entries(methods ?? {})) {
      const method = m.toLowerCase() as HttpMethod;
      if (!['get', 'post', 'put', 'delete', 'patch'].includes(method)) continue;

      const operationId: string | undefined = op.operationId;
      const funcName = operationId ? toCamelCase(operationId) : toCamelCase(`${method}_${p}`);

      const pathParams = (op.parameters ?? []).filter((x: any) => x.in === 'path');
      const queryParams = (op.parameters ?? []).filter((x: any) => x.in === 'query');

      const reqSchema = pickRequestBodySchema(op);
      const respSchema = pickSuccessResponseSchema(op);

      // Extract the actual data type from response schema
      // The Fastify response is { code, message, data: T } but ApiResult already wraps this
      // So we need to extract 'data' property type, not the whole wrapper
      let respType = 'unknown';
      if (respSchema) {
        if (respSchema.type === 'object' && respSchema.properties?.data) {
          // Extract data property type from { code, message, data: T }
          respType = schemaToTs(respSchema.properties.data as SchemaObject, { refToTypeName });
        } else {
          respType = schemaToTs(respSchema, { refToTypeName });
        }
      }

      const urlPath = `${urlPrefix}${serverBase}${p}`.replace(/\/\//g, '/');
      const urlExpr = '`' + urlPath.replace(/\{([^}]+)\}/g, '${encodeURIComponent(String($1))}') + '`';

      const args: string[] = [];
      const argNames: string[] = [];

      const jsdocLines: string[] = ['/**'];
      if (op.summary) jsdocLines.push(` * ${op.summary}`);
      if (op.description) jsdocLines.push(` * ${op.description}`);

      for (const pp of pathParams) {
        const n = pp.name as string;
        const t = schemaToTs(pp.schema, { refToTypeName });
        args.push(`${n}: ${t}`);
        argNames.push(n);
        if (pp.description) jsdocLines.push(` * @param ${n} - ${pp.description}`);
      }

      if (queryParams.length) {
        const paramsTypeName = `${toPascalCase(funcName)}Params`;
        const qpSchema: SchemaObject = {
          type: 'object',
          properties: Object.fromEntries(queryParams.map(q => [q.name, q.schema])),
          required: queryParams.filter(q => q.required).map(q => q.name)
        };
        typeChunks.push(`export interface ${paramsTypeName} ${schemaToTs(qpSchema, { refToTypeName })}`);
        const isOptional = queryParams.every((q: any) => !q.required);
        args.push(`params${isOptional ? '?' : ''}: ${paramsTypeName}`);
        argNames.push('params');
        jsdocLines.push(` * @param params - Query parameters`);
      }

      const bodyTypeRaw = reqSchema ? schemaToTs(reqSchema, { refToTypeName }) : undefined;
      if (bodyTypeRaw) {
        let bodyArgTypeName = bodyTypeRaw;
        if (reqSchema && !reqSchema.$ref && isObjectSchema(reqSchema)) {
          const reqTypeName = `${toPascalCase(funcName)}Request`;
          typeChunks.push(`export interface ${reqTypeName} ${bodyTypeRaw}`);
          bodyArgTypeName = reqTypeName;
        }
        args.push(`data: ${bodyArgTypeName}`);
        argNames.push('data');
        jsdocLines.push(` * @param data - Request body`);
      }

      jsdocLines.push(' */');

      const requestObjLines: string[] = [
        `url: ${urlExpr},`,
        `method: '${method}',`,
      ];

      if (queryParams.length) requestObjLines.push('params,');
      if (bodyTypeRaw) requestObjLines.push('data,');

      funcChunks.push(
        `${jsdocLines.join('\n')}\n` +
        `export function ${funcName}(${args.join(', ')}): ApiResult<${respType}> {\n` +
        `  return request({\n    ${requestObjLines.join('\n    ')}\n  })\n` +
        `}`
      );
    }
  }

  const defaultRequestImportCode = "import { request, type ApiResult } from '@/request'";
  const requestImportCode = genApiConfig.requestImportCode || defaultRequestImportCode;

  const header = [
    requestImportCode,
    ``,
  ].join('\n');

  const output =
    header +
    (typeChunks.length ? typeChunks.join('\n\n') + '\n\n' : '') +
    funcChunks.join('\n\n') +
    '\n';

  const outFileName = opts.outFile ?? `${opts.module}.ts`;
  const outPath = path.join(opts.outDir, outFileName);

  const prettierOptions = await prettier.resolveConfig(outPath);
  const formattedOutput = await prettier.format(output, {
    ...prettierOptions,
    parser: 'typescript',
  });

  if (!fs.existsSync(opts.outDir)) fs.mkdirSync(opts.outDir, { recursive: true });
  fs.writeFileSync(outPath, formattedOutput, 'utf-8');
  console.log(`[gen-api] Generated ${outPath} from ${opts.swaggerPath}`);
}

async function main() {
  const program = new Command();
  program
    .name('gen-api')
    .description('Generate ui2/src/api/*.ts from server/api/v2/**/swagger.yaml')
    .option('--apiV2Dir <dir>', 'Directory containing modules with swagger.yaml', genApiConfig.apiV2Dir)
    .option('--outDir <dir>', 'Output directory for generated api ts files', genApiConfig.outDir)
    .option('--module <name>', 'Generate only one module (folder name under apiV2Dir)')
    .option('--swagger <path>', 'Generate from a specific swagger.yaml file (overrides --module)')
    .option('--outFile <file>', 'Output filename (overrides default <module>.ts)')
    .option('--serverBase <base>', 'Override server base url (e.g. /api/v2). Default read from swagger servers[0].url', genApiConfig.serverBase)
    .option('--urlPrefix <prefix>', 'URL prefix for all api calls', genApiConfig.urlPrefix);

  program.parse(process.argv);
  const opts = program.opts();

  const apiV2Dir = path.resolve(opts.apiV2Dir);
  const outDir = path.resolve(opts.outDir);

  if (opts.swagger) {
    const swaggerPath = path.resolve(opts.swagger);
    const moduleName = opts.module ?? path.basename(path.dirname(swaggerPath));
    await emitModuleApi({
      module: moduleName,
      swaggerPath,
      outDir,
      outFile: opts.outFile,
      serverBase: opts.serverBase,
      urlPrefix: opts.urlPrefix,
    });
    return;
  }

  if (opts.module) {
    // 优先查找 swagger.yaml，如果不存在则查找 swagger.json
    const swaggerYamlPath = path.join(apiV2Dir, opts.module, 'swagger.yaml');
    const swaggerJsonPath = path.join(apiV2Dir, opts.module, 'swagger.json');
    let swaggerPath: string | null = null;

    if (fs.existsSync(swaggerYamlPath)) {
      swaggerPath = swaggerYamlPath;
    } else if (fs.existsSync(swaggerJsonPath)) {
      swaggerPath = swaggerJsonPath;
    }

    if (!swaggerPath) {
      throw new Error(`[gen-api] swagger.yaml or swagger.json not found for module: ${opts.module} at ${apiV2Dir}/${opts.module}`);
    }

    await emitModuleApi({
      module: opts.module,
      swaggerPath,
      outDir,
      outFile: opts.outFile,
      serverBase: opts.serverBase,
      urlPrefix: opts.urlPrefix,
    });
    return;
  }

  const swags = scanSwaggerFiles(apiV2Dir);
  if (!swags.length) {
    console.log(`[gen-api] No swagger.yaml found under ${apiV2Dir}`);
    return;
  }

  for (const { module, swaggerPath } of swags) {
    await emitModuleApi({
      module,
      swaggerPath,
      outDir,
      serverBase: opts.serverBase,
      urlPrefix: opts.urlPrefix,
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
