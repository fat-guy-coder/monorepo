import fs from 'fs'
import json from './src/views/CoreSkills/JavaScript/JSON/ESKnowledgePoints copy.json' with { type: 'json' }
// const json = require('./src/views/CoreSkills/JavaScript/ES/ESKnowledgePoints.json')





const length = json.length


function main (json) {
  for (let i = 0; i < json.length; i++) {
    const item = json[i]
    const length2 = item.items.length
    for (let j = 0; j < length2; j++) {
      const item2 = item.items[j]
      item2.browserSupport = item2.browserSupport.map((item, index) => {
        const ns = /不支持/.test(item)
        const e = /实验性/.test(item)
        const v1 = Number(item.match(/\d+/)?.[0]) || 0
        const v = ns ? 0 : e ? 0 : v1
        switch (index) {
          case 0:
            return {
              b: 'c',
              v,
              e,
              ns
            }
          case 1:
            return {
              b: 'f',
              v,
              e,
              ns
            }
          case 2:
            return {
              b: 's',
              v,
              e,
              ns
            }
          case 3:
            return {
              b: 'e',
              v,
              e,
              ns
            }
          case 4:
            return {
              b: 'ie',
              v,
              e,
              ns
            }
          case 5:
            return {
              b: 'o',
              v,
              e,
              ns
            }
          case 6:
            return {
              b: 'ios',
              v,
              e,
              ns
            }
          case 7:
            return {
              b: 'android',
              v,
              e,
              ns
            }
          case 8:
            return {
              b: 'node',
              v,
              e,
              ns
            }
          default:
            return {
              b: '没有',
              v: 250,
              e: false,
              ns: false
            }
        }
      })
    }
  }
  return json
}

fs.writeFileSync('./src/views/CoreSkills/JavaScript/JSON/ESKnowledgePoints.json', JSON.stringify(main(json), null, 2))







