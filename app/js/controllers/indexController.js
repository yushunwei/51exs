define(["tool/ajaxTool", "view/indexView", "view/homeChartView"], function (ajax, view, cv) {
    var indexUserPlans;

    function init(page) {
        indexUserPlans = {showCount: 0};
        //用户方案
        getuserplanlist();
    }

    //用户方案
    function getuserplanlist() {
        var param = {
            "success": function (data) {
                if (data.data.length == 0) {
                    //用户方案为空，则直接跳转index_none页面
                    $(".page").hide();
                    $(".showNoList").removeClass("hidden");
                    // showIndexNone();
                } else {
                    indexUserPlans.userPlans = data.data;
                    //进入渲染页面
                    view.renderUserplanlist(data);
                    //加载全部舆情方案
                    loadnewYQFA();
                }
            }
        };
        ajax.load("userplanlist", param);
    }

    //加载全部舆情方案
    function loadnewYQFA() {
        var param = {
            "success": function (data) {
                //删除loading
                $(".plan:first").removeClass("modelLoding").find(".noDataBox").remove();
                $(".plan:first").children(".hidden").removeClass("hidden");
                if (data.status !=200) {
                    typeof layer !="undefined" && layer.alert(data.msg);
                    return;
                }
                if (data.data.objects.length == 0) {
                    $(".page .content").hide();
                    $(".showNoData").removeClass("hidden");
                    var planID = indexUserPlans.userPlans[0].id;
                    $(".showNoData a").attr("href", "pages/monitor/full_view.html?id=" + planID + "&" + "turnTab=2");
                    return;
                }
                //渲染全部舆情方案列表项
                view.renderYqfa(data.data);
                //右侧图表 渲染
                cv.chartInit();
                //绑定标签事件，切换时加载相应数据
                bindYqFAEvent();
                //加载其他方案舆情
                initFirst3NewPlan(0);
                //显示底部loadding效果
                $(".bottomLoading").removeClass("hidden");

            },
            "error": function () {
                $("#chartPie").html(HX_config.errorHtml);
                $("#chartLine").html(HX_config.errorHtml);
                $(".list1box1").html(HX_config.errorHtml);
            }
        };
        //增加loading
        $(".plan:first").append("<div class='noDataBox' height='100%'><img src='img/loading_48.gif' /></div>");
        ajax.load("home_yqfa", param);
    }

    //绑定全部舆情方案 标签切换，发送请求
    function bindYqFAEvent() {
        $(".plan").eq(0).on('click', ".list-tabs a", function () {
            var type = $(this).parent().data("type") || ' ';
            var tabID = $(this).attr("href");
            var tabindex = $(this).parent().index();
            var param = {
                "success": function (data) {
                    if(data.data.length==0){
                        $(tabID).find(".plan-main-list ul").html(HX_config.noDataHtml);
                        return;
                    }
                    view.renderYqfa(data.data, tabID,tabindex);
                },
                error:function(){
                    $(tabID).find(".plan-main-list ul").html(HX_config.errorHtml);
                },
                //url 参数 类似 data
                "query": {
                    "sentiment": type
                }
            };
            $(tabID).find(".plan-main-list ul").html("<div class='noDataBox' style='height:60px'><img src='img/loading_32.gif' /></div>");
            ajax.load("home_yqfa", param);
        });
        $(".main").on("click","span.turnPageJcfa",function(){
            var planId = $(this).parents(".plan").attr("planId");
            var obj = {
                planId : planId?planId:"",
                sentiment:$(this).data("sentiment"),
                timeRanges:7
            };
            window.open('pages/monitor/monitorinfolist.html?'+ $.param(obj));
        })
    }

    //加载其他方案舆情
    function initFirst3NewPlan(i) {
        // 方案个数达到上线或者达到3个终止递归
        if (i === indexUserPlans.userPlans.length || indexUserPlans.showCount === 3) {
            $(".bottomLoading").addClass("hidden");

            return;
        }
        //获取对应的 Plan数据
        var userPlan = indexUserPlans.userPlans[i];
        var param = {
            "data": {
                planId: userPlan.id
            },
            "success": function (data) {
                if (data.data.recordTotal > 0) {
                    //拼接数据，使用handlebar 渲染
                    var newData = {"list": data.data, "title": userPlan.title, "id": userPlan.id};
                    //渲染对应列表
                    view.renderList(newData, indexUserPlans.showCount);
                    //渲染对应图表
                    cv.chartInit(userPlan.id, "chartBar" + (indexUserPlans.showCount + 1));
                    //下一个舆情方案
                    indexUserPlans.showCount++;
                    //对应的舆情状态设置为显示
                    $(".plan").eq(indexUserPlans.showCount).removeClass("hidden").attr("planId",userPlan.id);
                    //绑定对应的舆情事件，标签切换发送请求
                    bindListEvent(indexUserPlans.showCount);
                }
                //加载下一个新的舆情
                initFirst3NewPlan(i + 1);
            }
        };
        ajax.load("home_list", param);
    }

//绑定对应的舆情事件，标签切换发送请求
    function bindListEvent(index) {
        $(".plan").eq(index).on('click', ".list-tabs a", function () {
            var type = $(this).parent().data("type") || ' ';
            var tabID = $(this).attr("href");
            var id = $(this).parent().parent().attr("planid");
            var tabindex = $(this).parent().index();
            var param = {
                "success": function (data) {
                    if (data.data.recordTotal != 0) {
                        view.renderTabList(data.data, tabID,tabindex);
                    } else {
                        $(tabID).find(".plan-main-list").html(HX_config.noDataHtml);
                    }
                },
                error:function(){
                    $(tabID).find(".plan-main-list").html(HX_config.errorHtml);
                },
                //get 请求参数，类似data
                "query": {
                    "planId": id,
                    "sentiment": type
                }
            };
            $(tabID).find(".plan-main-list").html("<div class='noDataBox' style='height:60px'><img src='img/loading_32.gif' /></div>");
            ajax.load("home_list", param);
        })
    }

    return {
        init: init
    }
});
