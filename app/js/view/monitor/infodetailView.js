define([], function () {

    /**
     * 获取情感属性值
     */
    Handlebars.registerHelper("sentimentType", function (type) {
        var sentiments = {
            positive:"正面",
            negative:"负面"
        };

        var result = sentiments[type];
        return result?result:"中性";
    });

    /**
     * 注册对比helper
     */
    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
        switch (operator) {
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
                break;
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
                break;
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
                break;
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
                break;
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                break;
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
                break;
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                break;
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
                break;
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
                break;
            default:
                return options.inverse(this);
                break;
        }
    });

    var dom = $(".page-infodetail");

    /**
     * 渲染相关舆情
     *
     * @param data
     * @private
     */
    function _renderList(data) {
        var myTemplate = Handlebars.compile($("#detailList").html());
        dom.find(".detail-right .related .related-main").html(myTemplate(data));
    }

    /**
     * 渲染详情信息
     * @param data
     * @private
     */
    function _renderdetail(data) {
        var myTemplate = Handlebars.compile($("#detail").html());
        dom.find(".detail-left").html(myTemplate(data.data));
    }

    /**
     * 渲染右部统计信息
     * @param data
     * @private
     */
    function _renderRight(data) {
        var myTemplate = Handlebars.compile($("#detailright").html());
        dom.find(".detail-right .detail-data").html(myTemplate(data.data));
    }

    // 返回
    return {
        renderList: _renderList,
        renderdetail: _renderdetail,
        renderRight: _renderRight
    }
});
