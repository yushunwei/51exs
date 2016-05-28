
define(["tool/ajaxTool","echarts/echartsmin"], function (ajax,ec) {
  var curPlanId='',curTimeranges = 0,curStartTime="",curEndTime="";
  //选择条件事件
  function events(id){
//在时间段选择上绑定图表刷新事件
    $("#profile").find('.tab-timeranges').click(function(){
      curTimeranges = $(this).data('timeranges');
      curEndTime = "";
      endTime = "";
      var query = {
        timeRanges:$(this).data('timeranges'),
        startTime:'',
        endTime:'',
        planId:id
      };
      chartSender(query);
      $('#start1,#end1').val('');
      $('#profile').find('.active').removeClass('active');
      $(this).addClass('active');
    });
    //在自定义时间上绑定选中
    $("#customdays1").click(function(){
      $('#profile').find('.active').removeClass('active');
      $(this).addClass('active');
    });

    $("#btnFind1").click(function(){
      var startTime = $('#start1').val();
      var endTime = $('#end1').val();
      curStartTime = startTime;
      curEndTime = endTime
      curTimeranges = 0;
      var query = {
        timeRanges:0,
        startTime:startTime,
        endTime:endTime,
        planId:id
      };
      chartSender(query);
    });
  }
  //chart渲染
  function chartSender(query){
    getDataTrendChart(query);
    getFeelTrendChart(query);
    getMediaFeelChart(query);
    getMediaDegChart(query);
    getAreaChart(query);
    getAreaMapChart(query);
    getSentimentDistribute(query);
  }
  //数据源舆情走势图
  function getDataTrendChart(query){
    var param = {
      query:query,
      success:function(data){
        senderDataTrendChart(data);
      },
      error:function(){
        $("#fullChartLine1").html(HX_config.errorHtml);
      }
    };
    ajax.load('fullView_DataTrend',param);
  }
  function senderDataTrendChart(data){
    var optionLine1 = {
      tooltip : {
      },
      legend: {
        x : 'left',
        y : 'top',
        data:['新闻','论坛','微博','电子报','贴吧','博客','微信']
      },
      toolbox: {
        show : true,
        showTitle: false,
        orient : 'vertical',
        x : 'right',
        y : 'center',
        feature : {
          mark : {show: false},
          dataView : {show: false},
          magicType : {show: false},
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      calculable : true,
      grid:{
        x: 50
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : [
            //js填充
          ]
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      color: ['#F9543F','#FE8D94','#F3C17F','#FE8E5C','#9BABDA','#2FC5EB','#55C59E'],
      series : [
        //js填充
      ]
    };
    optionLine1.xAxis[0].data = [];
    var dateArray = [];
    var curDate;
    for(i=0; i<data.data.news.length; i++){
      if(curDate !=data.data.news[i].publicTime){
        curDate = data.data.news[i].publicTime;
        dateArray.push(String(curDate));
      }
    }

    optionLine1.xAxis[0].data=dateArray;

    optionLine1.series = [];
    var newsData=[];
    var bbsData=[];
    var weiboData=[];
    var epubData=[];
    var tiebaData=[];
    var blogData=[];
    var wxData=[];
    for(i=0; i<dateArray.length; i++){
      newsData.push(data.data.news[i]==null?0:data.data.news[i].count);
      bbsData.push(data.data.bbs[i]==null?0:data.data.bbs[i].count);
      weiboData.push(data.data.weibo[i]==null?0:data.data.weibo[i].count);
      epubData.push(data.data.epub[i]==null?0:data.data.epub[i].count);
      tiebaData.push(data.data.tieba[i]==null?0:data.data.tieba[i].count);
      blogData.push(data.data.blog[i]==null?0:data.data.blog[i].count);
      wxData.push(data.data.wx_gzh[i]==null?0:data.data.wx_gzh[i].count);
    }
    optionLine1.series=[
      {
        name:'新闻',
        type:'line',
        data:newsData
      },
      {
        name:'论坛',
        type:'line',
        data:bbsData
      },
      {
        name:'微博',
        type:'line',
        data:weiboData
      },
      {
        name:'电子报',
        type:'line',
        data:epubData
      },
      {
        name:'贴吧',
        type:'line',
        data:tiebaData
      },
      {
        name:'博客',
        type:'line',
        data:blogData
      },
      {
        name:'微信',
        type:'line',
        data:wxData
      }
    ];
    var dataLen = 0;
    $.each(optionLine1.series,function(i,n){
      dataLen += n.data.length;
    });
    if(dataLen == 0){
      $("#fullChartLine1").html(HX_config.noDataHtml);
    }else{
      // 为echarts对象加载数据
      $("#fullChartLine1").empty();
      var myChartLine1 = ec.init(document.getElementById('fullChartLine1'));
      myChartLine1.setOption(optionLine1);
    }
  }
  //情感走势图
  function getFeelTrendChart(query){
    var param = {
      query:query,
      success:function(data){
        senderFeelTrendChart(data);
      },
      error:function(){
        $("#fullChartLine2").html(HX_config.errorHtml);
      }
    };
    ajax.load('fullView_FeelTrend',param);
  }
  function senderFeelTrendChart(data){
    var optionLine2 = {
      tooltip : {
      },
      legend: {
        x : 'left',
        y : 'top',
        data:['正面','中性','负面']
      },
      toolbox: {
        show : true,
        showTitle: false,
        orient : 'vertical',
        x : 'right',
        y : 'center',
        feature : {
          mark : {show: false},
          dataView : {show: false},
          magicType : {show: false},
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      calculable : true,
      grid:{
        x: 50
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : [
            //js填充
          ]
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      color: ['#32D0CA','#B2B2B2','#F37D66'],
      series : [
        //js填充
      ]
    };
    optionLine2.xAxis[0].data = [];
    var dateArray = [];
    var curDate;
    for(i=0; i<data.data.negative.length; i++){
      if(curDate!=data.data.negative[i].publicTime){
        curDate = data.data.negative[i].publicTime;
        dateArray.push(String(curDate));
      }
    }


    optionLine2.xAxis[0].data=dateArray;

    optionLine2.series = [];
    var positiveData=[];
    var neutralData=[];
    var negativeData=[];
    for(i=0; i<dateArray.length; i++){
      positiveData.push(data.data.positive[i]==null?0:data.data.positive[i].count);
      neutralData.push(data.data.neutral[i]==null?0:data.data.neutral[i].count);
      negativeData.push(data.data.negative[i]==null?0:data.data.negative[i].count);
    }
    optionLine2.series=[
      {
        name:'正面',
        type:'line',
        data:positiveData
      },
      {
        name:'中性',
        type:'line',
        data:neutralData
      },
      {
        name:'负面',
        type:'line',
        data:negativeData
      }
    ];
    //假如数据为空，显示无数据
    var dataLen = 0;
    $.each(optionLine2.series,function(i,n){
      dataLen += n.data.length;
    });
    if(dataLen == 0){
      $("#fullChartLine2").html(HX_config.noDataHtml);
      return;
    }else{
      // 基于准备好的dom，初始化echarts图表
      $("#fullChartLine2").empty();
      var myChartLine2 = ec.init(document.getElementById('fullChartLine2'));
      // 为echarts对象加载数据
      myChartLine2.setOption(optionLine2);
    }
  }
  //媒体情感
  function getMediaFeelChart(query){
    var param = {
      query:query,
      success:function(data){
        senderMediaFeelChart(data);
      },
      error:function(){
        $("#fullChartBar1").html(HX_config.errorHtml);
      }
    };
    ajax.load('fullView_MediaFeel',param);
  }
  function senderMediaFeelChart(data){
    var optionBar1 =  {
      tooltip : {

      },
      grid:{
        show:true,
        left:85,
        borderColor:'#fff'
      },
      legend: {
        x : 'left',
        y : 'top',
        data:['负面','正面'],
        textStyle : {color: '#999'}
      },
      toolbox: {
        show : true,
        showTitle: false,
        orient : 'vertical',
        x : 'right',
        y : 'center',
        feature : {
          mark : {show: false},
          dataView : {show: false},
          magicType : {show: false},
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      color: ['#F37D66','#32D0CA'],
      calculable : true,
      xAxis : [
        {
          type : 'value'
        }
      ],
      yAxis : [
        {
          type : 'category',
          data : [
            //js填充
          ]
        }
      ],
      series : [
        {
          name:'负面',
          type:'bar',
          stack: '总量',
          barWidth: 10,
          data:[
            //js填充
          ]
        },
        {
          name:'正面',
          type:'bar',
          stack: '总量',
          barWidth: 10,
          data:[
            //js填充
          ]
        }
      ]
    };
    optionBar1.yAxis[0].data = [];
    optionBar1.series[0].data = [];
    optionBar1.series[1].data = [];
    var mediaArray = [];
    var positiveArray = [];
    var negativeArray = [];
    for(i=0; i<data.data.array.length; i++){
      mediaArray.push(data.data.array[i].media);
      positiveArray.push({"sentiment":"positive","value":data.data.array[i].positive});
      negativeArray.push({"sentiment":"negative","value":data.data.array[i].negative});
    }
    optionBar1.yAxis[0].data=mediaArray;
    optionBar1.series[0].data=negativeArray;
    optionBar1.series[1].data=positiveArray;
    if((negativeArray.length+positiveArray.length) == 0){
      $("#fullChartBar1").html(HX_config.noDataHtml);
    }else{
      $("#fullChartBar1").empty();
      var myChartBar1 = ec.init(document.getElementById('fullChartBar1'));
      myChartBar1.setOption(optionBar1);
      myChartBar1.on("click", function(param) {
        var subData = {
          planId :curPlanId?curPlanId:'',
          sentiment : param.data.sentiment,
          timeRanges:curTimeranges,
          startDate:curStartTime,
          endDate:curEndTime,
          media:param.name
        };
        window.open('/pages/monitor/monitorinfolist.html?'+ $.param(subData));
      })
    }
  }
  //媒体关注度
  function getMediaDegChart(query){
    var param = {
      query:query,
      success:function(data){
        senderMediaDegChart(data);
      },
      error:function(){
        $("#fullChartBar2").html(HX_config.errorHtml);
      }
    };
    ajax.load('fullView_MediaDeg',param);
  }
  function senderMediaDegChart(data){
    var optionBar2 =  {
      tooltip : {
        trigger: 'item',
        formatter: "{b}<br/>值:{c}"
      },
      legend: {
        x : 'left',
        y : 'top',
        data:['关注度']
      },
      toolbox: {
        show : true,
        showTitle: false,
        orient : 'vertical',
        x : 'right',
        y : 'center',
        feature : {
          mark : {show: false},
          dataView : {show: false},
          magicType : {show: false},
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      color : ['#59C2E6'],
      grid:{
        x: 50
      },
      calculable : true,
      xAxis : [
        {
          type : 'category',
          data : [
            //js填充
          ]

        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'关注度',
          type:'bar',
          barWidth: 20,
          data:[
            //js填充
          ]
        }
      ]
    };
    //重新加载汇总图的数据
    optionBar2.xAxis[0].data = [];
    optionBar2.series[0].data = [];
    var mediaArray = [];
    var valueArray = [];
    for(i=0; i<data.data.array.length; i++){
      mediaArray.push(data.data.array[i].media);
      valueArray.push(data.data.array[i].count);
    }
    optionBar2.xAxis[0].data=mediaArray;
    optionBar2.series[0].data=valueArray;
    if(valueArray.length == 0){
      $("#fullChartBar2").html(HX_config.noDataHtml);
    }else {
      $("#fullChartBar2").empty();
      var myChartBar2 = ec.init(document.getElementById('fullChartBar2'));
      myChartBar2.setOption(optionBar2);
      myChartBar2.on("click", function(param) {
        var subData = {
          planId :curPlanId?curPlanId:'',
          timeRanges:curTimeranges,
          startDate:curStartTime,
          endDate:curEndTime,
          media:param.name
        };
        window.open('/pages/monitor/monitorinfolist.html?'+ $.param(subData));
      })
    }
  }
  //地域分布Bar
  function getAreaChart(query){
    var param = {
      query:query,
      success:function(data){
        senderAreaChart(data);
      },
      error:function(){
        $("#fullChartBar3").html(HX_config.errorHtml);
      }
    };
    ajax.load('fullView_Area',param);
  }
  function senderAreaChart(data){
    var optionBar3 =  {
      tooltip : {

      },
      toolbox: {
        show : true,
        showTitle: false,
        orient : 'vertical',
        x : 'right',
        y : 'center',
        feature : {
          mark : {show: false},
          dataView : {show: false},
          magicType : {show: false},
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      color: ['#59C2E6'],
      calculable : true,
      axis: {
        axisLine: {
          show : false
        }
      },
      grid:{
        x: 60
      },
      xAxis : [

        {
          type : 'value',
          show: false
        }
      ],
      yAxis : [
        {
          type : 'category',
          data : [
            //js填充
          ]
        }
      ],
      series : [
        {
          name:'舆情数',
          type:'bar',
          barWidth: 10,
          data:[
            //js填充
          ]
        }
      ]
    };
    optionBar3.yAxis[0].data = [];
    optionBar3.series[0].data = [];
    var regionArray = [];
    var valueArray = [];
    for(i=0; i<data.data.array.length; i++){
      regionArray.push(data.data.array[i].region);
      valueArray.push(data.data.array[i].count);
    }
    optionBar3.yAxis[0].data=regionArray;
    optionBar3.series[0].data=valueArray;
    if(valueArray.length == 0){
      $("#fullChartBar3").html(HX_config.noDataHtml);
    }else{
      $("#fullChartBar3").empty();
      var myChartBar3 = ec.init(document.getElementById('fullChartBar3'));
      myChartBar3.setOption(optionBar3);
      myChartBar3.on("click", function(param) {
        var subData = {
          planId :curPlanId?curPlanId:'',
          timeRanges:curTimeranges,
          startDate:curStartTime,
          endDate:curEndTime,
          region:param.name
        };
        window.open('/pages/monitor/monitorinfolist.html?'+ $.param(subData));
      })
    }
  }
  //地域分布Map
  function getAreaMapChart(query){
    var param = {
      query:query,
      success:function(data){
        senderAreaMapChart(data);
      },
      error:function(){
        $("#fullChartMap").html(HX_config.errorHtml);
      }
    };
    ajax.load('fullView_AreaMap',param);
  }
  function senderAreaMapChart(data){
    var max = 0;
    var mapData = [];
    if(data.data.array.length == 0){
      $("#fullChartMap").html(HX_config.noDataHtml);
      return;
    }
    $.each(data.data.array,function(i,n){
      if(max < n.count){
        max = n.count;
      }
      mapData.push({
        name: n.region.replace("省",""),
        value: n.count
      })
    });
    $.get('../../api/china.json',function(json){
      ec.registerMap('china', json);
      $("#fullChartMap").empty();
      var chart = ec.init(document.getElementById('fullChartMap'));
      chart.setOption({
        tooltip : {
          trigger: 'item',
          formatter: '{b}'
        },
        legend: {
          x : 'left',
          y : 'top',
          data:['舆情数']
        },
        visualMap: {
          min: 0,
          max: max,
          left: 'left',
          top: 'bottom',
          text: ['高','低'],           // 文本，默认为数值文本
          calculable: true,
          itemWidth:10,
          itemHeight:80
        },
        color: ['#59C2E6'],
        series: [{
          name: '舆情数',
          type: 'map',
          map: 'china',
          selectedMode : 'multiple',
          itemStyle:{
            normal:{color: '#C8F1FF'},
            emphasis:{color: '#59C2E6'}
          },
          data:mapData
        }]
      });
    })
  }
  function getSentimentDistribute(query){

    var param = {
      query:query,
      success:function(data){
        if(data){
          senderSentimentDistribute(data);
        }
      }
    };
    ajax.load('getSentimentDistribute',param);
  }
  function senderSentimentDistribute(data){
    if(data.data){
      var positiveNum = data.data.positive,
          negativeNum = data.data.negative,
          neutralNum = data.data.neutral;
      var total = positiveNum+negativeNum+neutralNum;
      var negativePercent = (total === 0?0:Math.round(negativeNum / total * 10000)/ 100.00) + "%";
      var parentD = $("#profile");
      parentD.find(".totalAll").text(total);
      parentD.find(".positiveTotal").text(positiveNum);
      parentD.find(".negativeTotal").text(negativeNum);
      parentD.find(".neutralTotal").text(neutralNum);
      parentD.find(".negativePercent").text(negativePercent);
    }
  }
  //点击头部汇总跳转
  function pageTurn(planId){
    $(".main").on("click","span.turnPageJcfa",function(){
      var obj = {
        planId : planId?planId:"",
        sentiment:$(this).data("sentiment"),
        timeRanges:curTimeranges,
        startDate:curStartTime,
        endDate:curEndTime
      };
      window.open('/pages/monitor/monitorinfolist.html?'+ $.param(obj));
    })
  }
  function _init(id){
    var timeRanges = 7;
    var startTime = '';
    var endTime = '';
    var query = {
      timeRanges:timeRanges,
      startTime:startTime,
      endTime:endTime,
      planId:id
    };
    curTimeranges = timeRanges;
    curPlanId = id;
    events(id);
    chartSender(query);
    pageTurn(id);
  }
  return {
    init:_init
  }
});
