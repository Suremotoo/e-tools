/**
 * [clear 清空页面,利用刷新该页面实现]
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */
function clearContent(args) {
    history.go(0);
}

/**
 * [generateUUID js 生成 UUID 、 GUID ]
 * @return {[type]} [description]
 */
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

/**
 * [removeString 替换字符串]
 * @param  {[type]} str  [原字符串]
 * @param  {[type]} rstr [需要替换的内容]
 * @param  {[type]} tstr [替换后的目标内容]
 * @return {[type]}      [description]
 */
function removeString(str, rstr, tstr) {
    return str.replace(new RegExp(rstr, 'g'), tstr);
}

/**
 * [removeHyphen 移除连字符]
 * @param  {[type]} str  [原字符串]
 * @return {[type]}      [description]
 */
function removeHyphen(str) {
    return removeString(str, "-", "");
}

/**
 * [compressJSON 压缩 JSON]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function compressJSON(text) {
  
    text = text.split("\n").join(" ");
    var t = [];
    var inString = false;
    for (var i = 0, len = text.length; i < len; i++) {
        var c = text.charAt(i);
        if (inString && c === inString) {
            if (text.charAt(i - 1) !== '\\') {
                inString = false;
            }
        } else if (!inString && (c === '"' || c === "'")) {
            inString = c;
        } else if (!inString && (c === ' ' || c === "\t")) {
            c = '';
        }
        t.push(c);
    }
    text = t.join('');
    return text;
}