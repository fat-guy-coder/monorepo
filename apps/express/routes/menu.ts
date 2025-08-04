import { Request, Response, NextFunction } from 'express'
import { Router } from 'express'
const menu = require('../JSON/menu.json')

interface MenuItem {
  label: string
  name: string
  level: number
  children?: MenuItem[] | null
}


const menuOneLevel: MenuItem[] = menu.map((item: MenuItem) => {
  return {
    label: item.label,
    name: item.name,
    level: item.level,
    children: []
  }
})


const getChildrenByName = (name: string) => {
  const recursiveMenu = (menu: MenuItem[], name: string): MenuItem[] | null => {
    for (const item of menu) {
      if (item.name === name) {
        return item.children?.map(i => ({ ...i, children: i.children?[]:null })) || null
      } else {
        if (item.children) {
          const child = recursiveMenu(item.children, name)
          if (child) {
            return child
          }
        }
      }
    }
    return null
  }
  return recursiveMenu(menu, name)
}

const router = Router()

router.get('/menu', (req: Request, res: Response, next: NextFunction) => {
  if (req.query.name) {
    const children = getChildrenByName(req.query.name as string)
    console.log(children)
    res.json({
      code: 200,
      data: {
        menu: children
      }
    })
  } else {
    res.json({
      code: 200,
      data: {
        menu: menuOneLevel
      }
    })
  }
})



export default router