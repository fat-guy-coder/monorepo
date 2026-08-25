package basics

import (
	"fmt"
	"reflect"
)

// Customer 演示反射读取 struct tag（json/validate）。
type Customer struct {
	Name string `json:"name" validate:"required"`
	Age  int    `json:"age" validate:"min=0"`
}

// RunReflection 演示反射：TypeOf/ValueOf、遍历字段、读 tag、反射改值。
func RunReflection() {
	fmt.Println("--- reflect.TypeOf / ValueOf 基础 ---")
	p := Customer{Name: "Alice", Age: 30}
	t := reflect.TypeOf(p)
	v := reflect.ValueOf(p)
	fmt.Println("Type 名:", t.Name(), "| Kind:", t.Kind(), "| 字段数:", t.NumField())
	fmt.Println("Value.Interface():", v.Interface(), "| 第0个字段:", v.Field(0).Interface())
	// 输出:
	// Type 名: Customer | Kind: struct | 字段数: 2
	// Value.Interface(): {Alice 30} | 第0个字段: Alice

	fmt.Println()
	fmt.Println("--- 遍历字段 + 读 struct tag ---")
	for i := 0; i < t.NumField(); i++ {
		f := t.Field(i)
		fmt.Printf("字段 %-5s (%s) json=%q validate=%q\n",
			f.Name, f.Type, f.Tag.Get("json"), f.Tag.Get("validate"))
	}
	// 输出:
	// 字段 Name  (string) json="name" validate="required"
	// 字段 Age   (int) json="age" validate="min=0"

	fmt.Println()
	fmt.Println("--- struct → map（通用导出，供日志/导出用） ---")
	m := structToMap(p)
	fmt.Println("structToMap:", m)
	// 输出: structToMap: map[name:Alice age:30]

	fmt.Println()
	fmt.Println("--- 反射改值：必须 ValueOf(&x).Elem() 取可寻址值 ---")
	x := 10
	rv := reflect.ValueOf(&x).Elem() // 解引用拿到可写值
	if rv.CanSet() {
		rv.SetInt(99) // 类型不匹配会 panic
	}
	fmt.Println("反射改值后 x =", x)
	// 输出: 反射改值后 x = 99
}

// structToMap 用反射把任意 struct 转成 map[string]any，key 取 json tag（无 tag 用字段名）。
func structToMap(s any) map[string]any {
	result := map[string]any{}
	v := reflect.ValueOf(s)
	t := v.Type()
	for i := 0; i < v.NumField(); i++ {
		key := t.Field(i).Name
		if tag := t.Field(i).Tag.Get("json"); tag != "" && tag != "-" {
			key = tag
		}
		result[key] = v.Field(i).Interface()
	}
	return result
}
