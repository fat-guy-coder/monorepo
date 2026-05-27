package examples

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
)

// RunPackages 运行包和标准库示例
func RunPackages() {
	fmt.Println("\n=== 包和标准库 ===")

	// fmt 包
	fmt.Printf("fmt 包: %s\n", "格式化输出")

	// strings 包
	s := "Hello, World!"
	fmt.Printf("strings.ToUpper: %s\n", strings.ToUpper(s))
	fmt.Printf("strings.ToLower: %s\n", strings.ToLower(s))
	fmt.Printf("strings.Contains: %t\n", strings.Contains(s, "World"))
	fmt.Printf("strings.Replace: %s\n", strings.Replace(s, "World", "Go", 1))
	fmt.Printf("strings.Split: %v\n", strings.Split("a,b,c", ","))

	// strconv 包
	num := 42
	str := strconv.Itoa(num)
	fmt.Printf("strconv.Itoa: %s\n", str)
	parsed, _ := strconv.Atoi(str)
	fmt.Printf("strconv.Atoi: %d\n", parsed)

	// json 包
	type Person struct {
		Name string `json:"name"`
		Age  int    `json:"age"`
	}

	p := Person{Name: "Alice", Age: 25}
	jsonBytes, _ := json.Marshal(p)
	fmt.Printf("json.Marshal: %s\n", string(jsonBytes))

	jsonStr := `{"name":"Bob","age":30}`
	var p2 Person
	json.Unmarshal([]byte(jsonStr), &p2)
	fmt.Printf("json.Unmarshal: %+v\n", p2)

	// os 包 (简要)
	// os.Mkdir, os.Create, os.Open, os.WriteFile 等

	fmt.Println("标准库示例完成")
}