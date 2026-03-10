/**
 * 请求函数类型
 */
type RequestFunction<T> = () => Promise<T>;

/**
 * 请求任务接口
 */
interface RequestTask<T> {
  requestFn: RequestFunction<T>;
  resolve: (value: T) => void;
  reject: (reason?: any) => void;
}


/**
 * 并发控制类
 */
class RequestConcurrencyController {
  // 最大并发数
  private maxConcurrency: number;
  // 当前正在运行的请求数
  private runningRequests: number = 0;
  // 请求队列
  private queue: RequestTask<any>[] = [];
  // 请求统计
  private stats = {
    totalRequests: 0,
    completedRequests: 0,
    failedRequests: 0,
    queueSize: 0
  };

  /**
   * 构造函数
   * @param maxConcurrency 最大并发数，默认为5
   */
  constructor(maxConcurrency: number = 2) {
    if (maxConcurrency <= 0) {
      throw new Error("maxConcurrency must be greater than 0");
    }
    this.maxConcurrency = maxConcurrency;
  }

  /**
   * 添加请求到队列
   * @param requestFn 返回Promise的请求函数
   * @returns 返回请求结果的Promise
   */
  add<T>(requestFn: RequestFunction<T>): Promise<T> {
    this.stats.totalRequests++;
    this.stats.queueSize = this.queue.length + 1;

    return new Promise<T>((resolve, reject) => {
      // 将请求任务添加到队列
      this.queue.push({ requestFn, resolve, reject });
      // 尝试执行下一个请求
      this.next();
    });
  }

  /**
   * 执行队列中的下一个请求
   */
  private next(): void {
    // 如果达到最大并发数或者队列为空，则停止
    if (this.runningRequests >= this.maxConcurrency || this.queue.length === 0) {
      return;
    }

    // 从队列中取出下一个请求
    const task = this.queue.shift()!;
    console.log(this.queue.length);
    this.runningRequests++;
    this.stats.queueSize = this.queue.length;    // 执行请求
    task.requestFn()
      .then(result => {
        task.resolve(result);
        this.stats.completedRequests++;
      })
      .catch(error => {
        task.reject(error);
        this.stats.failedRequests++;
      })
      .finally(() => {
        this.runningRequests--;
        this.stats.queueSize = this.queue.length;
        // 请求完成后继续执行下一个
        this.next();
      });
  }

  /**
   * 获取当前统计信息
   * @returns 请求统计对象
   */
  getStats() {
    return {
      ...this.stats,
      runningRequests: this.runningRequests,
      maxConcurrency: this.maxConcurrency
    };
  }

  /**
   * 清空队列
   */
  clearQueue(): void {
    this.queue = [];
    this.stats.queueSize = 0;
  }
}

// 使用示例
export async function main() {
  // 创建并发控制器，最大并发数为3
  const controller = new RequestConcurrencyController(3);

  // 模拟请求函数
  const createRequest = (id: number, delay: number) => {
    return () => new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(`Request ${id} completed after ${delay}ms`);
      }, delay);
    });
  };

  // 添加10个请求到队列
  const requests: Promise<string>[] = [];
  for (let i = 1; i <= 10; i++) {
    // 随机延迟500-3000ms
    const delay = Math.floor(Math.random() * 2500) + 500;
    requests.push(controller.add(createRequest(i, delay)));
  }

  // 打印统计信息
  const logStats = () => {
    const stats = controller.getStats();
    console.log(`[${new Date().toLocaleTimeString()}] Running: ${stats.runningRequests}, ` +
      `Completed: ${stats.completedRequests}, ` +
      `Failed: ${stats.failedRequests}, ` +
      `Queued: ${stats.queueSize}`);
  };

  // 每1秒打印一次统计信息
  // const intervalId = setInterval(logStats, 1000);

  // 等待所有请求完成
  await Promise.all(requests);
  // clearInterval(intervalId);

  // 最终统计
  logStats();
  console.log("All requests completed!");
}


