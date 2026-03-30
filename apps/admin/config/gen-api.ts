import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UI2_ROOT = path.resolve(__dirname, '..');

export const genApiConfig = {
  apiV2Dir: path.resolve(UI2_ROOT, '..', 'fastify', 'api'),
  outDir: path.resolve(UI2_ROOT, 'src', 'api'),
  serverBase: '', // Default can be empty, will be read from swagger spec
  urlPrefix: '', // 路由已在 swagger 中包含 /api 前缀
  requestImportCode: "import { http , type ApiResult } from '@/utils/http'",
};
