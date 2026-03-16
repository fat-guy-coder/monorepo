import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const prisma = new PrismaClient()

// 递归导入菜单
async function importMenus(items, parentId = null, order = 0) {
  for (const item of items) {
    const menu = await prisma.menu.create({
      data: {
        name: item.name,
        label: item.label,
        path: item.path || null,
        icon: item.icon || null,
        order: order,
        parentId: parentId
      }
    })

    console.log(`Created menu: ${menu.label}`)

    if (item.children && item.children.length > 0) {
      await importMenus(item.children, menu.id, 0)
    }

    order++
  }
}

async function main() {
  try {
    const menuPath = path.join(__dirname, '../menu.json')
    const menuData = JSON.parse(fs.readFileSync(menuPath, 'utf-8'))

    // 清空现有菜单
    await prisma.menu.deleteMany()
    console.log('Cleared existing menus')

    // 导入菜单
    await importMenus(menuData)

    console.log('Import completed!')
  } catch (error) {
    console.error('Import failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
