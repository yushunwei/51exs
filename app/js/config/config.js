//鍏ㄥ眬閰嶇疆鍙傛暟
var HX_config = {
    //鐧诲綍骞荤伅鐗囪矾寰�
    "ADIMG": [
        "img/banner_01.jpg",
        "img/banner_02.jpg",
        "img/banner_03.jpg"
    ],
    //ajax
    "registerURL": "http://uuser.idinfo.cn/jsp/client/uuuser/uuuserRegistStep.jsp?redirectUrl=http://www.51exs.com/login",
    "loginURL": "https://oauth.idinfo.cn/login.jsp",
    "consult": "https://www.baidu.com",
    //鍒囨崲椤甸潰key鍊�
    "nextPageKEY": "n",
    "ivcode": "",
    //鏈嶅姟鍣ㄥ湴鍧�
    "serv_path": "http://115.238.48.66:1158",
    "noDataHtml" : "<div class='noDataBox'><div class='noDataShow'></div></div>",
    "errorHtml" : "<div class='noDataBox'><div class='errorShow '></div></div>"
};
//ajax path
var HX_Ajax_Path = (function () {

    return {
        //更新预警关注记录
        "addwarnfocusrecord": HX_config.serv_path + '/warn/warncenter/addwarnfocusrecord/v=1.0.0',
        //娉ㄥ唽url
        "register": HX_config.serv_path + '/system/register/getregisterurl/v=1.0.0',
        //寮�閫氳涓�
        "openHY": HX_config.serv_path + '/system/baseinfo/getindustrys/v=1.0.0',
        //寮�閫氫紒涓�
        "openQY": HX_config.serv_path + '/system/baseinfo/getareas/v=1.0.0',
        //寮�閫氱敵璇�
        "openapplication": HX_config.serv_path + '/system/user/openapplication/v=1.0.0',
        //user information
        "user": HX_config.serv_path + '/system/user/getuserinfo/v=1.0.0',
        //棰勮鏁伴噺
        "warnNum": HX_config.serv_path + '/warn/warncenter/getlatestuserwarncount/v=1.0.0',
        //home椤甸潰鎰熸儏chart鏁版嵁
        "home_pie": HX_config.serv_path + '/monitor/statmonitor/getallnewsentimentdislist/v=1.0.0',
        //home椤甸潰璧板娍鍥炬暟鎹�
        "home_line": HX_config.serv_path + '/monitor/statmonitor/getallnewsourceperformlist/v=1.0.0',
        //home椤甸潰鏌辩姸鍥炬暟鎹�
        'home_bar': HX_config.serv_path + '/monitor/statmonitor/getkeymediasentimentlist/v=1.0.0',
        //鍏ㄩ儴鑸嗘儏鏂规
        "userplanlist": HX_config.serv_path + '/plan/userplan/getuserplanlist/v=1.0.0',
        //鏈�鏂拌垎鎯呮柟妗�
        "home_yqfa": HX_config.serv_path + '/monitor/contentmonitor/getallnewmonitorinfolist/v=1.0.0',
        //鍏ㄩ儴鏂规
        "home_list": HX_config.serv_path + '/monitor/contentmonitor/getnewmonitorinfolist/v=1.0.0',
        //鐩镐技鏂囩珷
        "getlikeList": HX_config.serv_path + '/monitor/contentmonitor/getrelatedmonitorinfolist/v=1.0.0',
        //鍏ㄩ儴鑸嗘儏鏂规鏂规
        "getMonitorInfoList": HX_config.serv_path + '/monitor/contentmonitor/getmonitorinfolist/v=1.0.0',
        //鍏ㄩ儴鑸嗘儏鏂规鏂规
        "addEmail": HX_config.serv_path + '/warn/warnemail/getwarnemaillist/v=1.0.0',
        //鍒涘缓鏂拌垎鎯呰姹�
        "newYq": HX_config.serv_path + '/plan/userplan/adduserplan/v=1.0.0',
        //鏂囩珷鍒楄〃
        "detailList": HX_config.serv_path + '/monitor/contentmonitor/getrelatedmonitorinfolist/v=1.0.0',
        //鏂囩珷璇︽儏
        "detail": HX_config.serv_path + '/monitor/contentmonitor/getmonitorinfodetails/v=1.0.0',
        //鏂囩珷璇︽儏
        "delYJ": HX_config.serv_path + '/warn/warncenter/cancelsimilarwarn/v=1.0.0',
        //all search
        "getAllInfoList": HX_config.serv_path + '/monitor/contentmonitor/fullwebsearch/v=1.0.0',
        //fullView 鑸嗘儏璧板娍鍥�
        "fullView_DataTrend": HX_config.serv_path + '/monitor/statmonitor/getsourceperformlist/v=1.0.0',
        //fullView 鎯呮劅璧板娍鍥�
        "fullView_FeelTrend": HX_config.serv_path + '/monitor/statmonitor/getdailysentimentperformlist/v=1.0.0',
        //fullView 濯掍綋鎯呮劅
        "fullView_MediaFeel": HX_config.serv_path + '/monitor/statmonitor/getkeymediasentimentlist/v=1.0.0',
        //fullView 濯掍綋鍏虫敞搴�
        "fullView_MediaDeg": HX_config.serv_path + '/monitor/statmonitor/getmediaattentionlist/v=1.0.0',
        //鍦板煙鍒嗗竷bar
        "fullView_Area": HX_config.serv_path + '/monitor/statmonitor/getregiondistributelist/v=1.0.0',
        //地域分布Map
        "fullView_AreaMap": HX_config.serv_path + '/monitor/statmonitor/getregiondistributelist/v=1.0.0',
        //修改舆情初始化数据
        "xgYQ":HX_config.serv_path+'/plan/userplan/getuserplan/v=1.0.0',
        //HX_config.serv_path+'/monitor/report/getweeklyreportlist/v=1.0.0'
        //获取舆情方案周列表
        "weeklyReportList":'../../api/weeklyReportList.json',
        //下载周报
        "downloadweeklyreport":HX_config.serv_path+'/monitor/report/downloadweeklyreport/v=1.0.0',
        //获取舆情导读列表信息
        "weeklyReadGuidList":HX_config.serv_path+'/monitor/report/getweeklyreadguidelist/v=1.0.0',
        //渲染载体分布统计
        "weeklyCarrierdisList":HX_config.serv_path+'/monitor/report/getweeklycarrierdislist/v=1.0.0',
        //获取top10情感信息媒体分布列表信息
        "weeklyTop10SentmediadisList":HX_config.serv_path+'/monitor/report/getweeklytop10sentmediadislist/v=1.0.0'
    }
})()

//
//char楗煎浘棰滆壊
var pieColor = {
    "positiveColor": ['#3693B3', '#309BBF', '#29A3CC', '#21ABD9', '#17B2E6', '#0CB9F2', '#05C1FF'],
    "neutralColor": ['#737980', '#7E858C', '#8A9199', '#959DA6', '#A1AAB2', '#ACB6BF', '#B8C2CC'],
    "negativeColor": ['#B24747', '#BF4C4C', '#CC5252', '#D95757', '#E55C5C', '#E56767', '#FF7F7F']
};