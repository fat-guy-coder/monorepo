export const proxySandbox = `/**
 * 基于Proxy的JavaScript沙箱实现
 * 提供安全的环境来执行不受信任的代码，同时防止对全局环境的污染
 */
class ProxySandbox {
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
            ownKeys(target: any): PropertyKey[] {
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
        console.log(\`[\${this.name}] Sandbox activated\`);
    }

    /**
     * 停用沙箱
     */
    public deactivate(): void {
        if (!this.isActive) return;

        this.isActive = false;
        console.log(\`[\${this.name}] Sandbox deactivated\`);
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
                \`with (sandbox) {
                    return (function() {
                        "use strict";
                        try {
                            \${code}
                        } catch (e) {
                            console.error('Execution error in sandbox:', e);
                            return undefined;
                        }
                    })();
                }\`
            );

            // 执行代码
            return executor(sandbox);
        } catch (error) {
            console.error(\`[\${this.name}] Error executing code:\`, error);
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

        console.log(\`[\${this.name}] Sandbox reset\`);
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

        console.log(\`[\${this.name}] Sandbox destroyed\`);
    }

    /**
     * 记录被阻止的访问
     * @param prop 属性名
     * @param operation 操作类型
     */
    private logBlockedAccess(prop: PropertyKey, operation: string): void {
        console.warn(\`[\${this.name}] Blocked \${operation} access to dangerous property: \${String(prop)}\`);
    }

    /**
     * 记录缺失的属性
     * @param prop 属性名
     */
    private logMissingProperty(prop: PropertyKey): void {
        console.warn(\`[\${this.name}] Property not found: \${String(prop)}\`);
    }
}

// 示例使用
function demoProxySandbox() {
    // 1. 创建沙箱实例
    const sandbox = new ProxySandbox('demo-sandbox', {
        // 自定义上下文
        customVar: 'Sandbox Value',
        safeFunction: () => console.log('Safe function called')
    });

    // 2. 激活沙箱
    sandbox.activate();

    // 3. 执行代码
    try {
        // 安全代码
        const result = sandbox.execute(\`
            // 访问自定义上下文
            console.log('Custom variable:', customVar);

            // 调用安全函数
            safeFunction();

            // 使用安全的全局对象
            const arr = new Array(1, 2, 3);
            console.log('Array created:', arr);

            // 设置新变量
            sandboxVar = 'Created in sandbox';

            // 返回值
            return {
                array: arr,
                custom: customVar,
                newVar: sandboxVar
            };
        \`);

        console.log('Execution result:', result);

        // 尝试访问危险属性（会被阻止）
        sandbox.execute(\`
            console.log('Attempting to access document...');
            try {
                document.title = 'Hacked!';
            } catch (e) {
                console.error('Expected error:', e.message);
            }
        \`);

        // 尝试访问eval（会被阻止）
        sandbox.execute(\`
            console.log('Attempting to use eval...');
            try {
                eval('console.log("This should be blocked")');
            } catch (e) {
                console.error('Expected error:', e.message);
            }
        \`);

    } finally {
        // 4. 重置沙箱
        sandbox.reset();

        // 5. 停用沙箱
        sandbox.deactivate();

        // 6. 销毁沙箱
        sandbox.destroy();
    }
}

// 运行示例
demoProxySandbox();`




export const snapshotSandbox = `/**
 * 基于快照的JavaScript沙箱实现
 * 提供安全的环境来执行不受信任的代码，通过快照机制防止对全局环境的污染
 */
class SnapshotSandbox {
    // 沙箱名称，用于调试和标识
    private name: string;

    // 沙箱是否处于激活状态
    private isActive: boolean = false;

    // 存储全局对象的初始快照
    private windowSnapshot: Record<PropertyKey, any> = {};

    // 存储沙箱运行期间的修改
    private modifications: Record<PropertyKey, any> = {};

    // 存储新增的属性
    private addedProps: Set<PropertyKey> = new Set();

    // 沙箱上下文（自定义全局对象）
    private context: Record<PropertyKey, any>;

    // 原始全局对象（通常是window）
    private globalObject: any;

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
     * 创建快照沙箱实例
     * @param name 沙箱名称（可选）
     * @param context 自定义上下文对象（可选）
     */
    constructor(name: string = 'snapshot-sandbox', context: Record<PropertyKey, any> = {}) {
        this.name = name;
        this.globalObject = window;

        // 创建安全的上下文
        this.context = this.createSafeContext(context);
    }

    /**
     * 创建安全的沙箱上下文
     * @param customContext 自定义上下文
     * @returns 安全的上下文对象
     */
    private createSafeContext(customContext: Record<PropertyKey, any>): Record<PropertyKey, any> {
        const context = Object.create(null);

        // 1. 添加安全的全局对象
        SnapshotSandbox.GLOBAL_WHITELIST.forEach(prop => {
            if (prop in this.globalObject) {
                context[prop] = this.globalObject[prop];
            }
        });

        // 2. 添加自定义上下文
        Object.keys(customContext).forEach(key => {
            context[key] = customContext[key];
        });

        // 3. 添加必要的代理属性
        context.globalThis = context; // 指向自身
        context.self = context;      // 指向自身

        return context;
    }

    /**
     * 创建全局对象的快照
     */
    private createSnapshot(): void {
        // 1. 遍历全局对象的所有属性
        const props = Object.getOwnPropertyNames(this.globalObject);

        // 2. 记录每个属性的值
        props.forEach(prop => {
            try {
                // 跳过不可配置的属性（如window, document等）
                if (!Object.getOwnPropertyDescriptor(this.globalObject, prop)?.configurable) {
                    return;
                }

                // 记录属性值
                this.windowSnapshot[prop] = this.globalObject[prop];
            } catch (error) {
                // 忽略无法访问的属性
                console.warn(\`[\${this.name}] Failed to snapshot property: \${prop}\`, error);
            }
        });

        console.log(\`[\${this.name}] Created snapshot with \${props.length} properties\`);
    }

    /**
     * 应用沙箱的修改到全局对象
     */
    private applyModifications(): void {
        // 1. 恢复新增的属性
        this.addedProps.forEach(prop => {
            delete this.globalObject[prop];
        });

        // 2. 应用修改的属性
        Object.keys(this.modifications).forEach(prop => {
            this.globalObject[prop] = this.modifications[prop];
        });

        console.log(\`[\${this.name}] Applied \${Object.keys(this.modifications).length} modifications\`);
    }

    /**
     * 恢复全局对象到快照状态
     */
    private restoreSnapshot(): void {
        // 1. 清除所有新增的属性
        Object.keys(this.globalObject).forEach(prop => {
            if (!(prop in this.windowSnapshot) &&
                Object.getOwnPropertyDescriptor(this.globalObject, prop)?.configurable) {
                delete this.globalObject[prop];
            }
        });

        // 2. 恢复原始属性值
        Object.keys(this.windowSnapshot).forEach(prop => {
            try {
                // 跳过不可配置的属性
                if (!Object.getOwnPropertyDescriptor(this.globalObject, prop)?.configurable) {
                    return;
                }

                this.globalObject[prop] = this.windowSnapshot[prop];
            } catch (error) {
                console.warn(\`[\${this.name}] Failed to restore property: \${prop}\`, error);
            }
        });

        console.log(\`[\${this.name}] Restored snapshot with \${Object.keys(this.windowSnapshot).length} properties\`);
    }

    /**
     * 激活沙箱
     */
    public activate(): void {
        if (this.isActive) {
            console.warn(\`[\${this.name}] Sandbox is already active\`);
            return;
        }

        this.isActive = true;

        // 1. 创建全局对象快照
        this.createSnapshot();

        // 2. 应用之前的修改（如果有）
        this.applyModifications();

        console.log(\`[\${this.name}] Sandbox activated\`);
    }

    /**
     * 停用沙箱
     */
    public deactivate(): void {
        if (!this.isActive) {
            console.warn(\`[\${this.name}] Sandbox is not active\`);
            return;
        }

        this.isActive = false;

        // 1. 记录当前所有修改
        this.recordModifications();

        // 2. 恢复全局对象到快照状态
        this.restoreSnapshot();

        console.log(\`[\${this.name}] Sandbox deactivated\`);
    }

    /**
     * 记录对全局对象的修改
     */
    private recordModifications(): void {
        // 1. 重置修改记录
        this.modifications = {};
        this.addedProps = new Set();

        // 2. 遍历当前全局对象的所有属性
        const currentProps = Object.getOwnPropertyNames(this.globalObject);

        currentProps.forEach(prop => {
            try {
                // 跳过不可配置的属性
                if (!Object.getOwnPropertyDescriptor(this.globalObject, prop)?.configurable) {
                    return;
                }

                // 检查是否是新增属性
                if (!(prop in this.windowSnapshot)) {
                    this.addedProps.add(prop);
                    this.modifications[prop] = this.globalObject[prop];
                    return;
                }

                // 检查属性值是否被修改
                if (this.globalObject[prop] !== this.windowSnapshot[prop]) {
                    this.modifications[prop] = this.globalObject[prop];
                }
            } catch (error) {
                console.warn(\`[\${this.name}] Failed to record modification for: \${prop}\`, error);
            }
        });

        console.log(\`[\${this.name}] Recorded \${Object.keys(this.modifications).length} modifications\`);
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
            const sandboxContext = this.createExecutionContext();

            // 创建执行函数
            const executor = new Function(
                'sandbox',
                \`with (sandbox) {
                    return (function() {
                        "use strict";
                        try {
                            \${code}
                        } catch (e) {
                            console.error('Execution error in sandbox:', e);
                            return undefined;
                        }
                    })();
                }\`
            );

            // 执行代码
            return executor(sandboxContext);
        } catch (error) {
            console.error(\`[\${this.name}] Error executing code:\`, error);
            throw error;
        }
    }

    /**
     * 创建安全的执行上下文
     * @returns 安全的执行上下文
     */
    private createExecutionContext(): Record<PropertyKey, any> {
        const sandbox = this;
        const context = { ...this.context };

        // 添加代理以拦截危险操作
        return new Proxy(context, {
            // 属性访问拦截器
            get(target: any, prop: PropertyKey): any {
                // 1. 阻止访问危险属性
                if (SnapshotSandbox.DANGEROUS_PROPERTIES.includes(prop.toString())) {
                    sandbox.logBlockedAccess(prop, 'get');
                    return undefined;
                }

                // 2. 优先从沙箱上下文中获取
                if (prop in target) {
                    return target[prop];
                }

                // 3. 尝试从原始全局对象中获取（仅限白名单）
                if (SnapshotSandbox.GLOBAL_WHITELIST.includes(prop.toString()) &&
                    prop in sandbox.globalObject) {
                    return sandbox.globalObject[prop];
                }

                // 4. 属性不存在
                sandbox.logMissingProperty(prop);
                return undefined;
            },

            // 属性设置拦截器
            set(target: any, prop: PropertyKey, value: any): boolean {
                // 1. 阻止修改危险属性
                if (SnapshotSandbox.DANGEROUS_PROPERTIES.includes(prop.toString())) {
                    sandbox.logBlockedAccess(prop, 'set');
                    return true; // 静默失败
                }

                // 2. 设置属性值
                target[prop] = value;
                return true;
            },

            // 属性存在性检查
            has(target: any, prop: PropertyKey): boolean {
                return prop in target ||
                       (SnapshotSandbox.GLOBAL_WHITELIST.includes(prop.toString()) &&
                        prop in sandbox.globalObject);
            }
        });
    }

    /**
     * 重置沙箱状态
     */
    public reset(): void {
        // 1. 如果沙箱处于激活状态，先停用
        if (this.isActive) {
            this.deactivate();
        }

        // 2. 清除修改记录
        this.modifications = {};
        this.addedProps = new Set();

        // 3. 清除快照
        this.windowSnapshot = {};

        console.log(\`[\${this.name}] Sandbox reset\`);
    }

    /**
     * 销毁沙箱
     */
    public destroy(): void {
        this.deactivate();
        this.reset();

        // 清除所有引用
        (this.context as any) = null;
        (this.windowSnapshot as any) = null;
        (this.modifications as any) = null;
        (this.addedProps as any) = null;

        console.log(\`[\${this.name}] Sandbox destroyed\`);
    }

    /**
     * 记录被阻止的访问
     * @param prop 属性名
     * @param operation 操作类型
     */
    private logBlockedAccess(prop: PropertyKey, operation: string): void {
        console.warn(\`[\${this.name}] Blocked \${operation} access to dangerous property: \${String(prop)}\`);
    }

    /**
     * 记录缺失的属性
     * @param prop 属性名
     */
    private logMissingProperty(prop: PropertyKey): void {
        console.warn(\`[\${this.name}] Property not found: \${String(prop)}\`);
    }
}

// 示例使用
function demoSnapshotSandbox() {
    // 1. 创建沙箱实例
    const sandbox = new SnapshotSandbox('demo-snapshot-sandbox', {
        // 自定义上下文
        customVar: 'Sandbox Value',
        safeFunction: () => console.log('Safe function called')
    });

    // 2. 激活沙箱
    sandbox.activate();

    // 3. 执行代码
    try {
        // 安全代码
        const result = sandbox.execute(\`
            // 访问自定义上下文
            console.log('Custom variable:', customVar);

            // 调用安全函数
            safeFunction();

            // 使用安全的全局对象
            const arr = new Array(1, 2, 3);
            console.log('Array created:', arr);

            // 设置新变量
            sandboxVar = 'Created in sandbox';

            // 返回值
            return {
                array: arr,
                custom: customVar,
                newVar: sandboxVar
            };
        \`);

        console.log('Execution result:', result);

        // 尝试访问危险属性（会被阻止）
        sandbox.execute(\`
            console.log('Attempting to access document...');
            try {
                document.title = 'Hacked!';
            } catch (e) {
                console.error('Expected error:', e.message);
            }
        \`);

        // 尝试访问eval（会被阻止）
        sandbox.execute(\`
            console.log('Attempting to use eval...');
            try {
                eval('console.log("This should be blocked")');
            } catch (e) {
                console.error('Expected error:', e.message);
            }
        \`);

        // 4. 停用沙箱（会自动恢复全局状态）
        sandbox.deactivate();

        // 5. 再次激活沙箱（会恢复之前的修改）
        sandbox.activate();

        // 验证状态恢复
          sandbox.execute(\`
            console.log('Sandbox var after reactivation:', sandboxVar);
        \`);

    } finally {
        // 6. 重置沙箱
        sandbox.reset();

        // 7. 销毁沙箱
        sandbox.destroy();
    }
}

// 运行示例
demoSnapshotSandbox();`


