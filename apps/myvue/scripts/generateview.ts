import fs from 'fs';
import path from 'path';
import menu from '../src/menu';


const flat = process.argv[2]










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
function addRouteToRouter(routes: MenuItem[], flat: boolean) {
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
        const item = {
          name,
          path,
          redirect,
          component: redirect ? undefined : `() => import('${StaicPath}${path}.vue')`
        }
        if (flat) {
          arr.push({
            name, redirect,
            component: redirect ? undefined : `() => import('${StaicPath}${path}.vue')`
          })
        }
        return item
      }
    })
  }
  const res = recursive(routes)
  return flat ? arr : res
}

function generateView(menu: MenuItem[], basePath: string) {
  menu.forEach(item => {
    const itemPath = path.join(basePath, item.name);
    if (item.children) {
      // Create directory
      if (!fs.existsSync(itemPath)) {
        fs.mkdirSync(itemPath, { recursive: true });
      }
      // Recursively generate subdirectories and files
      generateView(item.children, itemPath);
    } else {
      // Create single vue file
      const vueFilePath = `${itemPath}.vue`;
      if (!fs.existsSync(vueFilePath)) {
        fs.writeFileSync(vueFilePath, `<template>\n  <div>${item.title}</div>\n</template>\n<script lang="ts" setup>\n</script>\n<style scoped>\n</style>\n`);
      }
    }
  });
}




function generateTsFile(filePath: string) {
  const routes = addRouteToRouter(menu as MenuItem[], !!flat);
  const content = `export default ${JSON.stringify(routes, null, 2).replace(/"component": "(.+?)"/g, '"component": $1')};
  `;
  fs.writeFileSync(filePath, content, 'utf-8');
}




//生成文件
generateView(menu as MenuItem[], GenratePath);

// 示例调用
// const tsFilePath = path.join(__dirname, 'generatedMenu.ts');
generateTsFile(GenrateRoutesPath);

//生成路由
