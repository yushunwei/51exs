define(["tool/Utils"], function (utils) {
    //所有ajax队列
    var ajaxMap = [];
    var linkUrl = 'api/home.json';
    //默认ajax参数
    var _param = {
        "data": {},
        "url": linkUrl,
        "dataType": "json"
    };
    //默认的成功后的回调
    var defaultSuccessFn = function (data, controller) {
        if (data.status == "100" && data.subStatus == "50001") {
            //清除所有ajax请求
            $.each(ajaxMap, function (i, v) {
               v.abort();
            });
            alert("登录超时，请重新登录");
            window.location.href = "/login.html";
            return false
        }
        return true;
    };
    //默认的失败后的回调
    var defaultErrorFn = function () {

    };
    //设置 请求地址，添加token
    function setUrl(name, param) {
        linkUrl = HX_Ajax_Path[name] || "";
        var token = utils.getToken();
        var _query = "?token=" + token;
        if (param.query) {
            for (var i in param.query) {
                _query += ("&" + i + "=" + param.query[i]);
            }
        }
        _param.url = linkUrl + _query;
    }

    function _load(obj, param, target) {
        var name = typeof obj == "string" ? obj : obj.name;
        setUrl(name, param);
        if (typeof param != "object") return;
        var ajaxparam = $.extend({}, _param, param);
        ajaxparam.success = function (d) {
            utils.removeLoading(target);
            var result = defaultSuccessFn(d);
            (result && $.isFunction(param.success)) && param.success(d);
        };
        ajaxparam.error = function (d) {
            utils.removeLoading(target);
            defaultErrorFn(d);
            $.isFunction(param.error) && param.error(d);
        };
        //增加loading效果
        utils.addLoading(target);
        var quene = $.ajax(ajaxparam);
        ajaxMap.push(quene);
    }

    return {
        load: _load
    };
});
