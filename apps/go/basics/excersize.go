package basics

import "fmt"

func RunExcersize() {
	//变量
	var a int = 10
	var b int8 = -20
	var c uint32 = 6530
	fmt.Println(a, b, c)

	d := "aaa"

	const (
		a1 int16 = 6530
		b1 byte  = 0
	)

	const (
		c1 = iota
		c2
		c3
	)

	if d == "aaa" {
		fmt.Printf("%s", d)
	}

	if e := 0; e < 0 {
		fmt.Print(e)
	} else {
		fmt.Println(e, "eee")
	}

	for f := 0; f < 10; f++ {
		fmt.Print(f)
	}

	g := 10

	for {
		if g == 0 {
			break
		}
		fmt.Println(g)
	}

}

func H(arg int) int {
	return arg
}

func I(nums ...int) (I1 int, I2 string) {
	I1 = len(nums)
	I2 = "aaa"
	return
}

func J(nums []int) (length int, str string) {
	return len(nums), "aaa"
}

//defer的作用是延迟执行
//参数求值时机
//关键细节：defer 语句的参数在 defer 声明时立即求值，而非在实际执行时
func deferFun() {
	x := 1
	defer fmt.Println("x is ", x)
	x = 2
}
