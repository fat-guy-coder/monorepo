// 队列控制并发数
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

export class MyPromise {
  state = PENDING
  value = null
  reason = null
  fulfilledCallbacks = [];
  rejectedCallbacks = []
  constructor(executor) {
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  resolve (value) {
    if (value && value instanceof MyPromise) {
      value.then(this.resolve.bind(this), this.reject.bind(this))
      return
    }
    if (this.state !== PENDING) return
    this.value = value
    this.state = RESOLVED
    this.fulfilledCallbacks.forEach(i => i())
    this.rejectedCallbacks.length = 0
  }

  reject (reason) {
    this.reason = reason
    if (this.state !== PENDING) return
    this.state = REJECTED
    this.rejectedCallbacks.forEach(i => i())
    this.rejectedCallbacks.length = 0
  }

  then (onFulfilled, onRejected) {
    const cb = onFulfilled && typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    const cb2 = onRejected && typeof onRejected === 'function' ? onRejected : (err) => { throw err };

    const promise2 = new MyPromise((resolve, reject) => {
      const handle = (cb) => {
        queueMicrotask(() => {
          try {
            const p = cb(this.value)
            this.resolvePromise(promise2, p, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      const handle2 = (cb) => {
        queueMicrotask(() => {
          try {
            const p = cb(this.reason)
            this.resolvePromise(promise2, p, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.state === RESOLVED) {
        handle(cb)
      } else if (this.state === REJECTED) {
        handle2(cb2)
      } else {
        this.fulfilledCallbacks.push(() => { handle(cb) })
        this.rejectedCallbacks.push(() => { handle2(cb2) })
      }
    })

    return promise2
  }

  resolvePromise (promise, p, resolve, reject) {
    if (p === promise) throw new Error('循环调用')
    if (p && p instanceof MyPromise) {
      try {
        let call = false;
        p.then.call(p, e => {
          if (call) return
          call = true
          this.resolvePromise(promise, e, resolve, reject)
        },
          r => {
            if (call) return
            call = true
            reject(r)
          }
        )
      } catch (error) {
        call = true
        reject(error)
      }
    } else {
      resolve(p)
    }
  }

  catch (r) {
    return this.then(null, r)
  }

  finally (cb) {
    this.then((r) => {
      cb();
      return r
    }, (r) => {
      cb()
      return r
    })
  }
}
