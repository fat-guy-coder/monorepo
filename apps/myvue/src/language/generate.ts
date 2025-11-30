import fs from 'fs'
import path from 'path'
import * as compiler from '@vue/compiler-sfc'
import MagicString from 'magic-string'
import type { SupportedLanguage } from './index'

// --- 类型定义 ---
export interface TranslateAPIConfig {
  name: string;
  type: 'google' | 'baidu' | 'youdao' | 'microsoft' | 'libre' | 'custom';
  endpoint?: string;
  apiKey?: string;
  appId?: string;
  enabled: boolean;
  priority: number;
  translateFn?: (text: string, from: string, to: string) => Promise<string>;
}

export interface TranslationConfig {
  files: string[];
  apis: TranslateAPIConfig[];
}

// --- 配置加载 ---
export function loadConfig(configPath: string = path.join(process.cwd(), 'apps/myvue/src/language/translation.config.json')): TranslationConfig {
  if (!fs.existsSync(configPath)) {
    throw new Error(`Translation config file not found at: ${configPath}`);
  }
  const rawConfig = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(rawConfig) as TranslationConfig;
}

// --- 翻译函数 ---
const languageCodeMap: Record<SupportedLanguage, string> = {
  'zh-CN': 'zh', 'en-US': 'en', 'ja-JP': 'ja', 'ko-KR': 'ko', 'fr-FR': 'fr', 'de-DE': 'de', 'es-ES': 'es', 'ru-RU': 'ru'
}
function getLanguageCode(lang: SupportedLanguage): string { return languageCodeMap[lang] || lang.split('-')[0] }

async function translateWithLibre(text: string, from: string, to: string, endpoint: string): Promise<string> {
  try {
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ q: text, source: from, target: to, format: 'text' }) });
    if (!response.ok) throw new Error(`LibreTranslate API error: ${response.statusText}`);
    const data = await response.json();
    return data.translatedText || text;
  } catch (error) {
    console.error('LibreTranslate error:', error);
    throw error;
  }
}

async function translateWithAPI(text: string, from: SupportedLanguage, to: SupportedLanguage, apiConfig: TranslateAPIConfig): Promise<string> {
  const fromCode = getLanguageCode(from);
  const toCode = getLanguageCode(to);
  if (fromCode === toCode) return text;
  if (apiConfig.translateFn) return apiConfig.translateFn(text, fromCode, toCode);
  switch (apiConfig.type) {
    case 'libre':
      if (!apiConfig.endpoint) throw new Error('LibreTranslate endpoint is required');
      return translateWithLibre(text, fromCode, toCode, apiConfig.endpoint);
    // 在此可以添加其他翻译API的实现
  }
  throw new Error(`Unsupported or disabled API type: ${apiConfig.type}`);
}

// --- 核心功能 ---

function containsChinese(text: string): boolean {
  return /[\u4e00-\u9fa5]/.test(text);
}

function processVueFile(filePath: string): Map<string, string> {
  console.log(`- Processing file: ${filePath}`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const s = new MagicString(fileContent);
  const { descriptor } = compiler.parse(fileContent, { sourceMap: true });
  const textsToTranslate = new Map<string, string>();
  let keyIndex = 0;

  if (descriptor.template) {
    compiler.walk(descriptor.template.ast, {
      enter(node) {
        if (node.type === 2 /* TEXT */) {
          const text = node.content.trim();
          if (text && containsChinese(text)) {
            const key = `text_${keyIndex++}`;
            textsToTranslate.set(key, text);
            s.overwrite(node.loc.start.offset, node.loc.end.offset, `{{ t('${key}') }}`);
          }
        }
        if (node.type === 1 /* ELEMENT */) {
          node.props.forEach(prop => {
            if (prop.type === 6 /* ATTRIBUTE */ && prop.value?.content && containsChinese(prop.value.content)) {
              const text = prop.value.content.trim();
              const key = `${prop.name}_${keyIndex++}`;
              textsToTranslate.set(key, text);
              s.overwrite(prop.loc.start.offset, prop.loc.end.offset, `:${prop.name}="t('${key}')"`);
            }
          });
        }
      }
    });
  }

  if (textsToTranslate.size > 0) {
    if (descriptor.scriptSetup) {
      if (!descriptor.scriptSetup.content.includes('useI18n')) {
        s.prependLeft(descriptor.scriptSetup.loc.start.offset, `import { useI18n } from 'vue-i18n';\nconst { t } = useI18n();\n`);
      }
    } else {
      s.append(`\n<script setup>\nimport { useI18n } from 'vue-i18n';\nconst { t } = useI18n();\n</script>`);
    }
    fs.writeFileSync(filePath, s.toString());
    console.log(`  File updated with t() functions: ${filePath}`);
  }

  return textsToTranslate;
}

async function runAutoTranslate(filesToProcess: string[]) {
  console.log('Starting translation process...');
  const config = loadConfig();
  const { apis } = config;
  const enabledAPIs = apis.filter(api => api.enabled).sort((a, b) => a.priority - b.priority);

  if (!enabledAPIs.length) {
    console.error('No enabled translation APIs found in config. Exiting.');
    return;
  }

  if (!files || files.length === 0) {
    console.warn('No files specified in translation.config.json. Exiting.');
    return;
  }

  for (const filePath of files) {
    const absolutePath = path.join(process.cwd(), filePath);
    if (!fs.existsSync(absolutePath)) {
      console.error(`File not found: ${absolutePath}. Skipping.`);
      continue;
    }

    const extractedTexts = processVueFile(absolutePath);

    if (extractedTexts.size === 0) {
      console.log(`No Chinese texts found in ${filePath}. Skipping.`);
      continue;
    }

    console.log(`  Translating ${extractedTexts.size} texts for ${filePath}...`);

    const zhCN = Object.fromEntries(extractedTexts);
    const enUS = {};

    for (const [key, text] of extractedTexts.entries()) {
      try {
        const translatedText = await translateWithAPI(text, 'zh-CN', 'en-US', enabledAPIs[0]);
        enUS[key] = translatedText as string;
        await new Promise(resolve => setTimeout(resolve, 200)); // API rate limit
      } catch (e) {
        console.error(`  Failed to translate text: "${text}". Using original.`, e);
        enUS[key] = text; // Fallback to original text
      }
    }

    const langJson = {
      'zh-CN': zhCN,
      'en-US': enUS,
    };

    const outputDir = path.dirname(absolutePath);
    const outputFileName = path.basename(absolutePath, '.vue') + '.lang.json';
    const outputPath = path.join(outputDir, outputFileName);

    fs.writeFileSync(outputPath, JSON.stringify(langJson, null, 2), 'utf-8');
    console.log(`  Successfully generated language file: ${outputPath}\n`);
  }

  console.log('Translation process finished!');
}

// --- 脚本入口 ---
if (typeof process !== 'undefined') {
  const args = process.argv.slice(2);
  const targetFile = args.find(arg => arg.endsWith('.vue'));

  if (targetFile) {
    console.log(`Processing single file from command line: ${targetFile}`);
    runAutoTranslate([targetFile]).catch(console.error);
  } else {
    console.log('No specific file provided, processing files from config...');
    const config = loadConfig();
    runAutoTranslate(config.files).catch(console.error);
  }
}
