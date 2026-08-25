const ROOT = 'c:/Users/Administrator/Desktop/monorepo'
const { parse, compileScript, compileTemplate } = require(ROOT + '/node_modules/.pnpm/@vue+compiler-sfc@3.5.31/node_modules/@vue/compiler-sfc')
const fs = require('fs')
const f = process.argv[2]
const src = fs.readFileSync(f, 'utf8')
const { descriptor, errors } = parse(src, { filename: f })
let errs = [...errors.map(e => 'parse: ' + e.message)]
if (descriptor.scriptSetup || descriptor.script) { try { compileScript(descriptor, { id: 'x' }) } catch (e) { errs.push('script: ' + e.message) } }
if (descriptor.template) { try { compileTemplate({ source: descriptor.template.content, filename: f, id: 'x' }) } catch (e) { errs.push('template: ' + e.message) } }
console.log(errs.length ? 'FAIL\n' + errs.join('\n') : 'OK')
process.exit(errs.length ? 1 : 0)
