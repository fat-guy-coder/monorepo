package microservices

import "fmt"

// RunGRPC 演示 gRPC 和 Protobuf 的核心概念。
// 注意：本文件中的代码为教学示例，实际运行需要先安装 protoc 和 gRPC 插件。
//
// 安装依赖（需要提前执行）：
//
//	go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
//	go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
//	go get google.golang.org/grpc
func RunGRPC() {
	fmt.Println("\n=== RPC 概念 ===")
	rpcConcept()

	fmt.Println("\n=== Protobuf 语法概览 ===")
	protobufSyntax()

	fmt.Println("\n=== 代码生成命令 ===")
	codeGeneration()

	fmt.Println("\n=== gRPC 服务定义 ===")
	grpcServiceDefinition()

	fmt.Println("\n=== Unary RPC 模式 ===")
	unaryRPCPattern()

	fmt.Println("\n=== 服务端流式 RPC ===")
	serverStreamingRPC()

	fmt.Println("\n=== 客户端流式 RPC ===")
	clientStreamingRPC()

	fmt.Println("\n=== 双向流式 RPC ===")
	bidirectionalStreamingRPC()

	fmt.Println("\n=== gRPC 拦截器 ===")
	grpcInterceptors()

	fmt.Println("\n=== Deadline / Timeout ===")
	grpcDeadline()
}

// rpcConcept 解释 RPC 的核心思想。
func rpcConcept() {
	fmt.Println("RPC (Remote Procedure Call) 远程过程调用")
	fmt.Println("核心理念：像调用本地函数一样调用远程服务")
	fmt.Println()
	fmt.Println("演化历程：")
	fmt.Println("  RPC (XML/SOAP) → gRPC (Protobuf/HTTP2) → Connect (Protobuf/HTTP)")
	fmt.Println()
	fmt.Println("gRPC 优势：")
	fmt.Println("  1. 基于 HTTP/2 — 多路复用、头部压缩、双向流")
	fmt.Println("  2. 使用 Protobuf — 强类型、高效二进制序列化")
	fmt.Println("  3. 代码生成 — 客户端/服务端代码自动生成")
	fmt.Println("  4. 支持多种语言 — Go、Java、Python、C++ 等")
}

// protobufSyntax 展示 Protobuf 基础语法。
func protobufSyntax() {
	// Protobuf（Protocol Buffers）是 Google 的序列化协议。
	// 通过 .proto 文件定义消息和服务，由 protoc 编译生成代码。
	fmt.Println("Protobuf (Protocol Buffers) 基础语法")
	fmt.Println()
	fmt.Println("基本类型的 .proto 文件示例：")
	fmt.Println(`
syntax = "proto3";

package user.v1;

option go_package = "github.com/monorepo/go/gen/user/v1;userv1";

// 消息定义 — 相当于 Go 的 struct
message User {
  int64  id       = 1;   // 字段编号用于序列化，不可更改
  string name     = 2;
  string email    = 3;
  int32  age      = 4;
  repeated string tags = 5;  // repeated = 切片/数组
}

// 请求消息
message GetUserRequest {
  int64 user_id = 1;
}

// 响应消息
message GetUserResponse {
  User user = 1;
}
`)
	fmt.Println()
	fmt.Println("常用字段类型：")
	fmt.Println("  double, float    — 浮点数")
	fmt.Println("  int32, int64     — 整数")
	fmt.Println("  uint32, uint64   — 无符号整数")
	fmt.Println("  bool             — 布尔值")
	fmt.Println("  string           — 字符串")
	fmt.Println("  bytes            — 字节数组")
	fmt.Println("  repeated T       — 数组/切片")
	fmt.Println("  map<K, V>        — 映射表")
	fmt.Println("  enum             — 枚举")
	fmt.Println("  oneof            — 互斥字段（类似联合类型）")
}

// codeGeneration 展示代码生成命令。
func codeGeneration() {
	fmt.Println("protoc 代码生成命令")
	fmt.Println()
	fmt.Println("基础命令：")
	fmt.Println("  # 生成 Go 消息代码")
	fmt.Println("  protoc --go_out=. --go_opt=paths=source_relative \\")
	fmt.Println("    proto/user/v1/user.proto")
	fmt.Println()
	fmt.Println("  # 生成 gRPC 服务代码")
	fmt.Println("  protoc --go-grpc_out=. --go-grpc_opt=paths=source_relative \\")
	fmt.Println("    proto/user/v1/user.proto")
	fmt.Println()
	fmt.Println("  # 合二为一")
	fmt.Println("  protoc --go_out=. --go_opt=paths=source_relative \\")
	fmt.Println("    --go-grpc_out=. --go-grpc_opt=paths=source_relative \\")
	fmt.Println("    proto/user/v1/*.proto")
	fmt.Println()
	fmt.Println("产生的文件：")
	fmt.Println("  user.pb.go       — 消息序列化代码（protoc-gen-go）")
	fmt.Println("  user_grpc.pb.go  — gRPC 服务端/客户端代码（protoc-gen-go-grpc）")
	fmt.Println()
	fmt.Println("推荐项目结构：")
	fmt.Println("  proto/              ← .proto 定义")
	fmt.Println("  gen/                ← 生成的代码（可 .gitignore）")
	fmt.Println("  internal/service/   ← 业务逻辑实现")
}

// grpcServiceDefinition 展示服务定义示例。
func grpcServiceDefinition() {
	fmt.Println("gRPC 服务定义 (.proto)")
	fmt.Println()
	serviceDef := `
syntax = "proto3";

package userv1;

service UserService {
  // Unary: 单一请求/响应
  rpc GetUser (GetUserRequest) returns (GetUserResponse);

  // 服务端流式: 客户端发一个请求，服务端返回流
  rpc ListUsers (ListUsersRequest) returns (stream User);

  // 客户端流式: 客户端发送流，服务端返回一个响应
  rpc CreateUsers (stream CreateUserRequest) returns (CreateUsersResponse);

  // 双向流式: 双方独立发送流
  rpc Chat (stream ChatMessage) returns (stream ChatMessage);
}

message User {
  int64  id    = 1;
  string name  = 2;
  string email = 3;
}

message GetUserRequest  { int64 id = 1; }
message GetUserResponse { User user = 1; }

message ListUsersRequest {
  int32 page_size = 1;
  string page_token = 2;
}

message CreateUserRequest {
  string name  = 1;
  string email = 2;
}

message CreateUsersResponse {
  repeated int64 ids = 1;
}

message ChatMessage {
  string user_id  = 1;
  string content  = 2;
  int64 timestamp = 3;
}
`
	fmt.Println(serviceDef)
}

// unaryRPCPattern 演示 Unary RPC 的客户端和服务端模式。
func unaryRPCPattern() {
	fmt.Println("Unary RPC — 最常用的模式")
	fmt.Println()
	fmt.Println("客户端发送一个请求，服务端返回一个响应。类似 HTTP POST。")

	// 服务端实现模式
	fmt.Println()
	fmt.Println("--- 服务端实现 ---")
	fmt.Println(`
// UserServer 实现生成的 UserServiceServer 接口
type UserServer struct {
    userv1.UnimplementedUserServiceServer
}

func (s *UserServer) GetUser(ctx context.Context, req *userv1.GetUserRequest) (*userv1.GetUserResponse, error) {
    // 参数校验
    if req.GetId() <= 0 {
        return nil, status.Error(codes.InvalidArgument, "invalid user id")
    }

    // 业务逻辑 — 从数据库查询用户
    user, err := s.repo.FindByID(ctx, req.GetId())
    if err != nil {
        return nil, status.Errorf(codes.Internal, "query failed: %v", err)
    }
    if user == nil {
        return nil, status.Error(codes.NotFound, "user not found")
    }

    return &userv1.GetUserResponse{User: user.ToProto()}, nil
}

// 启动服务端
func main() {
    lis, _ := net.Listen("tcp", ":50051")
    s := grpc.NewServer()
    userv1.RegisterUserServiceServer(s, &UserServer{})
    s.Serve(lis)
}
`)

	// 客户端调用模式
	fmt.Println("--- 客户端调用 ---")
	fmt.Println(`
func main() {
    conn, _ := grpc.Dial("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
    defer conn.Close()
    client := userv1.NewUserServiceClient(conn)

    // 设置超时
    ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
    defer cancel()

    resp, err := client.GetUser(ctx, &userv1.GetUserRequest{Id: 1})
    if err != nil {
        st, _ := status.FromError(err)
        log.Fatalf("gRPC error: code=%v message=%s", st.Code(), st.Message())
    }
    fmt.Printf("User: %s <%s>\n", resp.GetUser().GetName(), resp.GetUser().GetEmail())
}
`)
}

// serverStreamingRPC 演示服务端流式 RPC。
func serverStreamingRPC() {
	fmt.Println("服务端流式 RPC")
	fmt.Println("适用场景：列表查询、实时推送、日志流")

	fmt.Println()
	fmt.Println("--- 服务端实现 ---")
	fmt.Println(`
func (s *UserServer) ListUsers(req *userv1.ListUsersRequest, stream userv1.UserService_ListUsersServer) error {
    // 分页查询数据库
    cursor := req.GetPageToken()
    for {
        users, nextToken, err := s.repo.List(ctx, req.GetPageSize(), cursor)
        if err != nil {
            return status.Errorf(codes.Internal, "list failed: %v", err)
        }
        for _, u := range users {
            // 逐条发送给客户端
            if err := stream.Send(u.ToProto()); err != nil {
                return err
            }
        }
        if nextToken == "" {
            break // 没有更多数据
        }
        cursor = nextToken
    }
    return nil
}
`)

	fmt.Println("--- 客户端调用 ---")
	fmt.Println(`
    stream, err := client.ListUsers(ctx, &userv1.ListUsersRequest{PageSize: 10})
    if err != nil {
        log.Fatal(err)
    }
    for {
        user, err := stream.Recv()
        if err == io.EOF {
            break // 流结束
        }
        if err != nil {
            log.Fatal(err)
        }
        fmt.Printf("Received: %s\n", user.GetName())
    }
`)
}

// clientStreamingRPC 演示客户端流式 RPC。
func clientStreamingRPC() {
	fmt.Println("客户端流式 RPC")
	fmt.Println("适用场景：批量上传、数据导入、文件上传")

	fmt.Println()
	fmt.Println("--- 服务端实现 ---")
	fmt.Println(`
func (s *UserServer) CreateUsers(stream userv1.UserService_CreateUsersServer) error {
    var ids []int64
    for {
        req, err := stream.Recv()
        if err == io.EOF {
            // 接收完毕，统一返回结果
            return stream.SendAndClose(&userv1.CreateUsersResponse{Ids: ids})
        }
        if err != nil {
            return err
        }
        id := s.repo.Create(ctx, req)
        ids = append(ids, id)
    }
}
`)

	fmt.Println("--- 客户端调用 ---")
	fmt.Println(`
    stream, err := client.CreateUsers(ctx)
    if err != nil {
        log.Fatal(err)
    }

    users := []*userv1.CreateUserRequest{
        {Name: "Alice", Email: "alice@example.com"},
        {Name: "Bob",   Email: "bob@example.com"},
    }
    for _, u := range users {
        if err := stream.Send(u); err != nil {
            log.Fatal(err)
        }
    }

    resp, err := stream.CloseAndRecv()
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("Created user IDs: %v\n", resp.GetIds())
`)
}

// bidirectionalStreamingRPC 演示双向流式 RPC。
func bidirectionalStreamingRPC() {
	fmt.Println("双向流式 RPC")
	fmt.Println("适用场景：聊天、实时协作、股票行情推送")

	fmt.Println()
	fmt.Println("--- 服务端实现 ---")
	fmt.Println(`
func (s *ChatServer) Chat(stream chatpb.ChatService_ChatServer) error {
    for {
        msg, err := stream.Recv()
        if err == io.EOF {
            return nil
        }
        if err != nil {
            return err
        }
        // 广播给所有在线用户
        for _, client := range s.hub.GetClients(msg.RoomId) {
            client.Send(msg)
        }
    }
}
`)

	fmt.Println("--- 客户端调用 ---")
	fmt.Println(`
    stream, err := client.Chat(ctx)
    if err != nil {
        log.Fatal(err)
    }

    // 接收 goroutine
    go func() {
        for {
            msg, err := stream.Recv()
            if err != nil {
                return
            }
            fmt.Printf("[%s] %s: %s\n", msg.RoomId, msg.UserId, msg.Content)
        }
    }()

    // 发送消息
    for _, msg := range messages {
        stream.Send(msg)
    }
`)
}

// grpcInterceptors 演示 gRPC 拦截器（中间件）。
func grpcInterceptors() {
	fmt.Println("gRPC 拦截器 — 类似 HTTP 中间件")
	fmt.Println()

	fmt.Println("--- Unary 拦截器 ---")
	fmt.Println(`
// 服务端 Unary 拦截器 — 统一处理认证、日志、恢复
func UnaryAuthInterceptor(ctx context.Context, req interface{},
    info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {

    // 前置处理：验证 token
    md, ok := metadata.FromIncomingContext(ctx)
    if !ok {
        return nil, status.Error(codes.Unauthenticated, "missing metadata")
    }
    token := md.Get("authorization")
    if len(token) == 0 {
        return nil, status.Error(codes.Unauthenticated, "missing token")
    }

    start := time.Now()
    // 调用实际 handler
    resp, err := handler(ctx, req)
    // 后置处理：记录请求日志
    log.Printf("method=%s duration=%v err=%v", info.FullMethod, time.Since(start), err)
    return resp, err
}

// 注册拦截器
s := grpc.NewServer(grpc.UnaryInterceptor(UnaryAuthInterceptor))
`)

	fmt.Println("--- Stream 拦截器 ---")
	fmt.Println(`
func StreamLoggingInterceptor(srv interface{}, ss grpc.ServerStream,
    info *grpc.StreamServerInfo, handler grpc.StreamHandler) error {

    log.Printf("stream started: %s", info.FullMethod)
    err := handler(srv, ss)
    log.Printf("stream ended: %s err=%v", info.FullMethod, err)
    return err
}

s := grpc.NewServer(grpc.StreamInterceptor(StreamLoggingInterceptor))
`)

	fmt.Println("--- 客户端拦截器 ---")
	fmt.Println(`
// 客户端侧：自动注入 metadata
conn, _ := grpc.Dial("localhost:50051",
    grpc.WithUnaryInterceptor(func(ctx context.Context, method string,
        req, reply interface{}, cc *grpc.ClientConn, invoker grpc.UnaryInvoker,
        opts ...grpc.CallOption) error {

        ctx = metadata.AppendToOutgoingContext(ctx, "authorization", "Bearer xxx")
        return invoker(ctx, method, req, reply, cc, opts...)
    }),
)
`)
}

// grpcDeadline 演示 Deadline 和 Timeout 的用法。
func grpcDeadline() {
	fmt.Println("Deadline / Timeout 在 gRPC 中的使用")
	fmt.Println()
	fmt.Println("gRPC 通过 Context 传递 deadline，支持：")
	fmt.Println("  1. 客户端设置超时时间")
	fmt.Println("  2. 服务端检测并遵守 deadline")
	fmt.Println("  3. 中间服务自动传递 deadline（context 传播）")
	fmt.Println()
	fmt.Println("--- 客户端设置超时 ---")
	fmt.Println(`
    // 设置 3 秒超时
    ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
    defer cancel()

    resp, err := client.GetUser(ctx, &userv1.GetUserRequest{Id: 1})
    if err != nil {
        if status.Code(err) == codes.DeadlineExceeded {
            fmt.Println("请求超时！")
        }
    }
`)
	fmt.Println("--- 服务端检测 deadline ---")
	fmt.Println(`
func (s *UserServer) GetUser(ctx context.Context, req *pb.GetUserRequest) (*pb.GetUserResponse, error) {
    // 检查是否超时
    if deadline, ok := ctx.Deadline(); ok {
        fmt.Printf("请求 deadline: %v, 剩余: %v\n", deadline, time.Until(deadline))
    }

    // 在每次 IO 操作前检查 context
    select {
    case <-ctx.Done():
        return nil, ctx.Err() // context deadline exceeded
    default:
    }

    // 数据库查询也传入 ctx，确保取消链传播
    user, err := s.db.QueryContext(ctx, "SELECT * FROM users WHERE id = ?", req.GetId())
    return &pb.GetUserResponse{User: user}, err
}
`)
}
