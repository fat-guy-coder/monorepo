import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import path from 'path';


// 从 API 获取菜单数据
async function fetchMenu() {
  const API_URL = process.env.API_URL || 'http://localhost:3000';
  const response = await fetch(`${API_URL}/api/menus`);
  const result = await response.json();
  if (result.code !== 200) {
    throw new Error(result.message || 'Failed to fetch menu');
  }
  return result.data;
}

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










//菜单类型
interface MenuItem {
  id: string;
  label: string;
  name: string;
  path: string;
  icon?: string;
  order?: number;
  children?: MenuItem[];
  redirect?: { name: string };
}


// 路由项类型
interface RouteItem {
  name: string;
  path: string;
  component?: string;
  children?: RouteItem[];
  redirect?: { name: string };
}

// 递归生成路由
function addRouteToRouter(routes: MenuItem[]): RouteItem[] {
  const recursive = (routes: MenuItem[]): RouteItem[] => {
    return routes.map(({ name, path, children, redirect }) => {
      // 检查是否有子菜单（有非空 children 数组）
      const hasChildren = children && children.length > 0
      if (hasChildren) {
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
  const template = readFileSync(config.TemplateVueFile, 'utf8')
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
        //根据label和提示器调取外部模型生成Template
        writeFileSync(vueFilePath, getTemplateVue(item.label));
      }
    }
  });
}



//生成路由文件routes.ts
function generateRoutesFile(filePath: string, menu: MenuItem[]) {
  const routes = addRouteToRouter(menu);
  const content = `export default ${JSON.stringify(routes, null, 2).replace(/"component": "(.+?)"/g, '"component": $1')};
  `;
  writeFileSync(filePath, content, 'utf-8');
}



//主函数
async function main() {
  // 从 API 获取菜单
  const menu = await fetchMenu();
  console.log('获取到菜单数据:', menu.length, '条');

  //生成页面单文件
  generateView(menu, config.GenrateFolderPath);

  //生成路由文件routes.ts
  generateRoutesFile(config.GenrateRoutesFilePath, menu);

  console.log('路由和视图生成完成');
}

main();
