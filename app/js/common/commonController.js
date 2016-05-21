define(["../tool/ajaxTool"], function (ajax) {
    function _init(){
        //设置头部信息
        $("div.header .header-user").length !=0 && setHeader();

        //设置预警信息图表是否显示
        $("div.header .header-notice span.cy-badge").length !=0 && setWarn();
        //设置checkbox
        setCheckbox();
    }
    function setWarn(){
        var param = {
            "success": function (d) {
                d.status ==200 && $("div.header .header-notice span.cy-badge").removeClass("hidden");
            }
        }
        ajax.load("warnNum",param);
    }
    function setHeader(){
        var param = {
            "success":function(d){
                $("div.header .header-user").find('span').html( d.data.mobile)
            }
        };
        ajax.load("user",param);
    }
    function setCheckbox(){
        var checkbox,span;
        $(document).on("change",".cy-checkbox",function(){
            checkbox  = $(this).find("input[type=checkbox]");
            span = $(this).find("span");
            if(checkbox.length==0) return false;
            if(span.hasClass("checked")){
                span.removeClass("checked");
            }else{
                span.addClass("checked")
            }
        })
    }
    return {
        init:_init

    }
});
