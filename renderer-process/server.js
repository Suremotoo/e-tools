/**
 * 后台处理服务模块
 */
var crypto = require('../main-process/crypto.js') // 引入加密模块
var sqlFormatter = require('sql-formatter'); // 引入 sql 格式化模块
var UUID = require('uuid');
var express = require('express'); //引入框架模块express

var app = express(); //实例化（或者叫引用express）

app.use(express.static('../sections/')); //express.static('/')使用相对本文件路径下的静态资源，HTML，JAVASCRIPT等
//简单一些就是在此文件中添加要使用的HTML、js、CSS等文件的存放路径

//使用上述路径中的client.html文件（就是可以直接在浏览器中输入http://127.0.0.1:3000/client.html来访问此网页）
//此功能就好比是Apache（PHP）服务器时，把HTML文件放入www的文件夹下，用网址来访问功能相同
//假如此文件的绝对路径是/home/NodeCode/httpServer/nodeHttp.js
//__dirname获得此文件所在的目录路径，即返回/home/NodeCode/httpServer
//__filename可返回此文件的绝对路径，/home/NodeCode/httpServer/nodeHttp.js
app.get('../sections/*', (req, res) => {
    res.sendFile(__dirname + '/' + '*');
}); //__dirname+'/'+'client.html'，__dirname返回目录路径，之后进行字符串合并，最后的结果就是/home/NodeCode/httpServer/client.html，响应会沿着这个路径找到路径，然后发送给请求

console.log(__dirname);
console.log(__filename);

//接收到请求之后做处理
//req.query此属性直接存放的是接收到的表单数据（以关联数组的形式存在）
//键是HTML表单中各元素的name，值是各元素的value
//可对此属性进行解析
app.get('/process_get', (req, res) => {
    console.log('主页 post请求'); //后台打印一个信息，表示正在执行
    var response = { //解码接收到的字符串，并存放在response对象（或者叫数组中）
        'type': req.query.hidden_type,
        'func': req.query.func,
        'origin_content': req.query.origin_content // textarea 内容
    }
    console.log(req.query);
    var argName = response.origin_content;
    var function_name = response.func + '("' + argName + '")';
    if (response.type === 'none_param') {
        function_name = response.func;
    }
    response.result_content = eval(function_name);
    res.write(JSON.stringify(response));
    res.end();
})

var server = app.listen(38664, function () { //监听38664port
    var host = server.address().adress;
    var port = server.address().port;
    console.log('应用实例，访问地址为 http://%s:%s', host, port);
})