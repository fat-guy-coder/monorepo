const dep = new Map<Ref<any> | Computed | ITarget, Ref<any> | Computed | IReactive>()
const activeMap = new Map()

interface IReactive {
  value: Ref<any> | Computed | ITarget
  oldValue: Ref<any> | Computed | ITarget | undefined
  watchers: Watcher[]
  patchCalled: boolean
  isReactive?: boolean
}

console.log('aa')

//收集依赖
const track = (ref: Ref<any> | Computed | ITarget, isActiveMap: boolean = false) => {
  if (!dep.has(ref)) {
    //如果是ref
    if (ref instanceof Ref) {
      dep.set(ref, ref)
    } else { //如果是reactive
      dep.set(ref, {
        value: ref,
        oldValue: ref,
        watchers: [],
        patchCalled: false,
        isReactive: true
      })
    }
  }
  // 设置当前激活的ref
  isActiveMap && activeMap.set(ref, ref)
}

type CallBack<T> = (...arg: T[]) => void

type DataItem = Ref<any> | Computed | ITarget

type TCallbacks = Array<DataItem>

type Watcher = {
  id?: Symbol //Watcher的id
  patchCb: CallBack<any>//批量更新的回调
  syncCb?: CallBack<any>//
  once?: boolean//是否只执行一次
  isWatch?: boolean//是否是watch注册的watcher
  deps?: TCallbacks
}


//ref实现
class Ref<T> {
  private _value: T
  oldValue: T | undefined
  patchCalled: boolean = false
  watchers: Array<Watcher> = []
  constructor(value: T) {
    this._value = value;
    this.oldValue = this._value
    track(this)
  }

  get value(): T {
    track(this, true)
    return this._value
  }

  set value(newVal) {
    if (this.watchers.length === 0) return
    executeWatcher(this, () => {
      this.patchCalled = false
      this.oldValue = this.value
    })
    this._value = newVal
  }
}

//执行watchers中的回调
const executeWatcher = (currntInstance: Ref<any> | Computed | ITarget, cb?: CallBack<void>) => {
  //执行同步执行的回调,这里需要下面patchCb一样的逻辑,但这里不在扩展
  currntInstance.watchers.forEach((i: Watcher) => i.syncCb && i.syncCb(cleanUp))
  //currntInstance.watchers = currntInstance.watchers.filter((i: Watcher) => !i.once)
  //这里做批量更新,即异步更新
  queueMicrotask(() => {
    // //如果执行过了，则不再执行
    if (currntInstance.patchCalled) return
    currntInstance.patchCalled = true
    currntInstance.watchers.forEach((i: Watcher) => {
      const params = getParams(currntInstance, false, i)
      i.patchCb(...params)
    })
    //执行后,过滤掉有once的回调
    currntInstance.watchers = currntInstance.watchers.filter((i: Watcher) => !i.once)
    //执行完了watcher，异步更新patchCalled和oldValue
    if (cb) {
      queueMicrotask(() => {
        cb()
      })
    }
  })
}


//获取watcher的参数的函数
const getParams = (currntInstance: Ref<any> | Computed | ITarget, immediate: boolean = false, i?: Watcher) => {

  //是否是watch注册的watcher或者立即执行的watcher，注入不同的参数 ，剩下就是effect注册的watcher
  let params = (i?.isWatch || immediate) ? [currntInstance?.value, currntInstance?.oldValue] : [cleanUp]
  //watch第一个参数如果是传入的数组
  if (i?.deps) {
    //新值数组
    const values = []
    //旧值数组
    const oldValues: DataItem[] = []
    //获取当前最新值的下标
    const index = i.deps.indexOf(currntInstance)
    i.deps.forEach(i => {
      values.push(i.value)
      oldValues.push(i.oldValue)
    })
    //替换
    values[index] = currntInstance?.value
    //赋值
    params = [values, oldValues]
  }
  // console.log('params', params)
  return params
}

const ref = function <T>(value: T) {
  return new Ref<T>(value)
}

type CleanUp = (cb: CallBack<any>) => void

//清理函数
const cleanUp: CleanUp = (cb) => { cb() }

type TgetActiveMapAndPushCbOptions = {
  id?: Symbol
  deps: TCallbacks
  sync: boolean
  once?: boolean
}

//获取活跃的ref对象并且将回调推入ref对象的watchers
const getActiveMapAndPushCb = (cb: CallBack<CleanUp>, options?: TgetActiveMapAndPushCbOptions) => {
  //如果传了依赖，则使用传入依赖，否则使用当前激活的ref
  const hasDeps = options?.deps && options?.deps.length > 0
  const activeMapKeys = hasDeps ? options?.deps : activeMap.keys()
  const watcher: Watcher = { patchCb: cb }
  //如果需要值更新后立即执行即sync为true,则赋值syncCb
  if (options?.id) watcher.id = options.id
  //如果需要值更新后立即执行即sync为true,则赋值syncCb
  if (options?.sync) watcher.syncCb = cb
  //是否只执行一次
  if (options?.once) watcher.once = options?.once
  //是否是watch注册的watcher
  if (hasDeps) watcher.isWatch = true
  //如果传入的是数组并且不止一个
  if (hasDeps && options?.deps.length > 1) {
    watcher.deps = options?.deps
  }
  //获取活跃的ref对象并且将回调推入watchers
  for (const i of activeMapKeys) {
    //如果是reactive实例，特殊处理，直接推入watcher
    if (i.isReactive) {
      i.watchers.push(watcher)
    } else {
      dep.get(i) && dep.get(i)?.watchers.push(watcher)
    }
  }
  //注册watcher后清空activeMap
  activeMap.clear()
}

interface WatchOptions {
  id?: Symbol
  immediate?: boolean
  lazy?: boolean
  once?: boolean
  deep?: boolean | number
  flush?: 'post' | 'pre' | 'sync'//post:dom更新后执行  pre:异步更新(批量)后执行(默认)  sync:值变更后立即执行(只要一变就执行,与批量相反)
}


//实现副作用函数
const effect = (cb: CallBack<CleanUp | any>, optons?: ({ deps?: DataItem | TCallbacks } & WatchOptions)) => {
  //依赖项
  let deps = optons?.deps ? Array.isArray(optons?.deps) ? optons?.deps : [optons?.deps] : []

  deps = deps.map(i => {
    //处理特殊类型reactive,获取实例
    if (!(i instanceof Ref || i instanceof Computed)) {
      return dep.get(i)
    }
    return i
  })


  //是否延迟执行
  const lazy = optons?.lazy
  //是否同步执行
  const sync = optons?.flush === 'sync'//post需要获得dom更新后的时机，这里就不实现了
  //根据实例获取参数传进回调函数里(立即执行)

  const params = deps.length > 0 ? deps.map(i => getParams(i, true)).flat() : [cleanUp]

  //立即执行
  if (!lazy) cb(...params)
  getActiveMapAndPushCb(cb, { deps, sync, once: optons?.once, id: optons?.id })
}


const count = ref(1)
const count2 = ref(2)

// effect((cleanUpCb) => {
//   console.log(count.value)
//   const timer = setTimeout(() => {
//     console.log('延时器',count.value)
//   }, 2000)
//   //执行清理函数
//   cleanUpCb && cleanUpCb(() => {
//     console.log('清除了旧的timer')
//     clearTimeout(timer)
//   })
// })

// effect(() => {
//   console.log('count.value:', count.value, 'count2.value:', count2.value)
// })


//批量更新测试
// setTimeout(() => {
//   count.value = 3
//   count.value = 2
//   count.value = 10
// }, 1000)

//测试通过
// effect(() => {
//   console.log('count.value:', count.value)
// })

// setTimeout(() => {
//   count.value = 3
//   count2.value = 33
// }, 1000)

// setTimeout(() => {
//   count.value = 10
// }, 300)

// setTimeout(() => {
//   count.value = 11
// }, 400)

// setTimeout(() => {
//   count.value = 12
// }, 500)



type ComputedGetter = CallBack<void> | { get: CallBack<void>, set: CallBack<any> }
//实现Computed  惰性求值 在依赖未更新之前使用缓存值，以来更新后返回最新值
class Computed {
  private _value: any
  oldValue: any
  private getter: CallBack<any>
  private setter: CallBack<any> | null
  private dirty = false
  patchCalled: boolean = false
  watchers: Array<Watcher> = []
  constructor(getter: ComputedGetter) {
    this.getter = typeof getter === 'function' ? getter : getter.get
    this.setter = typeof getter === 'function' ? null : getter.set
    this._value = this.getter(null)
    this.oldValue = this._value
    //注册watcher，依赖更新后dirty改为true并重新获取值 并执行watcher回调
    getActiveMapAndPushCb(() => {
      this.dirty = true;
      this.watchers.forEach(i => i.patchCb())
    })
  }

  get value() {
    //依赖收集
    track(this)
    //如果依赖未更新则返回缓存值
    if (!this.dirty) return this._value
    //如果依赖未更新则返回最新值
    this.dirty = false
    this.oldValue = this._value
    this._value = this.getter(this._value)
    return this._value
  }

  set value(val) {
    this.setter && this.setter(val)
  }
}

const computed = (value: ComputedGetter) => new Computed(value)


// const computedCount = computed((perious) => {
//   // console.log(perious) //前一个值
//   return count.value + 10
// })


// effect(() => {
//   console.log('computedCount.value', computedCount.value)
// })


//实现 watch
const watch = (deps: Ref<any> | Computed | ITarget | TCallbacks, cb: CallBack<any>, watchOptions: WatchOptions = {
  once: false,
  immediate: false,
  lazy: true,
  deep: false,
  flush: 'pre'
}) => {
  if (Array.isArray(deps)) {
    //处理函数类型computed
    deps = deps.map(i => {
      if (typeof i === 'function') {
        return computed(i)
      }
      return i
    })
  }
  //watcher的id
  let id: Symbol | null = Symbol()
  effect(cb, { deps, ...watchOptions, lazy: !watchOptions.immediate, id })
  //返回stop 从watchers里面删除当前watcher就行了
  return () => {
    const arr: TCallbacks = Array.isArray(deps) ? deps : [deps]
    arr.forEach(i => {
      //根据id删除当前watcher
      i.watchers = i.watchers.filter((j: Watcher) => j.id !== id)
    })
    id = null
  }
}

//使用stop和watch
const stop = watch(count, (val, old) => {
  console.log('watch', val, old)
}, {
  immediate: true
})


// const stop2 = watch([count, count2], (val, old) => {
//   console.log('watch', val, old)
// })


// setTimeout(() => {
//   stop()
// }, 2000)

// setTimeout(() => {
//   count.value = 10
//   count2.value = 99
// }, 3000)


interface ITarget {
  [index: string | symbol]: any
}

//实现reactive
const reactive = (obj: ITarget): ITarget => {
  const proxy = new Proxy(obj, {
    get(target, key) {
      if (typeof target[key] === 'object') {
        target[key] = recursiveRreactive(target[key])
      }
      target[key] && track(target[key])
      return target[key]
    },
    set(target, key, value): boolean {
      // track(target)
      target[key] = value
      trigger(proxy)
      return true
    }
  })
  track(proxy)
  return proxy
}

//递归处理
const recursiveRreactive = (obj: ITarget) => {
  const recursive = (item: ITarget) => {
    for (const i in item) {
      if (typeof item[i] === 'object') {
        item[i] = recursive(item[i])
      }
    }
    return item
  }
  return recursive(reactive(obj))
}

const trigger = (p: any) => {
  const instance = dep.get(p)
  //执行watchers中的回调
  executeWatcher(instance as ITarget, () => {
    (instance as ITarget).patchCalled = false;
    (instance as ITarget).oldValue = instance?.value
  })
}


const family = reactive({ son: 'ccc' })




// watch(family, (val, old) => {
//   console.log(val, old)
// }, {
//   immediate: true
// })

// effect(() => {
//   console.log(family)
// })

// setTimeout(() => {
//   family.son = 'aaa'
// }, 1000)

// setTimeout(() => {
//   family.son = 'bbb'
// }, 2000)





