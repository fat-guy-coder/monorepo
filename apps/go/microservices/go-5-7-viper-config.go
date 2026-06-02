package microservices

import "fmt"

// RunConfig 演示配置中心与 Viper 的使用。
// 安装依赖：go get github.com/spf13/viper
func RunConfig() {
	fmt.Println("\n=== 12-Factor App 配置原则 ===")
	twelveFactorConfig()

	fmt.Println("\n=== Viper 基础设置 ===")
	viperBasicSetup()

	fmt.Println("\n=== YAML 配置文件读取 ===")
	viperYAML()

	fmt.Println("\n=== 环境变量读取 ===")
	viperEnv()

	fmt.Println("\n=== 命令行参数 ===")
	viperFlags()

	fmt.Println("\n=== 配置热加载 ===")
	viperWatch()

	fmt.Println("\n=== 配置结构体映射 ===")
	viperUnmarshal()
}

func twelveFactorConfig() {
	fmt.Println("12-Factor App - 配置原则")
	fmt.Println()
	fmt.Println("III. 配置 — 在环境变量中存储配置")
	fmt.Println()
	fmt.Println("核心原则：")
	fmt.Println("  1. 配置与代码分离 — 配置不在代码中硬编码")
	fmt.Println("  2. 环境区分 — 开发/测试/生产用不同配置")
	fmt.Println("  3. 配置来源 — 环境变量、配置文件、命令行参数、配置中心")
	fmt.Println()
	fmt.Println("配置分层（优先级从高到低）：")
	fmt.Println("  1. 命令行参数 (--port=8080)")
	fmt.Println("  2. 环境变量 (APP_PORT=8080)")
	fmt.Println("  3. 配置文件 (config.yaml)")
	fmt.Println("  4. 默认值")
	fmt.Println()
	fmt.Println("敏感配置（密码、密钥、Token）绝不可提交到版本控制。")
}

func viperBasicSetup() {
	fmt.Println("Viper 基本配置")
	fmt.Println("安装：go get github.com/spf13/viper")

	fmt.Println()
	fmt.Println("完整初始化示例：")
	fmt.Println(`
package config

import (
    "fmt"
    "strings"

    "github.com/spf13/viper"
)

func Load() (*Config, error) {
    v := viper.New()

    // --- 1. 配置文件 ---
    v.SetConfigName("config")      // 文件名（不含扩展名）
    v.SetConfigType("yaml")        // 文件类型
    v.AddConfigPath(".")           // 搜索路径
    v.AddConfigPath("./configs")   // 多路径搜索
    v.AddConfigPath("/etc/myapp")

    // --- 2. 环境变量 ---
    v.SetEnvPrefix("APP")          // 前缀 APP_
    v.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
    v.AutomaticEnv()               // 自动读取 APP_DATABASE_HOST 等

    // --- 3. 默认值 ---
    v.SetDefault("server.port", 8080)
    v.SetDefault("server.timeout", "30s")
    v.SetDefault("database.max_connections", 100)

    // 读取配置文件（如果存在）
    if err := v.ReadInConfig(); err != nil {
        if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
            return nil, fmt.Errorf("read config: %w", err)
        }
        fmt.Println("未找到配置文件，使用默认值和环境变量")
    } else {
        fmt.Printf("使用配置文件: %s\n", v.ConfigFileUsed())
    }

    var cfg Config
    if err := v.Unmarshal(&cfg); err != nil {
        return nil, fmt.Errorf("unmarshal: %w", err)
    }
    return &cfg, nil
}
`)
}

func viperYAML() {
	fmt.Println("YAML 配置文件")
	fmt.Println()
	fmt.Println("示例 config.yaml：")
	fmt.Println(`
server:
  host: "0.0.0.0"
  port: 8080
  timeout: 30s

database:
  host: "localhost"
  port: 5432
  name: "myapp"
  user: "app"
  password: ${DB_PASSWORD}  # 可引用环境变量
  max_connections: 100
  ssl_mode: "require"

redis:
  addrs:
    - "redis-1:6379"
    - "redis-2:6379"
    - "redis-3:6379"
  password: ""
  db: 0
  pool_size: 50

logging:
  level: "info"
  format: "json"
  output: "stdout"

features:
  new_checkout: true
  dark_mode: false
`)

	fmt.Println("Go 中读取嵌套配置：")
	fmt.Println(`
    port := viper.GetInt("server.port")           // 8080
    name := viper.GetString("database.name")      // "myapp"
    addrs := viper.GetStringSlice("redis.addrs")  // ["redis-1:6379", ...]
    flag := viper.GetBool("features.new_checkout") // true
`)
}

func viperEnv() {
	fmt.Println("环境变量映射")
	fmt.Println()
	fmt.Println("映射规则（使用 SetEnvKeyReplacer(\".\", \"_\")）：")
	fmt.Println("  server.port             → APP_SERVER_PORT")
	fmt.Println("  database.host           → APP_DATABASE_HOST")
	fmt.Println("  redis.pool_size         → APP_REDIS_POOL_SIZE")
	fmt.Println()
	fmt.Println("使用示例：")
	fmt.Println(`
    // 单独绑定环境变量到配置键
    viper.BindEnv("server.port", "APP_PORT")
    viper.BindEnv("database.password", "DB_PASSWORD")

    // 访问
    port := viper.GetInt("server.port")  // 读取 APP_PORT 环境变量
`)
	fmt.Println()
	fmt.Println("Docker 中使用：")
	fmt.Println(`
    docker run -e APP_SERVER_PORT=9090 -e APP_DATABASE_HOST=prod-db \
               -e APP_LOGGING_LEVEL=debug myapp
`)
}

func viperFlags() {
	fmt.Println("命令行参数绑定")
	fmt.Println()
	fmt.Println("Viper 与 pflag 集成：")
	fmt.Println(`
    import (
        "github.com/spf13/pflag"
        "github.com/spf13/viper"
    )

    func bindFlags(v *viper.Viper) {
        // 定义命令行标志
        pflag.Int("port", 8080, "server port")
        pflag.String("config", "", "config file path")
        pflag.Parse()

        // 绑定到 viper
        v.BindPFlag("server.port", pflag.Lookup("port"))
        v.BindPFlag("config", pflag.Lookup("config"))
    }

    // 命令行调用：
    // ./myapp --port=9090 --config=/etc/app.yaml
`)
}

func viperWatch() {
	fmt.Println("配置热加载（Watch）")
	fmt.Println()
	fmt.Println("Viper 支持监听配置文件变化，无需重启服务：")
	fmt.Println(`
    viper.WatchConfig()
    viper.OnConfigChange(func(e fsnotify.Event) {
        fmt.Printf("配置文件变更: %s (操作: %s)\n", e.Name, e.Op)

        // 重新解析配置
        var newCfg Config
        if err := viper.Unmarshal(&newCfg); err != nil {
            log.Printf("配置解析失败: %v", err)
            return
        }

        // 使用 atomic.Value 或 channel 安全更新配置
        globalConfig.Store(&newCfg)

        fmt.Println("配置已热更新")
    })

    // 读取当前配置时使用 atomic 获取：
    cfg := globalConfig.Load().(*Config)
`)
	fmt.Println()
	fmt.Println("注意：")
	fmt.Println("  - 监听需要 fsnotify 支持（Linux/macOS），Windows 可能需要特殊处理")
	fmt.Println("  - 热更新只适用于非致命的配置项（如日志级别、限流参数）")
	fmt.Println("  - 数据库连接池大小等复杂配置建议重启")
}

func viperUnmarshal() {
	fmt.Println("将配置映射到 Go 结构体")
	fmt.Println()
	fmt.Println("定义与 config.yaml 对应的结构体：")
	fmt.Println(`
type Config struct {
    Server   ServerConfig   ` + "`" + `mapstructure:"server"` + "`" + `
    Database DatabaseConfig ` + "`" + `mapstructure:"database"` + "`" + `
    Redis    RedisConfig    ` + "`" + `mapstructure:"redis"` + "`" + `
    Logging  LoggingConfig  ` + "`" + `mapstructure:"logging"` + "`" + `
}

type ServerConfig struct {
    Host    string        ` + "`" + `mapstructure:"host"` + "`" + `
    Port    int           ` + "`" + `mapstructure:"port"` + "`" + `
    Timeout time.Duration ` + "`" + `mapstructure:"timeout"` + "`" + `
}

type DatabaseConfig struct {
    Host           string ` + "`" + `mapstructure:"host"` + "`" + `
    Port           int    ` + "`" + `mapstructure:"port"` + "`" + `
    Name           string ` + "`" + `mapstructure:"name"` + "`" + `
    User           string ` + "`" + `mapstructure:"user"` + "`" + `
    Password       string ` + "`" + `mapstructure:"password"` + "`" + `
    MaxConnections int    ` + "`" + `mapstructure:"max_connections"` + "`" + `
}

// 使用
var cfg Config
viper.Unmarshal(&cfg)           // 默认使用 mapstructure tag
viper.UnmarshalKey("server", &serverCfg)  // 只映射 server 部分
`)
	fmt.Println()
	fmt.Println("注意：time.Duration 类型在 YAML 中可以直接写 '30s'，Viper 会自动解析。")
}
