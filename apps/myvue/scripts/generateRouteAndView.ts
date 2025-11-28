import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import path from 'path';
//import { program } from 'commander'
import { select } from '@inquirer/prompts'
//引入菜单
import menu from '../src/menu/menu.json';


//配置json
const config = {
  //生成的路由文件路径
  GenrateRoutesFilePath: "src/router/generatedRoutes.ts",
  //生成的页面(view)文件父文件夹路径
  GenrateFolderPath: 'src/views',
  //生成的页面(view)文件父文件夹路径 别名 适配动态import路径
  GenrateViewFatherFolderPath: '@/views',
  //模板view单vue文件路径
  TemplateVueFile: 'template/index.vue',
  default_config: true,
  useAi: '',
  useCss: ''
}



async function getArg() {

  const default_config = await select({
    message: '是否默认配置',
    choices: [
      {
        name: '默认配置',
        value: true,
        description: '使用默认配置',
      },
      {
        name: '自定义配置',
        value: false,
        description: '根据选项生成配置',
      },
    ],
  })

  let useAi = 'base'

  let useCss = 'yes'

  if (!default_config) {
    const useAi = await select({
      message: '选择基础或者ai生成vue模板单文件',
      choices: [
        {
          name: '基础版本',
          value: 'base',
          description: '基础版本，提供拖拽布局和文字、图片编辑',
        },
        {
          name: 'ai生成',
          value: 'ai',
          description: '根据ai生成模板文件',
        },
      ],
    })

    if (useAi === 'ai') {
      useCss = await select({
        message: '是否根据模板css文件格式生成模板',
        choices: [
          { name: '好', value: 'yes', description: 'ai会根据模板css样式生成template', },
          { name: '自由生成', value: 'ai', description: 'ai自由发挥样式', },
        ]
      })
    }

  }

  return { useAi, useCss, default_config }
}



const options = await getArg()

Object.assign(config, options)



//菜单类型
interface MenuItem {
  label: string;
  title: string;
  name: string;
  path: string;
  children?: MenuItem[];
  redirect?: { name: string };
}


// 递归生成路由
function addRouteToRouter(routes: MenuItem[]) {
  const recursive = (routes: MenuItem[]) => {
    return routes.map(({ name, path, children, redirect }) => {
      if (children) {
        return {
          name,
          path,
          // component: RouterView,
          children: recursive(children)
        }
      } else {
        const item: any = {
          name,
          path,
        }
        if (redirect) {
          item.redirect = redirect
        } else {
          item.component = `() => import('${config.GenrateViewFatherFolderPath}${path}.vue')`
        }
        return item
      }
    })
  }
  return recursive(routes)
}

//读取模板vue文件
function getTemplateVue(title: string) {
  const template = readFileSync(config.TemplateVueFile, 'utf8', 'ss')
  return template.replace('<h3>Hello World</h3>', `<h3>${title}</h3>`)
}

// getTemplateVue()

//递归生成view单文件
function generateView(menu: MenuItem[], basePath: string) {
  menu.forEach(item => {
    const itemPath = path.join(basePath, item.name);
    if (item.children) {
      // Create directory
      if (!existsSync(itemPath)) {
        mkdirSync(itemPath, { recursive: true });
      }
      // Recursively generate subdirectories and files
      generateView(item.children, itemPath);
    } else {
      const vueFilePath = `${itemPath}.vue`;
      // Create single vue file
      if (!existsSync(vueFilePath) && !item.redirect) {
        //根据title和提示器调取外部模型生成Template
        writeFileSync(vueFilePath, getTemplateVue(item.title));
      }
    }
  });
}



//生成路由文件routes.ts
function generateRoutesFile(filePath: string) {
  const routes = addRouteToRouter(menu as MenuItem[]);
  const content = `export default ${JSON.stringify(routes, null, 2).replace(/"component": "(.+?)"/g, '"component": $1')};
  `;
  writeFileSync(filePath, content, 'utf-8');
}



//生成页面单文件
generateView(menu as MenuItem[], config.GenrateFolderPath);

//生成路由文件routes.ts
generateRoutesFile(config.GenrateRoutesFilePath);

//生成路由
