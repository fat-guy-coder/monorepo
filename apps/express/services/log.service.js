// services/log.service.js

class LogService {
  constructor() {
    this.clients = [];
  }

  /**
   * 添加一个新的客户端（SSE 连接）
   * @param {object} client - Express 的 response 对象
   */
  addClient(client) {
    this.clients.push(client);
    console.log(`[LogService] 新客户端连接，当前连接数: ${this.clients.length}`);
  }

  /**
   * 移除一个客户端
   * @param {object} client - Express 的 response 对象
   */
  removeClient(client) {
    this.clients = this.clients.filter(c => c !== client);
    console.log(`[LogService] 客户端断开连接，当前连接数: ${this.clients.length}`);
  }

  /**
   * 向所有连接的客户端广播日志消息
   * @param {object} logData - 包含日志类型和消息的对象
   */
  broadcast(logData) {
    const sseMessage = `data: ${JSON.stringify(logData)}\n\n`;
    this.clients.forEach(client => {
      client.write(sseMessage);
    });
  }
}

// 导出 LogService 的单例
const logService = new LogService();
module.exports = logService;
