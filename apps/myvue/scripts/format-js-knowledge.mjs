import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const targetFile = path.resolve(
  __dirname,
  '../src/views/CoreSkills/JavaScript/JSON/JsKnowledgePoints.json'
)

function indentCode(source) {
  if (typeof source !== 'string') return source

  let result = ''
  let indentLevel = 0
  const indentUnit = '  '

  let inSingle = false
  let inDouble = false
  let inBacktick = false
  let inLineComment = false
  let inBlockComment = false
  let escape = false

  const pushIndent = () => {
    for (let i = 0; i < indentLevel; i += 1) result += indentUnit
  }

  const len = source.length
  for (let i = 0; i < len; i += 1) {
    const char = source[i]
    const next = i + 1 < len ? source[i + 1] : ''

    // Handle escaping inside strings
    if ((inSingle || inDouble || inBacktick) && char === '\\' && !escape) {
      result += char
      escape = true
      continue
    }

    if (inLineComment) {
      result += char
      if (char === '\n') {
        inLineComment = false
        pushIndent()
      }
      continue
    }

    if (inBlockComment) {
      result += char
      if (char === '*' && next === '/') {
        result += '/'
        i += 1
        inBlockComment = false
      }
      continue
    }

    // Enter comments
    if (!inSingle && !inDouble && !inBacktick && char === '/' && (next === '/' || next === '*')) {
      result += char
      result += next
      i += 1
      if (next === '/') inLineComment = true
      else inBlockComment = true
      continue
    }

    // Toggle string states
    if (!inDouble && !inBacktick && char === '\'' && !escape) inSingle = !inSingle
    if (!inSingle && !inBacktick && char === '"' && !escape) inDouble = !inDouble
    if (!inSingle && !inDouble && char === '`' && !escape) inBacktick = !inBacktick

    escape = false

    const inAnyString = inSingle || inDouble || inBacktick

    if (!inAnyString) {
      if (char === '{') {
        result += '{\n'
        indentLevel += 1
        pushIndent()
        continue
      }
      if (char === '}') {
        result = result.replace(/[ \t]*$/, '')
        result += '\n'
        indentLevel = Math.max(0, indentLevel - 1)
        pushIndent()
        result += '}'
        // Add newline after closing brace if next significant char is not ',' or ';' or ')'
        // We'll normalize at semicolons and newlines further down
        continue
      }
      if (char === ';') {
        result += ';\n'
        pushIndent()
        continue
      }
      if (char === '\n') {
        result += '\n'
        pushIndent()
        continue
      }
      // Insert newline after some keywords when followed by '{'
      if (/\s/.test(char)) {
        // normalize whitespace to single space except newlines handled above
        const prev = result[result.length - 1]
        if (prev && !/\s/.test(prev)) result += ' '
        continue
      }
    }

    result += char
  }

  // Cleanup: collapse multiple blank lines
  result = result
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/g, ''))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  return result
}

function transformCodes(node) {
  if (Array.isArray(node)) return node.map(transformCodes)
  if (node && typeof node === 'object') {
    const out = {}
    for (const [key, value] of Object.entries(node)) {
      if (key === 'code' && typeof value === 'string') {
        out[key] = indentCode(value)
      } else {
        out[key] = transformCodes(value)
      }
    }
    return out
  }
  return node
}

async function main() {
  const raw = await fs.readFile(targetFile, 'utf8')
  const data = JSON.parse(raw)
  const updated = transformCodes(data)
  const serialized = JSON.stringify(updated, null, 2) + '\n'
  await fs.writeFile(targetFile, serialized, 'utf8')
  console.log('Formatted code fields in', path.basename(targetFile))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})


