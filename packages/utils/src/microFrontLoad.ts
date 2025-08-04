


export const loadResource = (appUrl: string) => {
  return fetch(appUrl).then(res => res.text()).then(text => {
    //正则获取所有外部的script标签
    const externalScripts = text.match(/<script src="(.*?)"><\/script>/s)
    //正则获取所有内部的script标签
    const internalScripts = text.match(/<script>(.*?)<\/script>/s)
    //正则获取所有的style标签
    const styles = text.match(/<style src="(.*?)"><\/style>/s)
    //正则获取所有外部的css的link标签
    const externalLinks = text.match(/<link rel="stylesheet" href="(.*?)"><\/link>/s)
    //加载并执行外部script
    externalScripts?.forEach(script => {
      const scriptElement = document.createElement('script')
      scriptElement.src = script
      document.body.appendChild(scriptElement)
    })
    //加载并执行内部script
   return {
    externalScripts,
    internalScripts,
    styles,
    externalLinks
   }
  })
}