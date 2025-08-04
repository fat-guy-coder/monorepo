/**
 * 基于Proxy的JavaScript沙箱实现
 * 提供安全的环境来执行不受信任的代码，同时防止对全局环境的污染
 */
 export class ProxySandbox {
    // 沙箱名称，用于调试和标识
    private name: string;

    // 代理的全局对象（模拟的window）
    private fakeWindow: Record<PropertyKey, any>;

    // 真实的全局对象（通常是window）
    private realWindow: Window & typeof globalThis;

    // 代理对象，作为沙箱的全局上下文
    public proxy: Window & typeof globalThis;

    // 记录沙箱中新增/修改的属性
    private addedProps: Set<PropertyKey> = new Set();

    // 记录被修改的原始属性
    private modifiedProps: Map<PropertyKey, any> = new Map();

    // 沙箱是否处于激活状态
    private isActive: boolean = false;

    // 允许访问的安全全局属性白名单
    private static readonly GLOBAL_WHITELIST: string[] = [
        'Array', 'Boolean', 'Date', 'Error', 'Function', 'Math', 'Number',
        'Object', 'RegExp', 'String', 'Symbol', 'Set', 'Map', 'WeakSet',
        'WeakMap', 'Promise', 'console', 'JSON', 'isNaN', 'parseInt',
        'parseFloat', 'isFinite', 'decodeURI', 'decodeURIComponent',
        'encodeURI', 'encodeURIComponent', 'setTimeout', 'clearTimeout',
        'setInterval', 'clearInterval', 'requestAnimationFrame',
        'cancelAnimationFrame', 'performance'
    ];

    // 禁止访问的危险属性
    private static readonly DANGEROUS_PROPERTIES: string[] = [
        'window', 'self', 'top', 'parent', 'globalThis', 'document',
        'location', 'navigator', 'localStorage', 'sessionStorage',
        'indexedDB', 'eval', 'Function', 'WebAssembly', 'XMLHttpRequest',
        'fetch', 'WebSocket', 'importScripts'
    ];

    /**
     * 创建Proxy沙箱实例
     * @param name 沙箱名称（可选）
     * @param context 自定义上下文对象（可选）
     */
    constructor(name: string = 'proxy-sandbox', context: Record<PropertyKey, any> = {}) {
        this.name = name;
        this.realWindow = window;

        // 创建模拟的window对象
        this.fakeWindow = this.createFakeWindow(context);

        // 创建代理对象
        this.proxy = this.createProxy();
    }

    /**
     * 创建安全的模拟window对象
     * @param context 自定义上下文
     * @returns 模拟的window对象
     */
    private createFakeWindow(context: Record<PropertyKey, any>): Record<PropertyKey, any> {
        const fakeWindow = Object.create(null);

        // 1. 添加安全的全局对象
        ProxySandbox.GLOBAL_WHITELIST.forEach(prop => {
            if (prop in this.realWindow) {
                // 安全属性直接复制
                fakeWindow[prop] = this.realWindow[prop];
            }
        });

        // 2. 添加自定义上下文
        Object.keys(context).forEach(key => {
            fakeWindow[key] = context[key];
        });

        // 3. 添加必要的代理属性
        fakeWindow.globalThis = fakeWindow; // 指向自身
        fakeWindow.self = fakeWindow;      // 指向自身

        return fakeWindow;
    }

    /**
     * 创建代理对象
     * @returns 代理的window对象
     */
    private createProxy(): Window & typeof globalThis {
        const sandbox = this;

        return new Proxy(this.fakeWindow, {
            // 属性访问拦截器
            get(target: any, prop: PropertyKey): any {
                // 1. 阻止访问危险属性
                if (ProxySandbox.DANGEROUS_PROPERTIES.includes(prop.toString())) {
                    sandbox.logBlockedAccess(prop, 'get');
                    return undefined;
                }

                // 2. 优先从沙箱环境中获取
                if (prop in target) {
                    return target[prop];
                }

                // 3. 尝试从原始window中获取（仅限白名单）
                if (ProxySandbox.GLOBAL_WHITELIST.includes(prop.toString()) &&
                    prop in sandbox.realWindow) {
                    return sandbox.realWindow[prop];
                }

                // 4. 属性不存在
                sandbox.logMissingProperty(prop);
                return undefined;
            },

            // 属性设置拦截器
            set(target: any, prop: PropertyKey, value: any): boolean {
                // 1. 阻止修改危险属性
                if (ProxySandbox.DANGEROUS_PROPERTIES.includes(prop.toString())) {
                    sandbox.logBlockedAccess(prop, 'set');
                    return true; // 静默失败
                }

                // 2. 记录新增/修改的属性
                if (!(prop in target)) {
                    sandbox.addedProps.add(prop);
                } else if (!sandbox.addedProps.has(prop) &&
                          !sandbox.modifiedProps.has(prop) &&
                          target[prop] !== value) {
                    // 记录原始值
                    sandbox.modifiedProps.set(prop, target[prop]);
                }

                // 3. 设置属性值
                target[prop] = value;
                return true;
            },

            // 属性存在性检查
            has(target: any, prop: PropertyKey): boolean {
                return prop in target ||
                       (ProxySandbox.GLOBAL_WHITELIST.includes(prop.toString()) &&
                        prop in sandbox.realWindow);
            },

            // 删除属性拦截
            deleteProperty(target: any, prop: PropertyKey): boolean {
                // 1. 阻止删除危险属性
                if (ProxySandbox.DANGEROUS_PROPERTIES.includes(prop.toString())) {
                    sandbox.logBlockedAccess(prop, 'delete');
                    return false;
                }

                // 2. 更新属性记录
                if (sandbox.addedProps.has(prop)) {
                    sandbox.addedProps.delete(prop);
                } else if (sandbox.modifiedProps.has(prop)) {
                    // 恢复原始值
                    target[prop] = sandbox.modifiedProps.get(prop);
                    sandbox.modifiedProps.delete(prop);
                }

                // 3. 删除属性
                return delete target[prop];
            },

            // 获取自身属性键
            ownKeys(target: any): ArrayLike<string | symbol> {
                return Reflect.ownKeys(target);
            },

            // 获取属性描述符
            getOwnPropertyDescriptor(target: any, prop: PropertyKey): PropertyDescriptor | undefined {
                return Object.getOwnPropertyDescriptor(target, prop);
            }
        }) as Window & typeof globalThis;
    }

    /**
     * 激活沙箱
     */
    public activate(): void {
        if (this.isActive) return;

        this.isActive = true;
        console.log(`[${this.name}] Sandbox activated`);
    }

    /**
     * 停用沙箱
     */
    public deactivate(): void {
        if (!this.isActive) return;

        this.isActive = false;
        console.log(`[${this.name}] Sandbox deactivated`);
    }

    /**
     * 执行代码
     * @param code 要执行的JavaScript代码
     * @returns 执行结果
     */
    public execute(code: string): any {
        if (!this.isActive) {
            throw new Error('Sandbox must be activated before executing code');
        }

        try {
            // 创建沙箱作用域
            const sandbox = this.proxy;

            // 创建执行函数
            const executor = new Function(
                'sandbox',
                `with (sandbox) {
                    return (function() {
                        "use strict";
                        try {
                            ${code}
                        } catch (e) {
                            console.error('Execution error in sandbox:', e);
                            return undefined;
                        }
                    })();
                }`
            );

            // 执行代码
            return executor(sandbox);
        } catch (error) {
            console.error(`[${this.name}] Error executing code:`, error);
            throw error;
        }
    }

    /**
     * 重置沙箱状态
     */
    public reset(): void {
        // 1. 删除新增的属性
        this.addedProps.forEach(prop => {
            delete this.fakeWindow[prop];
        });
        this.addedProps.clear();

        // 2. 恢复修改的属性
        this.modifiedProps.forEach((value, prop) => {
            this.fakeWindow[prop] = value;
        });
        this.modifiedProps.clear();

        console.log(`[${this.name}] Sandbox reset`);
    }

    /**
     * 销毁沙箱
     */
    public destroy(): void {
        this.deactivate();
        this.reset();

        // 清除所有引用
        (this.fakeWindow as any) = null;
        (this.proxy as any) = null;

        console.log(`[${this.name}] Sandbox destroyed`);
    }

    /**
     * 记录被阻止的访问
     * @param prop 属性名
     * @param operation 操作类型
     */
    private logBlockedAccess(prop: PropertyKey, operation: string): void {
        console.warn(`[${this.name}] Blocked ${operation} access to dangerous property: ${String(prop)}`);
    }

    /**
     * 记录缺失的属性
     * @param prop 属性名
     */
    private logMissingProperty(prop: PropertyKey): void {
        console.warn(`[${this.name}] Property not found: ${String(prop)}`);
    }
}