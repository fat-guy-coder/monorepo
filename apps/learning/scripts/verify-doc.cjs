// SFC 编译校验脚本：验证学习文档 .vue 文件能通过 @vue/compiler-sfc 的 parse+script+template
// 用法: node scripts/verify-doc.cjs "<相对 AlgorithmsAndDataStructures 的路径>"
//       node scripts/verify-doc.cjs "dsa-module-3-hash/dsa-3-1-hash-func/dsa-3-1-4-crypto-hash.vue"
const path = require('path')
const fs = require('fs')

const { parse, compileTemplate, compileScript } = require(
  path.join(__dirname, '..', '..', '..', 'node_modules', '.pnpm', '@vue+compiler-sfc@3.5.31', 'node_modules', '@vue', 'compiler-sfc', 'dist', 'compiler-sfc.cjs.js')
)

const rel = process.argv[2]
if (!rel) {
  console.error('用法: node scripts/verify-doc.cjs "<相对 AlgorithmsAndDataStructures 的路径>"')
  process.exit(1)
}

const base = path.join(__dirname, '..', 'src', 'views', 'AlgorithmsAndDataStructures')
const file = path.join(base, rel)
if (!fs.existsSync(file)) {
  console.error(`文件不存在: ${file}`)
  process.exit(1)
}

const src = fs.readFileSync(file, 'utf-8')

// 1) parse
const { descriptor, errors } = parse(src, { filename: rel })
if (errors.length) {
  console.error('❌ parse 失败:')
  errors.forEach(e => console.error('  ', e.message))
  process.exit(1)
}

// 2) script
let scriptContent = null
try {
  const s = compileScript(descriptor, { id: 'verify' })
  scriptContent = s.content
} catch (e) {
  console.error('❌ script 编译失败:')
  console.error('  ', e.message)
  process.exit(1)
}

// 3) template
let templateOk = true
try {
  const t = descriptor.template ? compileTemplate({
    source: descriptor.template.content,
    filename: rel,
    id: 'verify',
    compilerOptions: { bindingMetadata: undefined },
  }) : null
  if (t && t.errors.length) {
    console.error('❌ template 编译失败:')
    t.errors.forEach(e => console.error('  ', typeof e === 'string' ? e : e.message))
    templateOk = false
  }
} catch (e) {
  console.error('❌ template 编译失败:')
  console.error('  ', e.message)
  templateOk = false
}

if (!templateOk) process.exit(1)

// 4) 统计
const lines = src.split('\n').length
const secOverview = (src.match(/sec-overview/g) || []).length
const secViz = (src.match(/sec-viz/g) || []).length
const styleScoped = (src.match(/<style scoped>/g) || []).length

console.log(`✅ OK | lines: ${lines} | sec-overview: ${secOverview} | sec-viz: ${secViz} | style-scoped: ${styleScoped}`)
