/**
 * 处理请求模块
 */

layui.use(['form', 'layer'], function() {
    var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
    var $ = layui.jquery;
    form.render(); // 渲染 form 表单


    // 绑定checkbok 为单选功能以及修改对应功能按钮的执行方法
    form.on('checkbox(chk_condition)', function(data) {
        console.log(data.elem); //得到checkbox原始DOM对象
        console.log(data.elem.checked); //是否被选中，true或者false
        console.log(data.value); //复选框value值，也可以通过data.elem.value得到
        console.log(data.othis); //得到美化后的DOM对象

        var name = $(data.elem).attr('name');
        console.log(name)

        if (data.elem.checked) {
            var arr = $('input[name="' + name + '"]');
            $.each(arr, function(index, val) {
                $(val).prop('checked', false)
                $(val).removeProp('checked')
                $(val).removeAttr('checked')
            });

        }
        $(data.elem).attr('checked', 'checked');
        $(data.elem).attr('checked', true);
        $(data.elem).prop('checked', true);


        var args = $(data.elem).data('obj')
        console.log('args:' + args)
        $.each(args, function(index, val) {
            console.log(val.input_id + ":" + val.func_name)
            var inputObj = $('#' + val.input_id);
            console.log('对象:' + inputObj)
            $('#' + val.input_id).attr('data-func', val.func_name);
            $('#' + val.input_id).prop('data-func', val.func_name);
        });

        form.render(); // 重新渲染 form 表单
    });

    // 监听 form 表单提交
    form.on('submit(btn_submit)', function(event) {
        console.log('func:' + $(this).attr("data-func"));
        if (typeof($(this).attr("data-func")) == "undefined") {
            pop_alert('This button is unbound event!');
            return;
        }

        var index; // 用于关闭弹出层
        var reqData = $('.layui-form').serializeArray();
        reqData.push({ "name": "func", "value": $(this).attr("data-func") });
        $.ajax({
            data: reqData,
            url: 'http://127.0.0.1:38664/process_get',
            dataType: 'json',
            cache: false,
            async: true,
            timeout: 5000,
            beforeSend: function() {
                index = layer.load(2);
            },
            complete: function() {
                layer.close(index);
            },
            success: function(data) {
                console.log(data)
                $('#result_content').val(data.result_content);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                pop_ajaxError(jqXHR, textStatus, errorThrown);
            }
        });

    });



});