interface Item {
  count: number;//出现次数
  indexs: number[]//位置列表
  index?: string//位置列表拼接后的字符串
  mapCode?: string//映射的编码
}

export class EncodeAndDecode {

  //单词映射map 单词:编码  这个字典一般存在数据库中或者请求外部的数据，这里进行模拟
  private wordMap: Map<string, string> = new Map()
  //编码表
  private codeList: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  //二进制编码表
  private binaryCodeList: number[] = [0, 1]
  //是否使用二进制编码
  private useBinaryCode: boolean = false
  //标点符号
  private dotReg: RegExp = /[.,;:!()+?$%&]/g
  //原文
  private article: string = ''
  //计数map
  private map: Map<string, Item> = new Map()
  //带编码的列表
  public encodeList: Array<{ code: string, index: string }> = []
  //编码
  public encodedCode: string = ''
  //压缩率
  public compressRate: string = ''
  constructor(article: string, useBinaryCode: boolean = false) {
    this.article = article
    this.useBinaryCode = useBinaryCode
    this.encode()
  }

  toLowerCase(word: string) {
    return word.match(/^[A-Z]+$/) ? word : word.charAt(0).toLowerCase() + word.slice(1)
  }

  encode() {
    //获取编码
    let words: string[] = this.article.split(' ')
    //处理逗号和句号
    words = words.reduce((acc, i) => {
      const match = i.match(this.dotReg)
      if (match) {
        let wordIndex = 0
        const words = i.split(this.dotReg).filter(Boolean)
        const len = words.length
        i.replace(this.dotReg, (m, index) => {
          if (index === 0) {
            acc.push(m)
          }
          if (index > 0) {
            acc.push(m)
          }
          if (wordIndex < len) {
            acc.push(this.toLowerCase(words[wordIndex]))
            wordIndex++
          }
          return m
        })
      } else {
        acc.push(this.toLowerCase(i))
      }
      return acc
    }, [] as string[])
    const len = words.length
    //获得统计数据
    for (let i = 0; i < len; i++) {
      const word = words[i]
      const value = this.map.get(word)
      if (value) {
        this.map.set(word, { count: value.count + 1, indexs: [...value.indexs, i] })
      } else {
        this.map.set(word, { count: 1, indexs: [i] })
      }
    }

    //获取倒叙列表
    const list = this.getList(this.map)


    //获取编码数组
    const charList = this.getCodeListByLength(list.length, this.codeList)

    //获取带编码的列表同时映射单词
    this.encodeList = this.getEncodeList(list, charList)

    this.encodedCode = this.encodeList.map(({ code, index }) => (code || '') + index).join('')

    this.compressRate = ((this.encodedCode.length / this.article.length) * 100).toFixed(2) + '%'
  }

  //获取编码列表同时映射单词
  getEncodeList(list: Array<Item & { word: string }>, codeList: string[]): Array<{ code: string, index: string }> {
    return list.map((i, index) => {
      let code = ''
      if (this.wordMap.has(i.word)) {
        code = this.wordMap.get(i.word) || ''
      } else {
        this.wordMap.set(i.word, codeList[index])
        code = this.wordMap.get(i.word) || ''
      }
      return { code, index: i.indexs.join(',') }
    })
  }

  //获取倒叙列表
  getList(map: Map<string, Item>) {
    const arr = []
    for (const [i, j] of map.entries()) {
      arr.push({ word: i, ...j })
    }
    return arr.sort((a, b) => b.count - a.count)
  }

  //根据位数获取编码表
  getCodeListByLength(totalIndex: number, codeList: string[]) {
    if (totalIndex <= 26) return codeList
    let indexCount = 26
    const getCodeList = (count: number) => {
      if (count === 1) return codeList
      const arr: string[] = []
      for (let i = 1; i < count; i++) {
        const newArr = getCodeList(i)
        arr.push(...newArr)
        for (let j = 0; i < 26; i++) {
          const char = newArr[j]
          const charList = newArr.filter((k: string) => k !== char)
          const len = charList.length
          for (let k = 0; k < len; k++) {
            if (indexCount > totalIndex) return arr
            indexCount++
            arr.push(char + charList[k])
          }
        }
      }
      return arr
    }

    return getCodeList(2)

  }

  clear(force: boolean = false) {
    if (force) {
      this.wordMap.clear()
    }
    this.codeList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    this.article = ''
    this.map.clear()
    this.encodeList = []
    this.encodedCode = ''
    this.compressRate = ''
  }
}



