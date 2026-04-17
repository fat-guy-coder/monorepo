import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
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
  //生成的页面(view)文件父文件夹路径
  GenrateFolderPath: 'src/views',
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
    }
  });
}

//主函数
async function main() {
  // 从 API 获取菜单
  const menu = await fetchMenu();
  console.log('获取到菜单数据:', menu.length, '条');

  //生成页面单文件
  generateView(menu, config.GenrateFolderPath);

  console.log('视图文件生成完成');
}

main();
