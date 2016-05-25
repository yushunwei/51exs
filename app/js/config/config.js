// 配置文件
var HX_config = {
    //登录页面轮播图片
    "ADIMG": [
        "img/banner_01.jpg",
        "img/banner_02.jpg",
        "img/banner_03.jpg"
    ],
    //服务器地址
    "serv_path": "http://115.238.48.66:1158",
    "noDataHtml": "<div class='noDataBox'><div class='noDataShow'></div></div>",
    "errorHtml": "<div class='noDataBox'><div class='errorShow '></div></div>"
};

// 接口地址
var HX_Ajax_Path = (function () {
    return {
        //更新预警关注记录
        "addwarnfocusrecord": HX_config.serv_path + '/warn/warncenter/addwarnfocusrecord/v=1.0.0',
        //获取用户注册地址
        "register": HX_config.serv_path + '/system/register/getregisterurl/v=1.0.0',
        //获取行业信息
        "openHY": HX_config.serv_path + '/system/baseinfo/getindustrys/v=1.0.0',
        //获取地域信息
        "openQY": HX_config.serv_path + '/system/baseinfo/getareas/v=1.0.0',
        //开通服务
        "openapplication": HX_config.serv_path + '/system/user/openapplication/v=1.0.0',
        //获取用户信息
        "user": HX_config.serv_path + '/system/user/getuserinfo/v=1.0.0',
        //删除方案
        "deleteuserplan": HX_config.serv_path + '/plan/userplan/deleteuserplan/v=1.0.0',
        //获取最新预警数量
        "warnNum": HX_config.serv_path + '/warn/warncenter/getlatestuserwarncount/v=1.0.0',
        //全部舆情方案-情感分布
        "home_pie": HX_config.serv_path + '/monitor/statmonitor/getallnewsentimentdislist/v=1.0.0',
        //全部舆情方案-数据源舆情走势
        "home_line": HX_config.serv_path + '/monitor/statmonitor/getallnewsourceperformlist/v=1.0.0',
        //重点媒体情感偏向
        'home_bar': HX_config.serv_path + '/monitor/statmonitor/getkeymediasentimentlist/v=1.0.0',
        //加载用户方案菜单
        "userplanlist": HX_config.serv_path + '/plan/userplan/getuserplanlist/v=1.0.0',
        //全部舆情方案-最新舆情
        "home_yqfa": HX_config.serv_path + '/monitor/contentmonitor/getallnewmonitorinfolist/v=1.0.0',
        //单舆情方案-最新舆情
        "home_list": HX_config.serv_path + '/monitor/contentmonitor/getnewmonitorinfolist/v=1.0.0',
        //文章页-相关舆情
        "getlikeList": HX_config.serv_path + '/monitor/contentmonitor/getrelatedmonitorinfolist/v=1.0.0',
        //全景-舆情信息列表
        "getMonitorInfoList": HX_config.serv_path + '/monitor/contentmonitor/getmonitorinfolist/v=1.0.0',
        //获取预警邮箱
        "addEmail": HX_config.serv_path + '/warn/warnemail/getwarnemaillist/v=1.0.0',
        //新建舆情方案
        "newYq": HX_config.serv_path + '/plan/userplan/adduserplan/v=1.0.0',
        //文章页-相关舆情
        "detailList": HX_config.serv_path + '/monitor/contentmonitor/getrelatedmonitorinfolist/v=1.0.0',
        //文章页-舆情详情
        "detail": HX_config.serv_path + '/monitor/contentmonitor/getmonitorinfodetails/v=1.0.0',
        //取消相似预警
        "delYJ": HX_config.serv_path + '/warn/warncenter/cancelsimilarwarn/v=1.0.0',
        //全网搜索
        "fullwebsearch": HX_config.serv_path + '/monitor/contentmonitor/fullwebsearch/v=1.0.0',
        //单舆情方案-数据源舆情走势
        "fullView_DataTrend": HX_config.serv_path + '/monitor/statmonitor/getsourceperformlist/v=1.0.0',
        //每日情感走势
        "fullView_FeelTrend": HX_config.serv_path + '/monitor/statmonitor/getdailysentimentperformlist/v=1.0.0',
        //重点媒体情感偏向
        "fullView_MediaFeel": HX_config.serv_path + '/monitor/statmonitor/getkeymediasentimentlist/v=1.0.0',
        //获取媒体关注度信息
        "fullView_MediaDeg": HX_config.serv_path + '/monitor/statmonitor/getmediaattentionlist/v=1.0.0',
        //地域分布
        "fullView_Area": HX_config.serv_path + '/monitor/statmonitor/getregiondistributelist/v=1.0.0',
        //地域分布Map
        "fullView_AreaMap": HX_config.serv_path + '/monitor/statmonitor/getregiondistributelist/v=1.0.0',
        //获取舆情方案
        "xgYQ": HX_config.serv_path + '/plan/userplan/getuserplan/v=1.0.0',
        //修改舆情方案
        "modifyuserplan": HX_config.serv_path + '/plan/userplan/modifyuserplan/v=1.0.0',
        //获取方案舆情周报列表
        //"getweeklyreportlist":HX_config.serv_path+'/monitor/report/getweeklyreportlist/v=1.0.0'
        //获取方案舆情周报列表
        "weeklyReportList": '../../api/weeklyReportList.json',
        //舆情周报下载
        "downloadweeklyreport": HX_config.serv_path + '/monitor/report/downloadweeklyreport/v=1.0.0',
        //获取舆情导读列表
        "weeklyReadGuidList": HX_config.serv_path + '/monitor/report/getweeklyreadguidelist/v=1.0.0',
        //获取载体分布统计
        "weeklyCarrierdisList": HX_config.serv_path + '/monitor/report/getweeklycarrierdislist/v=1.0.0',
        //获取top10情感信息媒体分布列表
        "weeklyTop10SentmediadisList": HX_config.serv_path + '/monitor/report/getweeklytop10sentmediadislist/v=1.0.0',
        //舆情周报下载
        "weeklyReportDown": HX_config.serv_path + '/monitor/report/downloadweeklyreport/v=1.0.0',
        //获取预警信息列表
        "warnInfo": HX_config.serv_path + "/warn/warncenter/getwarninfolist/v=1.0.0",
        //获取方案预警邮箱列表
        "planwarnemail": HX_config.serv_path + "/warn/planwarnemail/getplanwarnemaillist/v=1.0.0",
        //获取方案预警邮箱可选项
        "warnmail": HX_config.serv_path + "/warn/planwarnemail/getplanwarnemailoptions/v=1.0.0",
        //取消相似预警
        "cancelsimilarwarn": HX_config.serv_path + "/warn/warncenter/cancelsimilarwarn/v=1.0.0",
        //更新方案预警邮箱
        "modifyplanwarnemail": HX_config.serv_path + "/warn/planwarnemail/modifyplanwarnemail/v=1.0.0",
        //删除方案预警邮箱
        "deleteplanwarnemail": HX_config.serv_path + "/warn/planwarnemail/deleteplanwarnemail/v=1.0.0",
        //更新预警邮箱
        "modifywarnemail": HX_config.serv_path + "/warn/warnemail/modifywarnemail/v=1.0.0",
        //获取单个方案的正负面数据
        "getSentimentDistribute":HX_config.serv_path + "/monitor/statmonitor/getsentimentdistribute/v=1.0.0",
        "emailShare" : HX_config.serv_path + "/monitor/contentmonitor/monitorinfoemailshare/v=1.0.0",
        "canaddnewuserplan" : HX_config.serv_path + "/plan/userplan/canaddnewuserplan/v=1.0.0"
    }
})();

//char楗煎浘棰滆壊
var pieColor = {
    "positiveColor": ['#3693B3', '#309BBF', '#29A3CC', '#21ABD9', '#17B2E6', '#0CB9F2', '#05C1FF'],
    "neutralColor": ['#737980', '#7E858C', '#8A9199', '#959DA6', '#A1AAB2', '#ACB6BF', '#B8C2CC'],
    "negativeColor": ['#B24747', '#BF4C4C', '#CC5252', '#D95757', '#E55C5C', '#E56767', '#FF7F7F']
};