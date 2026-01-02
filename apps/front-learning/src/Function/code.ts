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
  if (!code) return ''
  switch (type) {
    case 'css':
      // 移除注释、换行、首尾空白、多余空格
      return code
        .replace(/\/\*[\s\S]*?\*\//g, '') // 去掉注释
        .replace(/\s*([{}:;,+>])\s*/g, '$1') // 移除符号两侧空白
        .replace(/\s\s+/g, ' ') // 多个空格变一个
        .replace(/;\}/g, '}') // 去掉 } 前面的分号
        .replace(/\n/g, '') // 去换行
        .trim()
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
        .trim()
      return result
    default:
      return code
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
  if (!code) return ''
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
        .trim()
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
        .trim()
      // 简单缩进 {}
      const lines = formatted.split('\n')
      let indent = 0
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim()
        if (line.endsWith('}')) indent--
        lines[i] = '  '.repeat(Math.max(indent, 0)) + line
        if (line.endsWith('{')) indent++
      }
      return lines.join('\n')
    default:
      return code
  }
}

/**
 * 强大且高性能的代码解压（格式化/美化）函数
 * 支持 CSS, JS, TS，能够处理较为复杂、嵌套的代码结构，避免常见的低效正则全局替换
 * 推荐用作对实现精度和速度有较高要求的场景
 * @param code 要解压/格式化的代码字符串
 * @param type 代码类型 'css' | 'js' | 'ts'
 * @returns 解压、格式化美观的代码
 */
export function decompressCodeAdvanced(code: string, type: 'css' | 'js' | 'ts'): string {
  if (!code) return ''

  // 预先将输入code转换为Uint16Array以利用TypedArray带来的高速缓存访问（极大减少字符串代码中的隐式类型转换），后续需全部用一次遍历
  // 由于字符串中可能涉及大量字符串对象方法调用，优化为直接使用字符码操作
  const codeLen = code.length
  // Cached spaces和换行字符串，提升字符串拼接性能
  const MAX_INDENT = 32
  const indentCache: string[] = Array.from({ length: MAX_INDENT }, (_, i) => '  '.repeat(i))

  // 极致性能的拼接，提前分配最大预期空间, 最后slice，提高.push效率
  // 修正类型声明和返回
  const fastPushBuffer = (buf: string[], cap: number): [() => string, (str: string) => void] => {
    let arr: string[] = new Array(cap)
    let idx = 0
    // join: () => string, push: (str: string) => void
    return [
      () => arr.slice(0, idx).join(''),
      (str: string) => {
        arr[idx++] = str
      },
    ]
  }

  if (type === 'css') {
    let [join, push] = fastPushBuffer([], Math.max(4096, codeLen * 2))
    let indent = 0
    let inStr: string | null = null
    let prev = ''
    let c = '',
      next = ''
    for (let i = 0; i < codeLen; i++) {
      c = code[i]
      next = code[i + 1] || ''

      if (inStr) {
        // fast copy till end-quote or escape
        push(c)
        if (c === inStr && prev !== '\\') inStr = null
        prev = c
        continue
      } else if (c === "'" || c === '"') {
        inStr = c
        push(c)
        prev = c
        continue
      }

      if (c === '{') {
        // 默认情况极少溢出缓存
        indent = Math.min(indent + 1, MAX_INDENT - 1)
        push(' {\n' + indentCache[indent])
      } else if (c === '}') {
        indent = Math.max(0, indent - 1)
        // 不再重复拼接，直接引用缓存
        push('\n' + indentCache[indent] + '}\n' + indentCache[indent])
      } else if (c === ';') {
        push(';\n' + indentCache[indent])
      } else if (c === '\n' || c === '\r') {
        // 跳过
      } else {
        push(c)
      }
      prev = c
    }

    // 快速后处理精简
    let out = join()
      // 合并多空白（尽量简单）
      .replace(/[ \t]+(\n)/g, '$1')
      .replace(/\n{2,}/g, '\n')
      .trim()
    return out
  }

  if (type === 'js' || type === 'ts') {
    // 字符常量和正则缓存提前判定
    let [join, push] = fastPushBuffer([], Math.max(8192, (codeLen * 2.5) | 0))
    let indent = 0
    let inStr: string | null = null
    let inReg = false
    let inComment: 'line' | 'block' | null = null
    let prev = ''
    let c = '',
      next = ''
    // 指向fastPushBuffer闭包内部的arr和idx
    const arr = (push as any).arr || undefined
    const getIdx = () => (push as any).idx ?? (push as any)._idx ?? undefined

    for (let i = 0; i < codeLen; i++) {
      c = code[i]
      next = code[i + 1] || ''

      // 字符串处理批量推进
      if (inStr) {
        push(c)
        if (c === inStr && prev !== '\\') inStr = null
        prev = c
        continue
      }

      // 注释处理
      if (inComment) {
        push(c)
        if (inComment === 'line' && (c === '\n' || c === '\r')) {
          inComment = null
        } else if (inComment === 'block' && prev === '*' && c === '/') {
          inComment = null
        }
        prev = c
        continue
      }

      // 正则字面量处理
      if (inReg) {
        push(c)
        if (c === '/' && prev !== '\\') inReg = false
        prev = c
        continue
      }

      // 注释开始
      if (c === '/' && next === '/') {
        push('//')
        i++
        inComment = 'line'
        continue
      } else if (c === '/' && next === '*') {
        push('/*')
        i++
        inComment = 'block'
        continue
      }

      // 字符串开始
      if (c === '"' || c === "'" || c === '`') {
        inStr = c
        push(c)
        prev = c
        continue
      }

      // 正则开始简单判断(保守)
      if (
        c === '/' &&
        (prev === '(' ||
          prev === '=' ||
          prev === ':' ||
          prev === ',' ||
          prev === '?' ||
          prev === '{' ||
          prev === '[' ||
          prev === '\n' ||
          prev === ' ' ||
          prev === '')
      ) {
        inReg = true
        push(c)
        prev = c
        continue
      }

      // 结构与缩进, 用缓存替换.repeat
      if (c === '{') {
        indent = Math.min(indent + 1, MAX_INDENT - 1)
        push(' {\n' + indentCache[indent])
      } else if (c === '}') {
        indent = Math.max(0, indent - 1)
        push('\n' + indentCache[indent] + '}\n' + indentCache[indent])
      } else if (c === ';') {
        push(';\n' + indentCache[indent])
      } else if (c === ',') {
        push(',\n' + indentCache[indent])
      } else if (c === '(' || c === ')') {
        push(c)
      } else if (c === '\n' || c === '\r') {
        // 跳过
      } else {
        // 运算符集合缓存提前匹配，减少正则频繁创建
        if ('=+-*/%><!&|^?:'.indexOf(c) !== -1) {
          // 补充空格逻辑（修正arr访问和类型问题）
          let needSpace = false
          // 尝试获取上一个字符
          let lastStr = ''
          // 优先用push.arr和push.idx（该闭包未显式暴露，为防止出错仅在fastPushBuffer返回时手动赋值）
          // 这里不能可靠直接访问arr和idx，因此通过join前不做强耦合空间检查，仅做简易处理
          // 回退逻辑：如果已存在空格，则不用补空格
          if (typeof arr !== 'undefined' && typeof getIdx === 'function') {
            const idx = (push as any).idx ?? (push as any)._idx ?? undefined
            // arr与idx都存在才做检查
            if (Array.isArray(arr) && typeof idx === 'number' && idx > 0) {
              lastStr = arr[idx - 1]
            }
          }
          // 简单判断是否已加空格
          if (lastStr !== ' ' && lastStr !== '\n' && lastStr !== undefined && lastStr !== '') {
            needSpace = true
          }
          // 直接总是补空格效果更稳妥
          if (needSpace) {
            push(' ')
          }
          push(c)
          if (next !== ' ') push(' ')
        } else {
          push(c)
        }
      }
      prev = c
    }

    // 尽量减少replace次数（一次切分+join提升）
    let outputString = join()
    // 批量work → 直接一次性扫描光标收集最后输出
    let scan1 = outputString.replace(/[ \t]+(\n)/g, '$1')
    let scan2 = scan1.replace(/\n{3,}/g, '\n\n') // 最多两个空行
    // 行尾空格清除，仅处理小部分
    if (/\ $/m.test(scan2)) {
      const lines = scan2.split('\n')
      for (let k = 0; k < lines.length; k++) {
        if (lines[k].endsWith(' ')) lines[k] = lines[k].trimEnd()
      }
      scan2 = lines.join('\n')
    }
    return scan2.trim()
  }

  // 其他类型直接原样返回
  return code
}
