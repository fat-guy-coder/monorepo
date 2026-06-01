/**
 * 通用菜单批量导入器 — 数据驱动，从 JSON 配置文件读取菜单树并导入。
 *
 * 用法:
 *   bun run scripts/seed-menus.ts --config config/menus-go-roadmap.json
 *   bun run scripts/seed-menus.ts --config config/menus-go-roadmap.json --clean
 *   bun run scripts/seed-menus.ts --config config/menus-go-roadmap.json --dry-run
 *
 * 环境变量:
 *   API_BASE — 后端 API 地址（默认 http://47.108.233.237:3000）
 */

import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// ==================== 配置解析 ====================

const args = process.argv.slice(2)

function getArg(key: string): string | undefined {
  const idx = args.indexOf(key)
  return idx >= 0 && idx + 1 < args.length ? args[idx + 1] : undefined
}

function hasArg(key: string): boolean {
  return args.includes(key)
}

const configPath = getArg('--config') || getArg('-c')
const dryRun = hasArg('--dry-run') || hasArg('-n')
const clean = hasArg('--clean')
const API_BASE = process.env.API_BASE || 'http://47.108.233.237:3000'

if (!configPath) {
  console.error('❌ 请指定配置文件: --config <path>')
  console.error('   示例: bun run scripts/seed-menus.ts --config config/menus-go-roadmap.json')
  process.exit(1)
}

const fullPath = resolve(configPath)
if (!existsSync(fullPath)) {
  console.error(`❌ 配置文件不存在: ${fullPath}`)
  process.exit(1)
}

// ==================== 类型定义 ====================

interface TreeNode {
  name: string
  label: string
  icon?: string
  order?: number
  children?: TreeNode[]
}

interface ConfigFile {
  project: string
  parentId: string
  items: TreeNode[]
}

interface BatchResult {
  created: number
  skipped: number
  failed: number
  details: { label: string; path: string; status: string }[]
}

// ==================== API 调用 ====================

async function apiPost<T = any>(url: string, data: any): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json: any = await res.json()
  if (res.ok && (json.code === 200 || json.code === 201)) return json.data
  throw new Error(`HTTP ${res.status}: ${json.message || JSON.stringify(json)}`)
}

async function apiDelete<T = any>(url: string, data?: any): Promise<T> {
  const res = await fetch(url, {
    method: 'DELETE',
    headers: data ? { 'Content-Type': 'application/json' } : undefined,
    body: data ? JSON.stringify(data) : undefined,
  })
  const json: any = await res.json()
  if (res.ok && json.code === 200) return json.data
  throw new Error(`HTTP ${res.status}: ${json.message || JSON.stringify(json)}`)
}

async function apiGetChildren(parentId: string): Promise<any[]> {
  const res = await fetch(`${API_BASE}/api/menus/${parentId}/children`)
  const json: any = await res.json()
  if (json.code === 200) return json.data
  throw new Error(`HTTP ${res.status}: ${json.message}`)
}

// ==================== 核心逻辑 ====================

function countAll(config: ConfigFile): number {
  function count(items: TreeNode[]): number {
    let n = 0
    for (const item of items) {
      n++
      if (item.children) n += count(item.children)
    }
    return n
  }
  return count(config.items)
}

function printTree(items: TreeNode[], indent = ''): void {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const isLast = i === items.length - 1
    const prefix = indent + (isLast ? '└── ' : '├── ')
    const icon = item.icon || ''
    console.log(`${prefix}${icon} ${item.label} [${item.name}]`)
    if (item.children && item.children.length > 0) {
      printTree(item.children, indent + (isLast ? '    ' : '│   '))
    }
  }
}

async function main() {
  // 1. 读取配置
  console.log('📄 读取配置文件:', fullPath)
  const raw = readFileSync(fullPath, 'utf-8')
  let config: ConfigFile
  try {
    config = JSON.parse(raw)
  } catch (e: any) {
    console.error('❌ JSON 解析失败:', e.message)
    process.exit(1)
  }

  if (!config.project || !config.parentId || !config.items) {
    console.error('❌ 配置文件缺少必要字段: project, parentId, items')
    process.exit(1)
  }

  const totalItems = countAll(config)
  console.log(`   project: ${config.project}`)
  console.log(`   parentId: ${config.parentId}`)
  console.log(`   总菜单数: ${totalItems}`)
  console.log()

  // 2. 预览模式
  if (dryRun) {
    console.log('🔍 ===== 预览模式（不执行） =====\n')
    console.log(`父菜单 ID: ${config.parentId}`)
    console.log(`项目: ${config.project}\n`)
    printTree(config.items)
    console.log(`\n📊 将创建 ${totalItems} 个菜单（7 个阶段 + ${totalItems - 7} 个知识点）`)
    return
  }

  // 3. 检查父菜单是否存在
  console.log('🔍 检查父菜单...')
  try {
    const children = await apiGetChildren(config.parentId)
    console.log(`   父菜单已有 ${children.length} 个子菜单`)
    for (const child of children) {
      console.log(`     - [${child.name}] ${child.label}`)
    }
  } catch (e: any) {
    console.error(`❌ 无法访问父菜单 (${config.parentId}):`, e.message)
    process.exit(1)
  }
  console.log()

  // 4. 清理模式：先删除父菜单下所有子菜单
  if (clean) {
    console.log('🧹 清理模式：删除父菜单下所有子菜单...')
    try {
      const result = await apiDelete(`${API_BASE}/api/menus/batch`, { parentId: config.parentId })
      console.log(`   ✅ 已删除 ${result.deleted} 个子菜单\n`)
    } catch (e: any) {
      console.error('❌ 清理失败:', e.message)
      process.exit(1)
    }
  }

  // 5. 批量创建
  console.log(`🐹 开始批量创建 ${totalItems} 个菜单...\n`)
  try {
    const result: BatchResult = await apiPost(`${API_BASE}/api/menus/batch`, {
      project: config.project,
      parentId: config.parentId,
      items: config.items,
    })

    // 6. 输出结果
    console.log()
    console.log('═══════════════════════════════════════')
    console.log('🐹 批量导入完成！')
    console.log(`   新建: ${result.created} 个`)
    console.log(`   跳过: ${result.skipped} 个（已存在）`)
    console.log(`   失败: ${result.failed} 个`)
    console.log('═══════════════════════════════════════')

    if (result.failed > 0) {
      console.log('\n⚠️  失败项:')
      result.details.filter(d => d.status === 'failed').forEach(d => {
        console.error(`   ❌ ${d.label}`)
      })
    }

    console.log()
    console.log('💡 刷新前端页面即可在左侧菜单看到完整树形结构。')
  } catch (e: any) {
    console.error('\n❌ 批量创建失败:', e.message)
    process.exit(1)
  }
}

main().catch(err => {
  console.error('❌ 脚本异常:', err)
  process.exit(1)
})
