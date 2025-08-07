import { existsSync, mkdirSync, writeFileSync,readFileSync } from 'fs';
import path from 'path';
import menu from '../src/menu';


// const flat = process.argv[2]



// const menuPath = path.join(process.cwd(), '/src/menu/menu.json')







interface MenuItem {
  label: string;
  title: string;
  name: string;
  path: string;
  children?: MenuItem[];
  redirect?: { name: string };
}



const GenratePath = 'src/views';

const GenrateRoutesPath = 'src/router/generatedRoutes.ts';

const StaicPath = '@/views'


// 递归生成路由
function addRouteToRouter(routes: MenuItem[]) {
  const arr: any[] = []
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
          item.component = `() => import('${StaicPath}${path}.vue')`
        }
        return item
      }
    })
  }
  return recursive(routes)
}

function generateView(menu: MenuItem[], basePath: string) {
  menu.forEach(item => {
    const itemPath = path.join(basePath, item.name);
    if (item.children) {
      // Create directory
      if (existsSync(itemPath)) {
        mkdirSync(itemPath, { recursive: true });
      }
      // Recursively generate subdirectories and files
      generateView(item.children, itemPath);
    } else {
      // Create single vue file
      const vueFilePath = `${itemPath}.vue`;
      if (!existsSync(vueFilePath)) {
        writeFileSync(vueFilePath, `<template>\n  <div>${item.title}</div>\n</template>\n<script lang="ts" setup>\n</script>\n<style scoped>\n</style>\n`);
      }
    }
  });
}




function generateTsFile(filePath: string) {
  const routes = addRouteToRouter(menu as MenuItem[]);
  const content = `export default ${JSON.stringify(routes, null, 2).replace(/"component": "(.+?)"/g, '"component": $1')};
  `;
  writeFileSync(filePath, content, 'utf-8');
}

// watch(path.join(process.cwd(), '/src/menu/menu.json'), (eventType, filename, ...rest) => {
//   if (eventType === 'change' && filename) {
//     console.log(`${filename} 文件发生变化`);
//     console.log(rest)
//     // generateView(menu as MenuItem[], GenratePath);
//     // generateTsFile(GenrateRoutesPath);
//   }
// });






//生成文件
generateView(menu as MenuItem[], GenratePath);

// 示例调用
// const tsFilePath = path.join(__dirname, 'generatedMenu.ts');
generateTsFile(GenrateRoutesPath);

//生成路由
