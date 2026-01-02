export class MyPromise {
  constructor(executor: (resolve: (value: any) => void, reject: (reason: any) => void) => void);
  then(onFulfilled?: (value: any) => any, onRejected?: (reason: any) => any): MyPromise;
  catch(onRejected?: (reason: any) => any): MyPromise;
  finally(callback: () => void): MyPromise;
  static resolve(value: any): MyPromise;
  static reject(reason: any): MyPromise;
  static all(promises: MyPromise[]): MyPromise;
  static race(promises: MyPromise[]): MyPromise;
}
