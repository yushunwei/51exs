//全局配置参数
var HX_config = {
    //登录幻灯片路径
    "ADIMG": [
        "img/banner_01.jpg",
        "img/banner_02.jpg",
        "img/banner_03.jpg"
    ],
    //ajax
    "registerURL": "http://uuser.idinfo.cn/jsp/client/uuuser/uuuserRegistStep.jsp?redirectUrl=http://www.51exs.com/login",
    "loginURL": "https://oauth.idinfo.cn/login.jsp",
    "consult": "https://www.baidu.com",
    //切换页面key值
    "nextPageKEY": "n",
    "ivcode": "",
    //服务器地址
    "serv_path": "http://115.238.48.66:1158",
    "noDataHtml" : "<div class='noDataBox'><div class='noDataShow'></div></div>",
    "errorHtml" : "<div class='noDataBox'><div class='errorShow '></div></div>"
};
//ajax path
var HX_Ajax_Path = (function () {

    return {
        //注册url
        "register": HX_config.serv_path + '/system/register/getregisterurl/v=1.0.0',
        //开通行业
        "openHY": HX_config.serv_path + '/system/baseinfo/getindustrys/v=1.0.0',
        //开通企业
        "openQY": HX_config.serv_path + '/system/baseinfo/getareas/v=1.0.0',
        //开通申请
        "openapplication": HX_config.serv_path + '/system/user/openapplication/v=1.0.0',
        //user information
        "user": HX_config.serv_path + '/system/user/getuserinfo/v=1.0.0',
        //预警数量
        "warnNum": HX_config.serv_path + '/warn/warncenter/getlatestuserwarncount/v=1.0.0',
        //home页面感情chart数据
        "home_pie": HX_config.serv_path + '/monitor/statmonitor/getallnewsentimentdislist/v=1.0.0',
        //home页面走势图数据
        "home_line": HX_config.serv_path + '/monitor/statmonitor/getallnewsourceperformlist/v=1.0.0',
        //home页面柱状图数据
        'home_bar': HX_config.serv_path + '/monitor/statmonitor/getkeymediasentimentlist/v=1.0.0',
        //全部舆情方案
        "userplanlist": HX_config.serv_path + '/plan/userplan/getuserplanlist/v=1.0.0',
        //最新舆情方案
        "home_yqfa": HX_config.serv_path + '/monitor/contentmonitor/getallnewmonitorinfolist/v=1.0.0',
        //全部方案
        "home_list": HX_config.serv_path + '/monitor/contentmonitor/getnewmonitorinfolist/v=1.0.0',
        //相似文章
        "getlikeList": HX_config.serv_path + '/monitor/contentmonitor/getrelatedmonitorinfolist/v=1.0.0',
        //全部舆情方案方案
        "getMonitorInfoList": HX_config.serv_path + '/monitor/contentmonitor/getmonitorinfolist/v=1.0.0',
        //全部舆情方案方案
        "addEmail": HX_config.serv_path + '/warn/warnemail/getwarnemaillist/v=1.0.0',
        //创建新舆情请求
        "newYq": HX_config.serv_path + '/plan/userplan/adduserplan/v=1.0.0',
        //文章列表
        "detailList": HX_config.serv_path + '/monitor/contentmonitor/getrelatedmonitorinfolist/v=1.0.0',
        //文章详情
        "detail": HX_config.serv_path + '/monitor/contentmonitor/getmonitorinfodetails/v=1.0.0',
        //文章详情
        "delYJ": HX_config.serv_path + '/warn/warncenter/cancelsimilarwarn/v=1.0.0',
        //all search
        "getAllInfoList": HX_config.serv_path + '/monitor/contentmonitor/fullwebsearch/v=1.0.0',
        //fullView 舆情走势图
        "fullView_DataTrend": HX_config.serv_path + '/monitor/statmonitor/getsourceperformlist/v=1.0.0',
        //fullView 情感走势图
        "fullView_FeelTrend": HX_config.serv_path + '/monitor/statmonitor/getdailysentimentperformlist/v=1.0.0',
        //fullView 媒体情感
        "fullView_MediaFeel": HX_config.serv_path + '/monitor/statmonitor/getkeymediasentimentlist/v=1.0.0',
        //fullView 媒体关注度
        "fullView_MediaDeg": HX_config.serv_path + '/monitor/statmonitor/getmediaattentionlist/v=1.0.0',
        //地域分布bar
        "fullView_Area": HX_config.serv_path + '/monitor/statmonitor/getregiondistributelist/v=1.0.0',
        //地域分布Map
        "fullView_AreaMap": HX_config.serv_path + '/monitor/statmonitor/getregiondistributelist/v=1.0.0'
    }
})()

//char饼图颜色
var pieColor = {
    "positiveColor": ['#3693B3', '#309BBF', '#29A3CC', '#21ABD9', '#17B2E6', '#0CB9F2', '#05C1FF'],
    "neutralColor": ['#737980', '#7E858C', '#8A9199', '#959DA6', '#A1AAB2', '#ACB6BF', '#B8C2CC'],
    "negativeColor": ['#B24747', '#BF4C4C', '#CC5252', '#D95757', '#E55C5C', '#E56767', '#FF7F7F']
};