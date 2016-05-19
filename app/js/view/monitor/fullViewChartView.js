define(["tool/ajaxTool","echarts/echarts","echarts/chart/line","echarts/chart/bar","echarts/chart/map"], function (ajax,ec) {
  //选择条件事件
  function events(id){
//在时间段选择上绑定图表刷新事件
    $("#profile").find('.tab-timeranges').click(function(){
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
  }
  //数据源舆情走势图
  function getDataTrendChart(query){
    var param = {
      query:query,
      success:function(data){
        senderDataTrendChart(data);
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
      if(curDate!=data.data.news[i].publicTime){
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
    // 为echarts对象加载数据
    var myChartLine1 = ec.init(document.getElementById('fullChartLine1'));
    myChartLine1.setOption(optionLine1);
  }
  //情感走势图
  function getFeelTrendChart(query){
    var param = {
      query:query,
      success:function(data){
        senderFeelTrendChart(data);
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
      //如果是第一天，则绑定页面上的每日情感走势信息
      if(i==0){
        //绑定图表标题栏的总量信息
        var positiveCnt=data.data.positive[i].count;
        var neutralCnt=data.data.neutral[i].count;
        var negativeCnt=data.data.negative[i].count;
        var sumCnt = positiveCnt+neutralCnt+negativeCnt;
        var negativePercent = Math.round(negativeCnt / sumCnt * 10000) / 100.00 + "%";
        $('.main').find('.plan-data').find('.type-sum-count').text(sumCnt);
        $('.main').find('.plan-data').find('.type-positive-count').text(positiveCnt);
        $('.main').find('.plan-data').find('.type-negative-count').text(negativeCnt);
        $('.main').find('.plan-data').find('.type-negative-percent').text(negativePercent);
      }
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
    // 基于准备好的dom，初始化echarts图表
    var myChartLine2 = ec.init(document.getElementById('fullChartLine2'));
    // 为echarts对象加载数据
    myChartLine2.setOption(optionLine2);
  }
  //媒体情感
  function getMediaFeelChart(query){
    var param = {
      query:query,
      success:function(data){
        senderMediaFeelChart(data);
      }
    };
    ajax.load('fullView_MediaFeel',param);
  }
  function senderMediaFeelChart(data){
    var optionBar1 =  {
      tooltip : {

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
      positiveArray.push(data.data.array[i].positive);
      negativeArray.push(data.data.array[i].negative);
    }
    optionBar1.yAxis[0].data=mediaArray;
    optionBar1.series[0].data=negativeArray;
    optionBar1.series[1].data=positiveArray;
    var myChartBar1 = ec.init(document.getElementById('fullChartBar1'));
    myChartBar1.setOption(optionBar1);
  }
  //媒体关注度
  function getMediaDegChart(query){
    var param = {
      query:query,
      success:function(data){
        senderMediaDegChart(data);
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
    var myChartBar2 = ec.init(document.getElementById('fullChartBar2'));
    myChartBar2.setOption(optionBar2);
  }
  //地域分布Bar
  function getAreaChart(query){
    var param = {
      query:query,
      success:function(data){
        senderAreaChart(data);
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
    var myChartBar3 = ec.init(document.getElementById('fullChartBar3'));
    myChartBar3.setOption(optionBar3);
  }
  //地域分布Map
  function getAreaMapChart(query){
    var param = {
      query:query,
      success:function(data){
        senderAreaMapChart(data);
      }
    };
    ajax.load('fullView_AreaMap',param);
  }
  function senderAreaMapChart(data){
    var optionMap =  {
      tooltip : {
        trigger: 'item',
        formatter: '{b}'
      },
      legend: {
        x : 'left',
        y : 'top',
        data:['舆情数']
      },
      color: ['#59C2E6'],
      series : [
        {
          name: '舆情数',
          type: 'map',
          mapType: 'china',
          selectedMode : 'multiple',
          itemStyle:{
            normal:{color: '#C8F1FF'},
            emphasis:{color: '#59C2E6'}
          },
          data:[
            {name:'广东',selected:false}
          ]
        }
      ]
    };
    // 基于准备好的dom，初始化echarts图表
    var myChartMap = ec.init(document.getElementById('fullChartMap'));
    // 为echarts对象加载数据
    myChartMap.setOption(optionMap);
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
    events(id);
    chartSender(query);
  }
  return {
   init:_init
  }
});
