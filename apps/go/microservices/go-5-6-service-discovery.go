package microservices

import "fmt"

// RunRegistry 演示服务注册与发现的核心模式。
// 涉及 Consul、健康检查、负载均衡和熔断器。
func RunRegistry() {
	fmt.Println("\n=== 服务发现模式 ===")
	discoveryPatterns()

	fmt.Println("\n=== Consul 注册示例 ===")
	consulRegistration()

	fmt.Println("\n=== 健康检查模式 ===")
	healthCheckPatterns()

	fmt.Println("\n=== 服务注销 ===")
	serviceDeregistration()

	fmt.Println("\n=== DNS 服务发现 ===")
	dnsDiscovery()

	fmt.Println("\n=== 负载均衡策略 ===")
	loadBalancing()

	fmt.Println("\n=== 熔断器模式 ===")
	circuitBreaker()
}

func discoveryPatterns() {
	fmt.Println("服务发现两大模式：")
	fmt.Println()
	fmt.Println("1. 客户端发现 (Client-side Discovery)")
	fmt.Println("   客户端从注册中心获取服务列表，自行负载均衡。")
	fmt.Println("   示例：Consul + 客户端 SDK、Eureka + Ribbon")
	fmt.Println()
	fmt.Println("   ┌─────────┐     ┌──────────────┐     ┌─────────┐")
	fmt.Println("   │ Client  │────>│Service Registry│<────│Service A│")
	fmt.Println("   │         │     │  (Consul)     │     └─────────┘")
	fmt.Println("   │ 查询A地址│     └──────────────┘              ")
	fmt.Println("   │ 直连A   │                                    ")
	fmt.Println("   └────┬────┘     ┌─────────┐                    ")
	fmt.Println("        └────────>│Service A│                    ")
	fmt.Println("                  └─────────┘                    ")
	fmt.Println()
	fmt.Println("2. 服务端发现 (Server-side Discovery)")
	fmt.Println("   客户端通过负载均衡器访问，均衡器查注册中心。")
	fmt.Println("   示例：Kubernetes Service、AWS ELB")
	fmt.Println()
	fmt.Println("   ┌─────────┐    ┌──────────┐    ┌──────────────┐")
	fmt.Println("   │ Client  │───>│  LB/Nginx │───>│Service A Pod │")
	fmt.Println("   └─────────┘    │  (Envoy) │    │Service A Pod │")
	fmt.Println("                  └────┬─────┘    └──────────────┘")
	fmt.Println("                       │查询")
	fmt.Println("                  ┌────┴─────────┐")
	fmt.Println("                  │K8s Service   │")
	fmt.Println("                  └──────────────┘")
}

func consulRegistration() {
	fmt.Println("Consul 服务注册示例")
	fmt.Println("安装依赖：go get github.com/hashicorp/consul/api")
	fmt.Println()

	code := `
// Consul 服务注册完整示例
package main

import (
    "fmt"
    "net"
    "strconv"

    consulapi "github.com/hashicorp/consul/api"
)

type ServiceRegistry struct {
    client *consulapi.Client
}

func NewServiceRegistry(consulAddr string) (*ServiceRegistry, error) {
    config := consulapi.DefaultConfig()
    config.Address = consulAddr // e.g., "localhost:8500"
    client, err := consulapi.NewClient(config)
    if err != nil {
        return nil, fmt.Errorf("create consul client: %w", err)
    }
    return &ServiceRegistry{client: client}, nil
}

func (r *ServiceRegistry) Register(svc ServiceDefinition) error {
    // 解析端口为 int
    _, portStr, _ := net.SplitHostPort(svc.Address)
    port, _ := strconv.Atoi(portStr)

    registration := &consulapi.AgentServiceRegistration{
        ID:      svc.ID,      // "user-service-1"
        Name:    svc.Name,    // "user-service"
        Address: svc.Host,    // "192.168.1.10"
        Port:    port,        // 8080
        Tags:    svc.Tags,    // ["v1", "primary"]
        Check: &consulapi.AgentServiceCheck{
            HTTP:     fmt.Sprintf("http://%s/health", svc.Address),
            Interval: "10s",
            Timeout:  "3s",
            DeregisterCriticalServiceAfter: "30s", // 30秒后自动注销
        },
    }

    return r.client.Agent().ServiceRegister(registration)
}

func (r *ServiceRegistry) Deregister(serviceID string) error {
    return r.client.Agent().ServiceDeregister(serviceID)
}

// 发现服务列表
func (r *ServiceRegistry) Discover(serviceName string) ([]*consulapi.ServiceEntry, error) {
    entries, _, err := r.client.Health().Service(serviceName, "", true, nil)
    return entries, err
}
`
	fmt.Println(code)
}

func healthCheckPatterns() {
	fmt.Println("常见健康检查模式")

	fmt.Println()
	fmt.Println("1. TTL 检查（心跳模式）")
	fmt.Println("   服务主动向 Consul 汇报健康状态，适合短生命周期的任务。")
	fmt.Println(`
    Check: &consulapi.AgentServiceCheck{
        TTL: "15s",  // 每 15 秒必须汇报一次
    }
    // 服务中定期调用
    client.Agent().UpdateTTL("service:my-service-1", "ok", "")
`)

	fmt.Println("2. HTTP 检查")
	fmt.Println("   Consul 定期 GET 服务的 /health 端点，200 表示健康。")
	fmt.Println(`
    Check: &consulapi.AgentServiceCheck{
        HTTP:     "http://localhost:8080/health",
        Interval: "10s",
        Timeout:  "2s",
    }
    // 对应的 Go HTTP handler
    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        // 可以检查数据库连接等依赖
        w.WriteHeader(http.StatusOK)
        w.Write([]byte(` + "`" + `{"status":"ok"}` + "`" + `))
    })
`)

	fmt.Println("3. gRPC 健康检查")
	fmt.Println("   使用 gRPC 标准健康检查协议（grpc-health-probe）。")
	fmt.Println(`
    // go get github.com/grpc-ecosystem/grpc-health-probe
    // 实现 grpc_health_v1.HealthServer 接口
    healthpb.RegisterHealthServer(grpcServer, &HealthServer{})
`)
}

func serviceDeregistration() {
	fmt.Println("优雅关闭与服务注销")
	fmt.Println(`
// 在服务启动时为注册中心创建一条记录
// 在服务关闭时（捕获 SIGINT/SIGTERM）主动注销
func main() {
    registry, _ := NewServiceRegistry("localhost:8500")
    svc := ServiceDefinition{
        ID:   "user-service-1",
        Name: "user-service",
        Host: "localhost",
        Address: "localhost:8080",
    }
    registry.Register(svc)

    // 监听系统信号
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit

    // 优雅关闭
    fmt.Println("Shutting down...")
    registry.Deregister(svc.ID)  // 主动注销
    // 可选：等待短暂时间让 Consul 传播注销信息
    time.Sleep(2 * time.Second)
    os.Exit(0)
}
`)
}

func dnsDiscovery() {
	fmt.Println("DNS 服务发现")
	fmt.Println("Consul 内置 DNS 接口（默认端口 8600），无需 SDK。")
	fmt.Println()
	fmt.Println("查询格式：")
	fmt.Println("  <service>.service.<datacenter>.consul")
	fmt.Println()
	fmt.Println("Go 中使用 DNS 发现：")
	fmt.Println(`
    // 通过 DNS 查询服务地址
    addrs, err := net.DefaultResolver.LookupHost(ctx, "user-service.service.dc1.consul")
    if err != nil {
        log.Fatal(err)
    }
    for _, addr := range addrs {
        fmt.Printf("Service at: %s:8080\n", addr)
    }
`)
	fmt.Println()
	fmt.Println("DNS 发现也支持 SRV 记录查询（获取端口）：")
	fmt.Println(`
    _, srvs, _ := net.DefaultResolver.LookupSRV(ctx, "", "", "user-service.service.dc1.consul")
    for _, srv := range srvs {
        fmt.Printf("Target: %s Port: %d\n", srv.Target, srv.Port)
    }
`)
}

func loadBalancing() {
	fmt.Println("客户端负载均衡策略")

	fmt.Println()
	fmt.Println("1. 轮询 (Round Robin)")
	fmt.Println("   依次轮流分配请求到每个实例，最简单公平。")
	fmt.Println(`
type RoundRobin struct {
    addrs []string
    idx   uint32
}

func (r *RoundRobin) Next() string {
    n := atomic.AddUint32(&r.idx, 1)
    return r.addrs[n % uint32(len(r.addrs))]
}
`)

	fmt.Println("2. 最少连接 (Least Connections)")
	fmt.Println("   选择当前活跃连接最少的实例。")
	fmt.Println(`
type LeastConnections struct {
    addrs  []string
    conns  map[string]int64
    mu     sync.RWMutex
}

func (l *LeastConnections) Next() string {
    l.mu.RLock()
    defer l.mu.RUnlock()
    min := int64(math.MaxInt64)
    var picked string
    for _, addr := range l.addrs {
        if c := l.conns[addr]; c < min {
            min = c
            picked = addr
        }
    }
    atomic.AddInt64(&l.conns[picked], 1) // 增加计数
    return picked
}

func (l *LeastConnections) Done(addr string) {
    atomic.AddInt64(&l.conns[addr], -1)
}
`)

	fmt.Println("3. 一致性哈希 (Consistent Hash)")
	fmt.Println("   相同 key 的请求总是路由到同一实例，适合有缓存状态的场景。")
	fmt.Println(`
// 使用 hash/crc32 或第三方库如 github.com/serialx/hashring
// 将多个虚拟节点映射到 hash 环上，查找时取 >= hash(key) 的第一个节点
`)
}

func circuitBreaker() {
	fmt.Println("熔断器模式 (Circuit Breaker)")
	fmt.Println("安装依赖：go get github.com/sony/gobreaker")
	fmt.Println()
	fmt.Println("三种状态：")
	fmt.Println("  CLOSED    ← 正常，请求通过")
	fmt.Println("  OPEN      ← 熔断，立即拒绝请求")
	fmt.Println("  HALF_OPEN ← 半开，允许少量请求探测恢复")
	fmt.Println()
	fmt.Println("状态转换：")
	fmt.Println("  失败次数 > 阈值 → CLOSED → OPEN")
	fmt.Println("  超时后        → OPEN → HALF_OPEN")
	fmt.Println("  探测成功      → HALF_OPEN → CLOSED")
	fmt.Println("  探测失败      → HALF_OPEN → OPEN")
	fmt.Println()

	cbExample := `
package main

import (
    "fmt"
    "time"
    "github.com/sony/gobreaker"
)

func NewCircuitBreaker() *gobreaker.CircuitBreaker {
    settings := gobreaker.Settings{
        Name:        "user-service",
        MaxRequests: 3,              // 半开状态最多允许 3 个请求
        Interval:    30 * time.Second,  // 统计周期
        Timeout:     10 * time.Second,  // OPEN 持续时间
        ReadyToTrip: func(counts gobreaker.Counts) bool {
            failureRatio := float64(counts.TotalFailures) / float64(counts.Requests)
            return counts.Requests >= 10 && failureRatio >= 0.6
            // 至少 10 个请求且失败率 >= 60% 时熔断
        },
        OnStateChange: func(name string, from gobreaker.State, to gobreaker.State) {
            fmt.Printf("熔断器: %s %s → %s\n", name, from, to)
        },
    }
    return gobreaker.NewCircuitBreaker(settings)
}

// 使用熔断器包装远程调用
func CallRemoteService(cb *gobreaker.CircuitBreaker) error {
    _, err := cb.Execute(func() (interface{}, error) {
        // 实际的远程调用
        return doGRPCCall()
    })
    return err
}
`
	fmt.Println(cbExample)
}
