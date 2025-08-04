export const code = `// 定义Promise的三种状态
enum PromiseState {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

// 定义Promise回调类型
type ResolveFunction<T> = (value: T | PromiseLike<T>) => void;
type RejectFunction = (reason?: any) => void;
type Executor<T> = (resolve: ResolveFunction<T>, reject: RejectFunction) => void;
type OnFulfilled<T, TResult> = ((value: T) => TResult | PromiseLike<TResult>) | null | undefined;
type OnRejected<TResult> = ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined;

class MyPromise<T> {
  // 当前状态
  private state: PromiseState = PromiseState.PENDING;

  // 成功时的值
  private value: T | undefined;

  // 失败时的原因
  private reason: any;

  // 成功回调队列
  private onFulfilledCallbacks: Array<() => void> = [];

  // 失败回调队列
  private onRejectedCallbacks: Array<() => void> = [];

  constructor(executor: Executor<T>) {
    try {
      // 立即执行传入的函数
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      // 如果执行器抛出异常，直接reject
      this.reject(error);
    }
  }

  //观察者模式，将then或者catch的回调函数存储到队列中，当状态改变(resolve或者reject)时，执行队列中的回调函数

  /**
   * 解析Promise
   * @param value 解析的值
   */
  private resolve(value: T | PromiseLike<T>): void {
    // 确保状态只能从pending改变一次
    if (this.state !== PromiseState.PENDING) return;

    // 如果解析的值是Promise对象，则等待其完成
    if (value && typeof (value as PromiseLike<T>).then === 'function') {
      (value as PromiseLike<T>).then(
        this.resolve.bind(this),
        this.reject.bind(this)
      );
      return;
    }

    // 更新状态和值
    this.state = PromiseState.FULFILLED;
    this.value = value as T;

    // 执行所有成功回调
    this.flushCallbacks();
  }

  /**
   * 拒绝Promise
   * @param reason 拒绝的原因
   */
  private reject(reason?: any): void {
    // 确保状态只能从pending改变一次
    if (this.state !== PromiseState.PENDING) return;

    // 更新状态和原因
    this.state = PromiseState.REJECTED;
    this.reason = reason;

    // 执行所有失败回调
    this.flushCallbacks();
  }

  /**
   * 执行所有回调函数
   */
  private flushCallbacks(): void {
    // 根据状态决定执行哪种回调
    if (this.state === PromiseState.FULFILLED) {
      this.onFulfilledCallbacks.forEach(callback => callback());
    } else if (this.state === PromiseState.REJECTED) {
      this.onRejectedCallbacks.forEach(callback => callback());
    }

    // 清空回调队列
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
  }

  /**
   * then方法实现
   * @param onFulfilled 成功回调
   * @param onRejected 失败回调
   * @returns 新的Promise
   */
  then<TResult1 = T, TResult2 = never>(
    onFulfilled?: OnFulfilled<T, TResult1>,
    onRejected?: OnRejected<TResult2>
  ): MyPromise<TResult1 | TResult2> {
    // 默认值处理：如果未提供回调，则创建透传函数
    const onFulfilledFn = typeof onFulfilled === 'function'
      ? onFulfilled
      : (value: T) => value as unknown as TResult1;

    const onRejectedFn = typeof onRejected === 'function'
      ? onRejected
      : (reason: any) => { throw reason; };

    // 创建新的Promise，用于链式调用
    const promise2 = new MyPromise<TResult1 | TResult2>((resolve, reject) => {
// 封装处理函数  这里用到了微任务，所以可以保证resolve和reject会先于then回调执行
      const handleFulfilled = () => {
        queueMicrotask(() => {
          try {
            const result = onFulfilledFn(this.value as T);
            this.resolvePromise(promise2, result, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      const handleRejected = () => {
        queueMicrotask(() => {
          try {
            const result = onRejectedFn(this.reason);
            this.resolvePromise(promise2, result, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      // 根据当前状态决定立即执行还是加入队列
      if (this.state === PromiseState.FULFILLED) {
        handleFulfilled();
      } else if (this.state === PromiseState.REJECTED) {
        handleRejected();
      } else { // PENDING状态
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });

    return promise2;
  }

  /**
   * 解析Promise的结果
   * @param promise2 新的Promise
   * @param result then回调的返回值
   * @param resolve 解析函数
   * @param reject 拒绝函数
   */
  private resolvePromise<TResult>(
    promise2: MyPromise<TResult>,
    result: any,
    resolve: ResolveFunction<TResult>,
    reject: RejectFunction
  ): void {
    // 防止循环引用
    if (promise2 === result) {
      return reject(new TypeError('Chaining cycle detected for promise'));
    }

    // 如果结果是一个对象或函数
    if (result && (typeof result === 'object' || typeof result === 'function')) {
    // 确保只调用一次 如果value(下面的value)还是promise(promise4)，则不会继续递归解析，免得套娃，防止死循环
      let called = false;

      try {
        // 获取then方法
        const then = result.then;

        // 如果then是一个函数，则将x视为Promise3
        if (typeof then === 'function') {
          then.call(
            result,
            (value: any) => {
              if (called) return;
              //走到这里时，已经是递归解析的第二层了，所以called为true
              //1.如果value还是promise，这里的called已经为true了，所以不会继续递归解析，免得套娃，
              //2.防止promise2的resolve和reject被挂到value(promise4)的then和reject中，导致执行顺序错乱
              called = true;
              // 递归解析Promise
              this.resolvePromise(promise2, value, resolve, reject);
            },
            (reason: any) => {
              if (called) return;
              called = true;
              reject(reason);
            }
          );
        } else {
          // 普通对象，直接解析
          resolve(result);
        }
      } catch (error) {
        if (called) return;
        called = true;
        reject(error);
      }
    } else {
      // 基本类型值，直接解析
      //call为false，说明result不是promise，直接穿透给下一个then promise2.then(result=>result)这个then
      //call为true，说明result是promise，递归解析之后，这里获得是promise3的resolve里的result，即value
      //这个resolve(promise2的)此时挂在了promise3的then中，所以会等promise3的then执行完，再执行promise2的then
      //这就实现了链式调用
      resolve(result);
    }
  }

  /**
   * catch方法实现
   * @param onRejected 错误处理回调
   * @returns 新的Promise
   */
  catch<TResult = never>(
    onRejected?: OnRejected<TResult>
  ): MyPromise<T | TResult> {
    return this.then(null, onRejected);
  }

  /**
   * finally方法实现
   * @param onFinally 最终执行的回调
   * @returns 新的Promise
   */
  // 其实还可以继续链式调用,语义化而已,只不过没有什么意义
  finally(onFinally?: () => void): MyPromise<T> {
    return this.then(
      value => {
        if (onFinally) onFinally();
        return MyPromise.resolve(value);
      },
      reason => {
        if (onFinally) onFinally();
        return MyPromise.reject(reason);
      }
    );
  }

  /**********************
   * 静态方法实现
   **********************/

  /**
   * 创建一个已解析的Promise
   * @param value 解析的值
   * @returns 已解析的Promise
   */
  static resolve<T>(value: T | PromiseLike<T>): MyPromise<T> {
    // 如果已经是Promise实例，直接返回
    if (value instanceof MyPromise) {
      return value;
    }

    return new MyPromise<T>(resolve => {
      resolve(value);
    });
  }

  /**
   * 创建一个已拒绝的Promise
   * @param reason 拒绝的原因
   * @returns 已拒绝的Promise
   */
  static reject<T = never>(reason?: any): MyPromise<T> {
    return new MyPromise<T>((_, reject) => {
      reject(reason);
    });
  }

//all作用是等待所有promise完成，所有成功，返回一个包含所有结果的promise，如果有一个失败，则返回失败
//思路：
//1. 将可迭代对象转换为数组promisesArray，新建一个数组results，count=0，total=promisesArray.length
//2. 处理空数组
//3. 处理每个Promise，将成功结果存储到数组中，count++
//4. 当count===total(或者promisesArray.length===results.length)，则返回包含所有结果的Promise，否则继续等待
//5. 任何一个Promise失败，立即拒绝

  /**
   * 等待所有Promise完成
   * @param promises Promise数组
   * @returns 包含所有结果的Promise
   */
  static all<T>(promises: Iterable<T | PromiseLike<T>>): MyPromise<T[]> {
    return new MyPromise<T[]>((resolve, reject) => {
      const results: T[] = [];
      let count = 0;
      let total = 0;

      // 将可迭代对象转换为数组
      const promisesArray = Array.from(promises);
      total = promisesArray.length;

      // 处理空数组
      if (total === 0) {
        return resolve([]);
      }

      // 处理每个Promise
      promisesArray.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          value => {
            results[index] = value;
            count++;

            // 所有Promise都已完成
            if (count === total) {
              resolve(results);
            }
          },
          reason => {
            // 任何一个Promise失败，立即拒绝
            reject(reason);
          }
        );
      });
    });
  }
  //allSettled作用是等待所有promise完成，无论成功或失败，返回一个包含所有结果的promise
  //思路：
  //1. 将可迭代对象转换为数组promisesArray，新建一个数组results，count=0，total=promisesArray.length
  //2. 处理空数组
  //3. 监听每个Promise的完成，将结果(成功或失败)存储到数组中，count++
  //4. 当count===total(或者promisesArray.length===results.length)，
  // 则返回包含所有结果的Promise，否则继续等待

  /**
   * 等待所有Promise完成（无论成功或失败）
   * @param promises Promise数组
   * @returns 包含所有结果的Promise
   */
  static allSettled<T>(promises: Iterable<T | PromiseLike<T>>):
  MyPromise<Array<{ status: PromiseState; value?: T; reason?: any }>> {
    // 如果传入的参数是空数组，则直接返回一个空的Promise
    return new MyPromise(resolve => {
      const results: Array<{ status: PromiseState; value?: T; reason?: any }> = [];
      let count = 0;
      let total = 0;

      const promisesArray = Array.from(promises);
      total = promisesArray.length;

      if (total === 0) {
        return resolve([]);
      }

      promisesArray.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          value => {
            results[index] = { status: PromiseState.FULFILLED, value };
            count++;
            if (count === total) resolve(results);
          },
          reason => {
            results[index] = { status: PromiseState.REJECTED, reason };
            count++;
            if (count === total) resolve(results);
          }
        );
      });
    });
  }

//race作用是返回最先完成的promise，如果有一个失败，则返回失败
//思路：
//1. 将可迭代对象转换为数组
//2. 处理空数组
//3. 监听每个Promise成功或失败
//4. 任何一个Promise成功或失败，立即成功或失败(resolve或reject)

  /**
   * 返回最先完成的Promise
   * @param promises Promise数组
   * @returns 最先完成的Promise的结果
   */
  static race<T>(promises: Iterable<T | PromiseLike<T>>): MyPromise<T> {
    return new MyPromise<T>((resolve, reject) => {
      const promisesArray = Array.from(promises);

      // 处理空数组
      if (promisesArray.length === 0) {
        return reject(new Error('No promises provided'));
      }

      // 监听每个Promise的完成
      promisesArray.forEach(promise => {
        MyPromise.resolve(promise).then(resolve, reject);
      });
    });
  }

//any作用是返回最先完成的promise，如果全部失败，则返回失败
//思路：
//1. 将可迭代对象转换为数组promisesArray，新建一个数组results，count=0，total=promisesArray.length
//2. 处理空数组
//3. 监听每个Promise的成功，如果有一个成功，则返回成功
//4. 如果全部失败，则返回失败，即count===total(或者promisesArray.length===results.length)，
//则返回包含所有结果的Promise，否则继续等待
 /**
   * 返回最先完成的Promise，如果全部失败，则返回失败
   * @param promises Promise数组
   * @returns 最先完成的Promise的结果，如果全部失败，则返回失败
   */
  static any<T>(promises: Iterable<T | PromiseLike<T>>): MyPromise<T> {
    return new MyPromise<T>((resolve, reject) => {
      const promisesArray = Array.from(promises);
      const errors: T[] = [];
      let count = 0;
      let total = 0;
      total = promisesArray.length;
      // 处理空数组
      if (promisesArray.length === 0) {
        return reject(new Error('No promises provided'));
      }

      // 监听每个Promise的完成
      promisesArray.forEach(promise => {
        MyPromise.resolve(promise).then(resolve, (reason) => {
          errors.push(reason);
          count++;
          if (count === total) reject(errors);
        });
      });
    });
  }
}

//withResolvers作用是返回一个包含resolve和reject的promise，可以手动调用resolve和reject
//思路：
//1. 创建一个临时变量resolve和reject
//2. 返回这个promise，并传入resolve和reject
//3. 一起返回

 static withResolvers<T>(): {
  promise: MyPromise<T>;
  resolve: ResolveFunction<T>;
  reject: RejectFunction;
 } {
  let resolve: ResolveFunction<T>;
  let reject: RejectFunction;
  const promise =  new MyPromise<T>((resolve, reject) => {
    resolve = resolve;
    reject = reject;
  })
  // 返回一个包含promise、resolve和reject的对象
  return { promise, resolve, reject };
}
`
