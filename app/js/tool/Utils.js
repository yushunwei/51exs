require.config({
    paths: {
        "jquery.cookie": ["../js/lib/cookie/jquery.cookie"]
    },
    skim: {
        "jquery.cookie": {
            "exports": "_"
        }
    }
});
define(["jquery.cookie"], function () {
    function _renderDom(a, b) {
        var $dom = $$(arguments[0]);
        var result;
        var nodatahtml = $dom.length > 0 ? $dom[0].outerHTML : "";
        // nodata.remove();
        var renderhtml = $dom.html();
        var arr = nodatahtml.match(/{{[a-zA-Z0-9\.\-\+]*}}/g);
        var attr;
        var value;
        var newHtml;
        if (arguments[1].length == 0) {
            $dom.html(nodatahtml);
            return;
        }
        var data = b;
        $$.each(arguments[1], function (index, v) {
            result = v;
            newHtml = nodatahtml;
            for (var i = 0; i < arr.length; i++) {
                attr = arr[i].replace('{{', '').replace('}}', '').replace(new RegExp(/^this/, "g"), 'data');
                value = eval(attr);
                newHtml = newHtml.replace(arr[i], value);
            }
            $dom.append(newHtml);
        })
    }

    function bindEvents(bindings) {
        if ($$.isArray(bindings) && bindings.length > 0) {
            for (var i in bindings) {
                $$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
            }
        }
    }

    function _isEmptyJson() {
        var json = arguments[0];
        var i = 0;
        for (var pop in json) {
            i++;
            break;
        }
        return i == 0;
    }

    function _rernderPage(name, result) {
        var $box = $$("." + name);
        var traBox = $box.find("[crh-data]");
        _renderDom(traBox, result);
    }

    /***
     * 检查正则类型
     * param
     * @type  "phone" or  "email" or""
     * @checkSource  "13456788888"
     * **/
    function _checkRagular(type, data) {
        var rgx, ragular;
        switch (type) {
            //新用户注册 发送 手机号
            case 'phone' :
                rgx = '^[1][358][0-9]{9}$';
                break;
            default :
                rgx = "";
                break;
        }
        ragular = new RegExp(rgx);
        return ragular.test(rgx);
    }

    function _showTips() {
        if ($(".tips-model").length == 0) {
            var tips = "<div class='tips-model'>" +
                "<img src='img/set_ok.png'/>" +
                "<p>设置成功</p>" +
                "</div>";
            $$("body").append(tips);
            $$("body").find(".tips-model").hide();
        }
        $$("body").find(".tips-model").show();

        setTimeout(function () {
            $$("body").find(".tips-model").hide();
        }, 1000)
    }

    /***
     * 获取url参数
     * param url
     * @type  "xxxx.html?token=1223&id=3"
     * @return  json
     * **/
    function _getQuery() {
        var url = arguments[0];
        var index = url.indexOf("?"); //获取url中"?"符后的字串
        var theRequest = {};
        if (index != -1) {
            var str = url.substr(index + 1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

    //设置token
    function _setToken() {
        var token = arguments[0];
        if (token == "")
            return;
        $.cookie("token", token, {
            path: "/", expiress: 7
        })
    }

    // return token
    function _getToken() {
        return $.cookie("token") || '3b679f7cf55011e5bb6600188b839ae8';
    }

    function _addLoading() {
        if ($(arguments[0]).length == 0)
            return;
        $.each($(arguments[0]),function(){
            !$(this).hasClass("loadBox") && $(this).addClass("loadBox")
                                             .append("<div class='loading'><img src='/img/loading_48.gif' /></div>");
            $(this).find("div.loading").width($(this).width());
            $(this).find("div.loading").height($(this).height());
        })
    }
    function _removeLoading(){
        if ($(arguments[0]).length == 0)
            return;
        $(arguments[0]).find("div.loading").remove();
    }

    return {
        //判断是否空的json
        isEmptyJson: _isEmptyJson,
        //绑定事件
        bindEvents: bindEvents,
        //渲染页面
        rernderPage: _rernderPage,
        // 检查正则类型
        checkRagular: _checkRagular,
        //提示框
        showTips: _showTips,
        //获取url参数
        getQuery: _getQuery,
        //获取token
        getToken: _getToken,
        //设置token
        setToken: _setToken,
        //add loading
        addLoading: _addLoading,
        removeLoading: _removeLoading
    };
});
