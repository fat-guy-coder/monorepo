// go-2-9-concurrency-patterns.go
// 阶段 2-9：Go 并发模式 —— Pipeline / Fan-out-in / Worker Pool / Or-Done / Generator
//
// 这 5 种模式本质都是「拿 channel 搭积木」：
//   生产者(Producer)：往 channel 塞数据的 goroutine
//   消费者(Consumer)：从 channel 取数据的 goroutine
//   channel       ：两者之间的"传送带"（无缓冲 = 发一个必须正好有人接）
//
// 每个模式都配了「执行步骤」和「输出注释」——不运行也能看懂结果。
package concurrency

import (
	"fmt"
	"sync"
)

// RunConcurrencyPatterns 演示 5 种经典并发模式
func RunConcurrencyPatterns() {
	// ════════════════════════════════════════════════════════════
	// ① Pipeline（流水线）：gen → sq → print
	// ════════════════════════════════════════════════════════════
	// 生活类比：餐厅出餐流水线——洗菜/切菜/炒菜各是一个工位(goroutine)，
	// 每个工位干完自己的活，把结果递给下一个工位(channel)，各工位同时开工。
	fmt.Println("=== ① Pipeline：gen → sq → print ===")

	// gen：第一个工位——"生成数字"
	// 返回只读 channel(<-chan int)，内部 goroutine 把 nums 逐个塞进 out
	gen := func(nums ...int) <-chan int {
		out := make(chan int) // 无缓冲：发一个必须有人接，否则阻塞等待
		// 执行步骤：
		//   1. 启动内部 goroutine
		//   2. 逐个发送 nums：发 2 → 等 sq 接 → 发 3 → ...
		//   3. 全部发完 → close(out)，通知下游"没了"
		go func() {
			for _, n := range nums {
				out <- n // ← 无缓冲：必须 sq 正好在读，否则阻塞在这
			}
			close(out)
		}()
		return out
	}

	// sq：第二个工位——"求平方"
	sq := func(in <-chan int) <-chan int {
		out := make(chan int)
		// 执行步骤：
		//   1. 启动内部 goroutine
		//   2. for n := range in：从上游逐个收（2, 3, 4）
		//   3. 每个算完平方发到 out（4, 9, 16）
		//   4. 上游 close → range 结束 → close(out) 通知下游
		go func() {
			for n := range in {
				out <- n * n
			}
			close(out)
		}()
		return out
	}

	// 串联：gen(2,3,4) → sq → 主 goroutine 逐条接收
	// 执行步骤：
	//   1. sq(gen(2,3,4))：先调 gen 启动"生成工位"，再调 sq 启动"平方工位"
	//   2. for v := range ...：主 goroutine 从 sq 的输出逐个收
	//   3. 三个工位并发跑：gen 发 3 时，sq 可能正在算 2² —— 不是串行等待
	for v := range sq(gen(2, 3, 4)) {
		fmt.Printf("  %d\n", v)
	}
	// 输出:
	//   4   ← gen发2 → sq算2² → 主goroutine收4
	//   9   ← gen发3 → sq算3² → 主goroutine收9
	//   16  ← gen发4 → sq算4² → 主goroutine收16；sq读到上游关闭 → close输出 → range结束

	// ════════════════════════════════════════════════════════════
	// ② Fan-out / Fan-in（并行分发 + 合并结果）
	// ════════════════════════════════════════════════════════════
	// 生活类比：外卖高峰期——一个订单喊多个骑手送(Fan-out)，送完回站点汇总(Fan-in)。
	// Fan-out：多个 goroutine 从同一个 channel 读 → 任务自动瓜分
	// Fan-in ：多个 channel 合并成一个输出 channel
	fmt.Println("\n=== ② Fan-out / Fan-in：一进多出再合并 ===")

	// merge：把多个 channel 合并成一个输出 channel
	merge := func(cs ...<-chan int) <-chan int {
		var wg sync.WaitGroup
		out := make(chan int)
		// 每个输入 channel 启动一个"转发 goroutine"
		for _, c := range cs {
			wg.Add(1)
			go func(c <-chan int) {
				defer wg.Done()
				for n := range c {
					out <- n // 把数据转发到合并后的 channel
				}
			}(c)
		}
		// 所有转发 goroutine 干完 → 关闭合并输出
		go func() {
			wg.Wait()
			close(out)
		}()
		return out
	}

	// 使用：1 个 gen 生成，2 个 sq 并行处理(Fan-out)，merge 合并(Fan-in)
	in := gen(1, 2, 3, 4, 5, 6)
	c1, c2 := sq(in), sq(in) // 两个 worker 读同一个 channel → 6 个数被自动瓜分
	fmt.Printf("  merge 结果:")
	for n := range merge(c1, c2) {
		fmt.Printf(" %d", n)
	}
	fmt.Println()
	// 输出示例（每次运行顺序不同）: merge 结果: 1 4 9 16 25 36
	// 执行步骤：
	//   1. gen 逐个发 1..6，c1/c2 谁闲谁接 → 6 个数被瓜分
	//   2. 每个 sq 算完平方发到自己的 out
	//   3. merge 的 2 个转发 goroutine 把结果汇总到同一个 channel
	//   4. ⚠️ 谁先算完谁先到 → 合并顺序不确定，别依赖先后

	// ════════════════════════════════════════════════════════════
	// ③ Worker Pool（固定工人数，控制并发）
	// ════════════════════════════════════════════════════════════
	// 生活类比：银行柜台——人再多，同时办业务的只有 3 个窗口(worker)。
	fmt.Println("\n=== ③ Worker Pool：3 个 worker 瓜分 5 个 job ===")

	jobs := make(chan int, 5) // 缓冲 5：任务先进缓冲区排队，不被阻塞
	var wg sync.WaitGroup
	for w := 1; w <= 3; w++ { // 固定 3 个 worker → 同时干活的 ≤ 3
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			for j := range jobs { // 有活就干；close(jobs) 后读到关闭 → 自动退出
				fmt.Printf("  worker %d: job %d\n", id, j)
			}
		}(w)
	}
	for j := 1; j <= 5; j++ {
		jobs <- j // 主 goroutine 派发 5 个任务（放进缓冲，不用等 worker 接）
	}
	close(jobs) // 通知所有 worker：没有新任务了
	wg.Wait()   // 等 3 个 worker 全部收工
	// 输出示例（worker 分配顺序每次不同）:
	//   worker 1: job 1
	//   worker 2: job 2
	//   worker 3: job 3
	//   worker 1: job 4   ← 1 号干完又回来领活
	//   worker 2: job 5
	// 执行步骤：
	//   1. 开 3 个 worker goroutine，都阻塞在 range jobs 等任务
	//   2. 主 goroutine 连发 5 个任务（缓冲 5，不会阻塞）
	//   3. close(jobs)：worker 的 range 读到"已关闭"逐个退出
	//   4. wg.Wait()：等 3 个 worker 都退出，防止主 goroutine 先跑完

	// ════════════════════════════════════════════════════════════
	// ④ Or-Done：消费者中途不想要了，安全退出
	// ════════════════════════════════════════════════════════════
	// 生活类比：自助餐吃到一半想走——必须让后厨听到"别做了"。
	// ⚠️ 问题背景：如果消费者直接 break，生产者还在往 channel 塞数据没人接收 → 永久卡死(泄漏)：
	//   for v := range sq(gen(1, 2, 3, 4, 5, 6)) {
	//       if v == 4 { break }   // 生产者还在发 5、6 → 没人接收 → 卡死
	//   }
	// 解法(方案 A)：把 done channel 传给每个阶段，每个 send 都 select 一下 done。
	fmt.Println("\n=== ④ Or-Done：消费者读到想要的数字就停 ===")

	// genDone：带 done 的生成器——发数据前先问"还要继续吗？"
	genDone := func(done <-chan struct{}, nums ...int) <-chan int {
		out := make(chan int)
		go func() {
			defer close(out)
			for _, n := range nums {
				select {
				case out <- n: // 正常发送
				case <-done: // 收到「别做了」 → 立刻退出（不再卡在 send 上）
					return
				}
			}
		}()
		return out
	}
	// sqDone：带 done 的平方器——同样每个 send 都 select done
	sqDone := func(done <-chan struct{}, in <-chan int) <-chan int {
		out := make(chan int)
		go func() {
			defer close(out)
			for n := range in {
				select {
				case out <- n * n:
				case <-done:
					return
				}
			}
		}()
		return out
	}

	done := make(chan struct{})
	for v := range sqDone(done, genDone(done, 1, 2, 3, 4, 5, 6)) {
		fmt.Printf("  消费者收到 %d\n", v)
		if v == 4 { // 拿到想要的 → 喊「别做了」
			close(done)
			fmt.Println("  消费者 close(done) → 各阶段收到「别做了」信号")
			break
		}
	}
	// 输出:
	//   消费者收到 1
	//   消费者收到 4
	//   消费者 close(done) → 各阶段收到「别做了」信号
	// 执行步骤：
	//   1. genDone 发 1 → sqDone 算 1²=1 → 消费者收 1（v≠4，继续）
	//   2. genDone 发 2 → sqDone 算 2²=4 → 消费者收 4 → v==4 → close(done) + break
	//   3. genDone 的 select 命中 <-done → 退出并 close(out)
	//   4. sqDone 的 range in 读到关闭 → 退出并 close(out)
	//   5. 关键：send 都包了 select done → 不再有"塞不出去就死等"的泄漏

	// ════════════════════════════════════════════════════════════
	// ⑤ Generator（惰性生成）：要一个才算一个
	// ════════════════════════════════════════════════════════════
	// 生活类比：自动售货机——投币才出货，绝不提前囤货。
	fmt.Println("\n=== ⑤ Generator：惰性生成斐波那契 ===")

	fib := func() <-chan int {
		ch := make(chan int)
		go func() {
			a, b := 0, 1
			for {
				ch <- a // 发一个 → 等消费者收 → 再算下一个
				a, b = b, a+b
			}
		}()
		return ch
	}
	f := fib()
	// 执行步骤：每执行一次 <-f，内部 goroutine 才推进一步斐波那契
	//   <-f → 算好 0 发出 → 消费者收 0 → goroutine 再算 1 等在 channel 上
	fmt.Printf("  前 6 项:")
	for i := 0; i < 6; i++ {
		fmt.Printf(" %d", <-f) // 要一个，才给你算一个
	}
	fmt.Println()
	// 输出: 前 6 项: 0 1 1 2 3 5
	// 逐步对应（每读一次推进一项）:
	//   <-f → 0   (a=0)
	//   <-f → 1   (b=1)
	//   <-f → 1   (0+1)
	//   <-f → 2   (1+1)
	//   <-f → 3   (1+2)
	//   <-f → 5   (2+3)
	// 即使是无限序列，也只算被消费的部分——不占内存
}
