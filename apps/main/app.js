
console.log('app.js 加载完成');

function handle2 () {
  let num = 0
  for (let i = 0; i < 10000; i++) {
    num += i
  }
  console.log(num)
  return num
}
handle2()

