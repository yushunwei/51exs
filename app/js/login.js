$(function(){
    (function($) {
        $.extend({
            urlGet:function(){
                var aQuery = window.location.href.split("?");
                var aGET = new Array();
                if(aQuery.length > 1)
                {
                    var aBuf = aQuery[1].split("&");
                    for(var i=0, iLoop = aBuf.length; i<iLoop; i++)
                    {
                        var aTmp = aBuf[i].split("=");
                        aGET[aTmp[0]] = aTmp[1];
                    }
                }
                return aGET;
            }
        })
    })(jQuery);

// 获取注册地址参数并赋值
    $(function(){
        $(".register").attr("href",decodeURIComponent($.urlGet()["r"]));
    });

    var img = $(".branding-inner div");
    var nav = $(".navigator li");
    var img_num = img.length;
    var i = 0;
//显示当前项
    function show() {
        i++;
        if(i > img_num -1) {
            i = 0;
        }
        nav.removeClass("cur").eq(i).addClass("cur");
        img.fadeOut("500").eq(i).fadeIn("500");
    }
//定时器
    var slide = null;
    slide = setInterval(show,2000);
//鼠标经过停止播放，离开继续播放
    $(".branding-inner").bind("mouseover",function() {
        clearInterval(slide);
    })
    $(".branding-inner").bind("mouseout",function() {
        slide = setInterval(show,2000);
    })
//鼠标点击哪项即显示哪项，点击当前项不变
    nav.click(function(){
        clearInterval(slide);
        var j = $(this).index();
        if(i == j) {
            return false;
        }
        else if(i != j ) {
            i = j - 1;
            show();
        }
    })
})

