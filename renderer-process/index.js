const shell = require('electron').shell
const path = require('path')
const url = require('url')

layui.use(['element'], function() {
    var $ = layui.jquery,
        element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

    // 设置导航tab 不允许关闭
    var first_closeIcon = document.querySelectorAll("#navigator_tab i.layui-tab-close");
    first_closeIcon[0].style.display = "none";

    //触发事件
    var tab = {
        tabAdd: function(tab_info) {
            var othis = $(this),
                type = othis.data('type'),
                href = othis.data('href');
            id = othis.data('id');

            // var tab_content = '<object tab-id="'+id+'" type="text/html" data="' + href + '" width="100%" height="100%"></object>';
            var tab_content = '<iframe id="' + id + '" tab-id="' + id + '" frameborder="0" src="' + href + '"  width="100%" height="100%"></iframe>';

            //新增一个Tab项
            element.tabAdd('tab_filter', {
                title: othis.text(),
                content: tab_content,
                id: id
            });

            element.tabChange('tab_filter', id);
            CustomRightClick(id); // 绑定tab右键菜单

            resizeWebSize();

        },
        tabDelete: function(ids) {
            //删除指定Tab项
            element.tabDelete('tab_filter', id);
            //  othis.addClass('layui-btn-disabled');
        },
        tabChange: function(tab_id) {
            //切换到指定Tab项
            element.tabChange('tab_filter', tab_id);
        },
        tabDeleteAll: function(ids) { //删除所有
            $.each(ids, function(i, item) {
                element.tabDelete("tab_filter", item);
            })
        }
    };


    $('.layui-nav-item .layui-nav-child a, .tool-item .tool-item-inner a').on('click', function() {
        var othis = $(this),
            type = othis.data('type'),
            href = othis.data('href');
        id = othis.data('id');
        var li = $("li[lay-id=" + id + "]").length;
        if (li > 0) {
            //tab已经存在直接切换tab
            tab['tabChange'].call(this, this);
            element.tabChange('tab_filter', id);
        } else {
            //创建tab
            tab[type] ? tab[type].call(this, this) : '';
        }

    });

    //Hash地址的定位
    var layid = location.hash.replace(/^#tab_filter=/, '');
    element.tabChange('tab_filter', layid);

    element.on('tab(tab_filter)', function(elem) {
        location.hash = 'tab_filter=' + $(this).attr('lay-id');
    });

    /*
     * @todo 监听右键事件,绑定右键菜单
     * 先取消默认的右键事件，再绑定菜单，触发不同的点击事件
     */
    function CustomRightClick(id) {
        //取消右键 
        $('.layui-tab-title li').on('contextmenu', function() {
            return false;
        })
        $('.layui-tab-title,.layui-tab-title li').on('click', function() {
            $('.rightMenu').hide();
        });
        //桌面点击右击 
        $('.layui-tab-title li').on('contextmenu', function(e) {
            var aid = $(this).attr("lay-id"); //获取右键时li的lay-id属性
            var popupmenu = $(".rightMenu");
            popupmenu.find("li").attr("data-id", aid);
            //console.log("popopmenuId:" + popupmenu.find("li").attr("data-id"));
            l = ($(document).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX;
            t = ($(document).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
            popupmenu.css({
                left: l,
                top: t
            }).show();
            //alert("右键菜单")
            return false;
        });
    }
    $("#rightMenu li").click(function() {
        var tabtitle = $(".layui-tab-title li");
        var ids = new Array();

        var type = $(this).attr("data-type");
        var layId = $(this).attr("data-id")
        if (type == "current") {
            //console.log("close this:" + layId);
            // tab.tabDelete(layId);

            $.each(tabtitle, function(i) {
                if ($(this).attr("lay-id") == layId) {
                    ids[i] = $(this).attr("lay-id");
                    return;
                }
            })
            tab.tabDeleteAll(ids);
            ids = new Array();
        } else if (type == "all") {
            //console.log("closeAll");
            /*var tabtitle = $(".layui-tab-title li");
            var ids = new Array();*/
            $.each(tabtitle, function(i) {
                ids[i] = $(this).attr("lay-id");
            })
            tab.tabDeleteAll(ids);
        } else if (type == "fresh") {
            //console.log("fresh:" + layId);
            tab.tabChange($(this).attr("data-id"));
            var othis = $('.layui-tab-title').find('>li[lay-id="' + layId + '"]'),
                index = othis.parent().children('li').index(othis),
                parents = othis.parents('.layui-tab').eq(0),
                item = parents.children('.layui-tab-content').children('.layui-tab-item'),
                src = item.eq(index).find('iframe').attr("src");
            item.eq(index).find('iframe').attr("src", src);
        } else if (type == "other") {
            /*var thisId = layId;
            $('.layui-tab-title').find('li').each(function(i, o) {
                var layId = $(o).attr('lay-id');
                if (layId != thisId && layId != 0) {
                    tab.tabDelete(layId);
                }
            });*/
            $.each(tabtitle, function(i) {
                if ($(this).attr("lay-id") !== layId) {
                    ids[i] = $(this).attr("lay-id");
                }
            })
            tab.tabDeleteAll(ids);
            ids = new Array();
        }
        $('.rightMenu').hide();
    });


    function resizeWebSize() {
        $(window).on('resize', function() {
            var currBoxHeight = $('.layui-body .layui-tab-content').height(); //获取当前容器的高度
            var currBoxWidth = $('.layui-body .layui-tab-content').width(); //获取当前容器的高度
            $('iframe').height(currBoxHeight);
            $('iframe').width(currBoxWidth + 10);
            // $('object').height(currBoxHeight);
            // $('object').width(currBoxWidth);
        }).resize();
    }


    resizeWebSize();


    // 绑定导航下方的点击事件
    const exLinkArr = $('#introduce li');
    $.each(exLinkArr, function(index, val) {
        var exLinksBtn = $(val).children("a").get(0);
        (function(index) {
            $(val).click(function() {
                var ss = $(exLinksBtn).data('href')
                // 调用外部浏览器打开地址
                shell.openExternal($(exLinksBtn).data('href'));
            });

        })(index);
    });

// 绑定切换语言监听事件
    $('#select_language a').on('click', function() {
        var othis = $(this),
            language = othis.data('language');
             var location = window.location;
        switch (language) {
            case "us":
                location.href = "index-us.html"
                break;
            case "cn":
                location.href = "index.html"
                break;
            default:
        }
    });

});