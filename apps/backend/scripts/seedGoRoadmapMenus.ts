/**
 * GO 学习路线图菜单种子脚本（委托到通用批量导入器）
 *
 * 等价于: bun run scripts/seed-menus.ts --config config/menus-go-roadmap.json
 *
 * 接受额外参数透传:
 *   bun run scripts/seedGoRoadmapMenus.ts --clean
 *   bun run scripts/seedGoRoadmapMenus.ts --dry-run
 */

import { spawn } from 'child_process'
import { resolve } from 'path'

const scriptPath = resolve(__dirname || import.meta.dirname || '.', 'seed-menus.ts')
const configPath = resolve(__dirname || import.meta.dirname || '.', '..', 'config', 'menus-go-roadmap.json')

const extraArgs = process.argv.slice(2)

const args = ['run', scriptPath, '--config', configPath, ...extraArgs]
const child = spawn('bun', args, { stdio: 'inherit', cwd: resolve(__dirname || '.', '..') })

child.on('close', (code) => {
  process.exit(code || 0)
})
