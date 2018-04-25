// 引入fs文件处理模块
var fs = require("fs");
// 现在我们要关心的是'icons'文件夹
// 我们不妨用变量表示这个文件夹名称，方便日后维护和管理
var src = 'test';

// API文档中中找到遍历文件夹的API
// 找到了，是fs.readdir(path, callback)
// 文档中有叙述：
// 读取 path 路径所在目录的内容。 回调函数 (callback) 接受两个参数 (err, files) 其中 files 是一个存储目录中所包含的文件名称的数组
// 因此：
fs.readdir(src, function(err, files) {
    // files是名称数组，因此
    // 可以使用forEach遍历哈, 此处为ES5 JS一点知识
    // 如果不清楚，也可以使用for循环哈
    files.forEach(function(filename) {
        // 下面就是文件名称重命名
        // API文档中找到重命名的API，如下
        // fs.rename(oldPath, newPath, callback) 
        // 下面，我们就可以依葫芦画瓢，确定新旧文件名称：
        var oldPath = src + '/' + filename,
            // newPath = src + '/' + filename.replace(/_/g, '-');
            // 
            // 例如 ：恋爱先生.Mr.Right.2017.E01.WEB-DL.1080p.x264.AAC-HdMee.mp4
            // newPath = src + '/' + filename + "-20";
            newPath = src + '/' + filename.replace('.Mr.Right.2017.E','').replace('.WEB-DL.1080p.x264.AAC-HdMee','');

        // 重命名走起
        fs.rename(oldPath, newPath, function(err) {
            if (!err) {
                console.log(filename + '替换成功!');
            }
        })
    });
});