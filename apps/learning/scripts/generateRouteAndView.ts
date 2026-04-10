import { existsSync, mkdirSync, writeFileSync, readFileSync, rmSync, readdirSync, statSync } from 'fs';
import path from 'path';


// 从 API 获取菜单数据
async function fetchMenu() {
  const API_URL = process.env.API_URL || 'http://localhost:3000';
  const response = await fetch(`${API_URL}/api/menus?project=learning`);
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

// 检查是否有 --clean 参数
const shouldClean = process.argv.includes('--clean');









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

// 收集所有叶子节点的路径（用于清理）
const leafNodeFolders: Set<string> = new Set();

//递归生成view单文件
function generateView(menu: MenuItem[], basePath: string) {
  menu.forEach(item => {
    const itemPath = path.join(basePath, item.name);
    if (item.children && item.children.length > 0) {
      // 有子菜单才创建目录
      if (!existsSync(itemPath)) {
        mkdirSync(itemPath, { recursive: true });
      }
      // 递归生成子目录和文件
      generateView(item.children, itemPath);
    } else {
      // 叶子节点：只生成 .vue 文件，不生成文件夹
      const vueFilePath = `${itemPath}.vue`;
      if (!existsSync(vueFilePath) && !item.redirect) {
        //根据label和提示器调取外部模型生成Template
        writeFileSync(vueFilePath, getTemplateVue(item.label));
      }
      // 记录叶子节点的父目录（用于后续清理空的叶子节点文件夹）
      leafNodeFolders.add(basePath);
    }
  });
}

// 清理空文件夹（叶子节点不应该有文件夹）
function cleanupEmptyLeafFolders(basePath: string) {
  if (!existsSync(basePath)) return;

  const entries = readdirSync(basePath);

  for (const entry of entries) {
    const fullPath = path.join(basePath, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // 递归清理子目录
      cleanupEmptyLeafFolders(fullPath);

      // 检查清理后目录是否为空
      const remaining = readdirSync(fullPath);
      if (remaining.length === 0) {
        console.log('Removing empty folder:', fullPath);
        rmSync(fullPath, { recursive: true, force: true });
      }
    }
  }
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

  // 只有传入 --clean 参数时才清理空文件夹
  if (shouldClean) {
    console.log('开始清理空文件夹...');
    cleanupEmptyLeafFolders(config.GenrateFolderPath);
  }

  //生成页面单文件
  generateView(menu, config.GenrateFolderPath);

  //生成路由文件routes.ts
  generateRoutesFile(config.GenrateRoutesFilePath, menu);

  console.log('路由和视图生成完成');
}

main();
