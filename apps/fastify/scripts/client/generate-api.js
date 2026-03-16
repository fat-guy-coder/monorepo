import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import yaml from 'yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 读取 swagger.yaml
const swaggerPath = path.join(__dirname, '../../swagger.yaml')
const swaggerContent = fs.readFileSync(swaggerPath, 'utf-8')
const openapi = yaml.parse(swaggerContent)

// 生成请求函数
function generateRequestFunction(method, path, operation) {
  const summary = operation.summary || ''
  const tags = operation.tags?.[0] || 'default'

  // 转换路径参数 {id} -> :id
  const urlPath = path.replace(/\{(\w+)\}/g, ':$1')

  // 生成函数名
  let functionName = operation.operationId || urlPath.replace(/[\/:-]/g, '_').replace(/^_/, '')

  // 确定参数类型
  const params = operation.parameters || []
  const pathParams = params.filter(p => p.in === 'query')
  const bodyParam = operation.requestBody

  // 生成函数体
  const lines = []
  lines.push(`/** ${summary} */`)
  lines.push(`export async function ${functionName}(`)

  // 参数
  const paramNames = []
  if (pathParams.length > 0) {
    lines.push(`  params: { ${pathParams.map(p => `${p.name}: ${p.required ? 'string' : 'string?'}`).join(', ')} },`)
    paramNames.push('params')
  }
  if (bodyParam) {
    lines.push(`  data?: Record<string, unknown>,`)
    paramNames.push('data')
  }
  if (path.includes(':')) {
    const pathId = path.match(/:(\w+)/)?.[1]
    if (pathId) {
      lines.push(`  ${pathId}: string,`)
      paramNames.push(pathId)
    }
  }

  lines.push(`): Promise<${operation.responses?.['200']?.schema?.$ref ? 'any' : 'unknown'}>`)
  lines.push(`{`)

  // 构建 URL
  let url = urlPath
  if (pathParams.length > 0) {
    const query = pathParams.map(p => `\${params.${p.name}}`).join('&')
    url += `?\${params.${pathParams[0].name}}`
  }

  lines.push(`  return request('${method.toUpperCase()}', '${url}', ${bodyParam ? 'data' : 'undefined'})`)
  lines.push(`}`)

  return { tags, lines: lines.join('\n') }
}

// 按标签分组
const tags = {}
const modules = new Set()

for (const [path, methods] of Object.entries(openapi.paths)) {
  for (const [method, operation] of Object.entries(methods)) {
    if (!['get', 'post', 'put', 'delete', 'patch'].includes(method)) continue

    const result = generateRequestFunction(method, path, operation)
    const tag = result.tags

    if (!tags[tag]) {
      tags[tag] = []
    }
    tags[tag].push(result.lines)
    modules.add(tag)
  }
}

// 生成 index.ts
const indexLines = []
indexLines.push('// API 请求函数')
indexLines.push('import { request } from \'@/utils/request\'')
indexLines.push('')

for (const tag of modules) {
  indexLines.push(`export * from './${tag}'`)
}

fs.writeFileSync(path.join(__dirname, '../../src/api/index.ts'), indexLines.join('\n'))

// 按模块生成文件
for (const [tag, functions] of Object.entries(tags)) {
  const content = [
    '// API 请求函数',
    'import { request } from \'@/utils/request\'',
    '',
    ...functions,
    ''
  ].join('\n')

  const safeFileName = tag.replace(/[^a-zA-Z0-9]/g, '_')
  fs.writeFileSync(path.join(__dirname, `../../src/api/${safeFileName}.ts`), content)
  console.log(`Generated: src/api/${safeFileName}.ts`)
}

// 生成 request 工具函数（如果不存在）
const requestUtilPath = path.join(__dirname, '../../src/utils/request.ts')
if (!fs.existsSync(requestUtilPath)) {
  const requestUtil = `import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000
})

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export default request
`
  fs.mkdirSync(path.join(__dirname, '../../src/utils'), { recursive: true })
  fs.writeFileSync(requestUtilPath, requestUtil)
  console.log('Generated: src/utils/request.ts')
}

console.log('API generated successfully!')
