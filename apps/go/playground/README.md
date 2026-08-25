# 🎯 playground — 自己的练习场

> 学习方法论：`apps/go/LEARNING_METHOD.md` 方案 B。
> 这里写 **`package main`** 的独立文件，用于「改一处代码 → 预测输出 → 再跑」的主动回忆练习。

## 怎么跑

```bash
cd apps/go

# 单个文件直接跑（文件名别用 _test 后缀，否则会被当成测试文件）
go run playground/channel_demo.go

# 或者
go run ./playground
```

## 怎么从文档 demo 搬到这练

1. 想练哪个知识点，先 `go run . <主题>` 看 demo 输出
2. 把关键片段抄进来，改成 `package main` + 一个 `main()`
3. 改参数 → 预测输出 → `go run` 验证

## 小技巧

- 文件名以 `_test.go` 结尾会被 `go test` 当成测试文件，练习文件**不要**这样命名
- 多个文件想一起跑：都放这里，`go run ./playground` 即可
