//写一个利用map列表转树的方法
function listToTree(list: any[]) {
  const map = new Map()
  let root = null
  // 先构建map
  for (const item of list) {
    map.set(item.id, item);
  }
  // 再构建树
  for (const item of list) {
    if (item.pid === 0 || !item.pid) {
      root = item;
    } else {
      const parent = map.get(item.pid);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(item);
      }
    }
  }
  return root
}

const list = [
  { id: 1, name: '1', pid: 0 },
  { id: 2, name: '2', pid: 1 },
  { id: 3, name: '3', pid: 1 },
  { id: 4, name: '4', pid: 2 },
]

console.log(listToTree(list))
