
console.log('app.js 加载完成');

const img = new Image();
img.src = 'https://picsum.photos/200/300';

export default img;


export const obj = {
  name: '张三',
  age: 18,
  sayHello: function() {
    console.log('hello');
  }
}

setTimeout(() => {
  obj.name = '李四';
  console.log(obj,JSON.stringify(obj));
}, 2000);

