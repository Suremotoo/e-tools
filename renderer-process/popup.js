/**
 * [pop_error ajaxError 提示]
 * @param  {[type]} jqXHR       [description]
 * @param  {[type]} textStatus  [description]
 * @param  {[type]} errorThrown [description]
 * @return {[type]}             [description]
 */
function pop_ajaxError(jqXHR, textStatus, errorThrown) {
    pop_alert('error: ' + textStatus + " " + errorThrown);
}

/**
 * [pop_alert 普通提示alert 框]
 * @param  {[type]} content [提示内容]
 * @return {[type]}         [description]
 */
function pop_alert(content) {
    var index = layer.alert(content, {
        skin: 'layui-layer-molv',
        closeBtn: 1,
        shadeClose: true, //开启遮罩关闭
        title: '提示',
        anim: 6
    }, function() {
        layer.close(index);
    });
}