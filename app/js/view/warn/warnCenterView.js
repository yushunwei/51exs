define(['common/commonView'], function () {
    //注册对比事件
    var listModel = "",
        emailModel,
        listEmail;
    Handlebars.registerHelper("isCheck", function (v1, v2, options) {
        if(v1=="" || typeof v1=="undefined"){
           return '';
        }
        if(v1){
            return 'checked';
        }
        return '';
    });

        function _renderList(data,i){
            if(data.length == 0 || data.data.recordTotal == 0){
                $(".full-view-table table").addClass("hidden").find("tbody tr").remove();
                $(".full-view-table .table-pagination").addClass("hidden");
                $(".full-view-table .index-none").removeClass("hidden");
                $(".conditions-box .operation a").addClass("disabled");
                return;
            }else{
                $(".conditions-box .operation a").removeClass("disabled");
                $(".full-view-table table").removeClass("hidden");
                $(".full-view-table .table-pagination").removeClass("hidden");
                $(".full-view-table .index-none").addClass("hidden");
            }
            listModel = listModel ? listModel : $("#listScript").html();
            var myTemplate = Handlebars.compile(listModel);
            var html = myTemplate(data.data);
            $('tbody.list-yq').html(html);
        }

    function _renderAddEmail(d){
        emailModel = emailModel ? emailModel : $(".add-email").find("#addemailScript").html();
        var myTemplate = Handlebars.compile(emailModel);
        var html = myTemplate(d);
        $(".add-email .add-email-ul").html(html);
    }
    function _renderEmailController(d){
        emailModel = emailModel ? emailModel : $("#modal-email-add").find("#modalemailadd").html();
        var myTemplate = Handlebars.compile(emailModel);
        var html = myTemplate(d.data);
        $("#modal-email-add .add-email-ul").html(html);
    }

    function _renderEmailList(data){
        for(var i = 0;i < data.data.length; i++) {
            listEmail = listEmail ? listEmail : $("#emailListScript").html();
            var myTemplate = Handlebars.compile(listEmail);
            var html = myTemplate(data.data[i]);
            $('.warning-setting-main').find(".panel").eq(i).removeClass("hidden").html(html);
        }
    }
    return {
        renderList :_renderList,
        renderAddEmail:_renderAddEmail,
        renderEmailList :_renderEmailList,
        renderEmailController:_renderEmailController
    }
});
