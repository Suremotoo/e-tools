

const links = document.querySelectorAll('link[rel="import"]')

// Import and add each page to the DOM
Array.prototype.forEach.call(links, function (link) {
  let template = link.import.querySelector('.navigator-content').content
  // let clone = document.importNode(template.content, true)
  console.log(template)

    // document.querySelector('.layui-tab-item .layui-show').appendChild(template)

})
