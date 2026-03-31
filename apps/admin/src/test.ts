
interface StoreData {
  [index: string]: any
}

//轮询？
class StoreWithExpire {
  data: StoreData
  expireTime: number
  item: string
  // map: Map<StoreData, StoreData> = new Map()
  timeMap: Map<number, Date> = new Map()
  constructor(item: string, data: StoreData, expireTime: number) {
    this.data = data
    this.item = item
    this.expireTime = expireTime
    // this.map.set(data, data)
  }

  //检测特殊类型
  valiDateType(data: StoreData) {
    //自我引用
    // if (this.map.has(data)) {
    // }
    for (const i in data) {
      if (typeof data[i] === 'function') {
        throw new Error(`${i}为函数，不能存储`)
      }
      if (typeof data[i] === 'undefined') {
        throw new Error(`${i}为undefined，不能存储`)
      }
      if (data[i] instanceof Date) {
        throw new Error(`${i}为时间，请转化为字符串`)
      }
      if (data[i] instanceof RegExp) {
        throw new Error(`${i}为正则，请转化为字符串`)
      }
      if (typeof data[i] === 'object') {
        this.valiDateType(data[i])
      }
    }
  }

  store(item: string, data: StoreData, expireTime: number) {
    try {
      const time: number = expireTime || this.expireTime
      const timeNow = Date.now();
      const data = this.data
      const dataStringify = JSON.stringify({ ...data, expireTime: time, timeNow })
      this.valiDateType(data)
      const key = item || this.item
      localStorage.setItem(key, dataStringify)
    } catch (error) {
      console.log(error)
    }
  }

  removeItem(item: string) {
    return localStorage.removeItem(item)
  }

  clear() {
    return localStorage.clear()
  }

  updateItem(item: string, data: StoreData, expireTime: number) {
    this.store(item, data, expireTime)
  }
}


//节流
const throttle = (fn: () => void, delay: number) => {
  //开关
  let open: boolean = true
  return function () {
    if (open) {
      open = false
    } else return
    setTimeout(() => {
      fn()
      open = true
    }, delay)
  }
}
