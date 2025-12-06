
/**
 * 压缩代码 
 * @return
 */
/**
 * 压缩CSS、JS、TS代码字符串
 * @param code 要压缩的代码字符串
 * @param type 代码类型 'css' | 'js' | 'ts'
 * @returns 压缩后的代码字符串
 */
export function lightMinifyCode(code: string, type: 'css' | 'js' | 'ts'): string {
    if (!code) return '';
    switch (type) {
      case 'css':
        // 移除注释、换行、首尾空白、多余空格
        return code
          .replace(/\/\*[\s\S]*?\*\//g, '') // 去掉注释
          .replace(/\s*([{}:;,+>])\s*/g, '$1') // 移除符号两侧空白
          .replace(/\s\s+/g, ' ') // 多个空格变一个
          .replace(/;\}/g, '}') // 去掉 } 前面的分号
          .replace(/\n/g, '') // 去换行
          .trim();
      case 'js':
      case 'ts':
        // 移除注释、换行、首尾空白、多余空格
        let result = code
          // 单行注释
          .replace(/\/\/[^\n\r]*/g, '')
          // 多行注释
          .replace(/\/\*[\s\S]*?\*\//g, '')
          // 多余换行
          .replace(/[\r\n]+/g, ' ')
          // 多余空格
          .replace(/\s{2,}/g, ' ')
          // 去除大括号、括号、逗号等前后的多余空格
          .replace(/\s*([{}();,=:+\-*/<>!&|^%[\]])\s*/g, '$1')
          .trim();
        return result;
      default:
        return code;
    }
  }
  
  /**
   * 解压CSS、JS、TS代码字符串
   * 目前仅简单实现，支持恢复被 minifyCode 移除的格式，例如自动加换行/缩进美化
   * 实际场景推荐使用 prettier/js-beautify 等库，以下仅简单实现基础格式美化
   * @param code 被压缩的代码字符串
   * @param type 代码类型 'css' | 'js' | 'ts'
   * @returns 解压后的代码字符串（可读性更高）
   */
  export function lihlghtDecompressCode(code: string, type: 'css' | 'js' | 'ts'): string {
    if (!code) return '';
    switch (type) {
      case 'css':
        // 大致让 { } 分行，每个属性分行
        return code
          .replace(/\{/g, `{\n  `)
          .replace(/\}/g, `\n}\n`)
          .replace(/;/g, `;\n  `)
          .replace(/\n\s+\n/g, '\n') // 移除多余空行
          .replace(/[ ]+\n/g, '\n') // 移除行尾空格
          .replace(/\s+$/g, '') // 文件末尾去空白
          .trim();
      case 'js':
      case 'ts':
        // 尝试将大括号、分号、逗号后面加换行
        let formatted = code
          .replace(/([;{}])/g, '$1\n')
          .replace(/([,])/g, '$1 ') // 逗号后加空格
          .replace(/\n\s+\n/g, '\n') // 移除多余空行
          .replace(/([=+\-*/%]|[\(\)\[\]])/g, ' $1 ') // 运算符前后加空格
          .replace(/ {2,}/g, ' ') // 多余空格变一个
          .replace(/[ ]+\n/g, '\n')
          .replace(/\s+$/g, '') // 文件末尾去空白
          .trim();
        // 简单缩进 {}
        const lines = formatted.split('\n');
        let indent = 0;
        for (let i = 0; i < lines.length; i++) {
          let line = lines[i].trim();
          if (line.endsWith('}')) indent--;
          lines[i] = '  '.repeat(Math.max(indent, 0)) + line;
          if (line.endsWith('{')) indent++;
        }
        return lines.join('\n');
      default:
        return code;
    }
  }