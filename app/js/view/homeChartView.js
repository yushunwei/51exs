define(['tool/ajaxTool', 'echarts/echartsmin'], function (ajax, ec) {
  //chart pie渲染
  function _senderPie() {
    var optionPie = {
      tooltip: {
        trigger: 'item',
        formatter: "{b}<br/>值:{c}<br/>占比:{d}%"
      },
      toolbox: {
        show: true,
        showTitle: false,
        orient: 'vertical',
        x: 'right',
        y: 'top',
        feature: {
          mark: {show: false},
          dataView: {show: false},
          magicType: {show: false},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      calculable: false,
      series: [{
        name: '汇总',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, 60],
        x: '20%',
        width: '40%',
        funnelAlign: 'right',
        itemStyle: {
          normal: {label: {position: 'inner'}, labelLine: {show: false}},
          emphasis: {label: {show: true, textStyle: {color: '#fff'}}}
        },
        data: []
      }, {
        name: '舆情方案',
        type: 'pie',
        radius: [80, 110],
        x: '60%',
        width: '35%',
        funnelAlign: 'left',
        max: 1048,
        data: []
      }]
    };
    var param = {
      success: function (data) {
        setChartData(optionPie, data);
        titleSender(data);
      }
    };
    ajax.load('home_pie', param);
  }

  //获取颜色
  function getColors(name, start, end) {
    return pieColor[name + "Color"].slice(start, end);
  }

  //设置chart数据
  function setChartData(option, obj) {
    option.series[0].data = senderTotal(obj.data.totalList);
    option.series[1].data = senderEmotionDetail(obj.data.detailList);
    var myChartPie = ec.init(document.getElementById('chartPie'));
    myChartPie.setOption(option);
     myChartPie.on("click", function(param) {
       var subData = {sentiment : param.data.sentiment,timeRanges:7};
         if(param.data.planId){
             subData.planId = param.data.planId
         }
         window.open('pages/monitor/monitorinfolist.html?'+ $.param(subData));
     })
  }

  //渲染汇总
  function senderTotal(totalList) {
    var arr = [];
    $.each(totalList, function (i, n) {
      var tempCenterColor = getColors(n.sentiment, 0, 1);
      arr.push({
        value: totalList[i].value,
        itemStyle: {normal: {color: tempCenterColor}},
        name: totalList[i].sentimentName,
        sentiment: totalList[i].sentiment
      })
    });
    return arr;
  }
  //渲染详细感情
  function senderEmotionDetail(detailList){
    var arr = [];
    var allDataList = [
      detailList.filter(function(n) {return n.sentiment == 'positive'}),
      detailList.filter(function(n) {return n.sentiment == 'neutral'}),
      detailList.filter(function(n) {return n.sentiment == 'negative'})
    ];
    for(var i=0;i<allDataList.length;i++){
      for(var j=0;j<allDataList[i].length;j++){
        var tempCircleColor = getColors(allDataList[i][j].sentiment,j % 7, j % 7 + 1);
        arr.push({
          value : allDataList[i][j].value,
          itemStyle : {
            normal : {
              color : tempCircleColor,
              label : {
                textStyle : {
                  color : tempCircleColor[0]
                }
              },
              labelLine : {
                lineStyle : {
                  color : tempCircleColor[0]
                }
              }
            }
          },
          name : allDataList[i][j].planTitle,
          planId : allDataList[i][j].planId,
          sentiment : allDataList[i][j].sentiment
        })
      }
    }
    return arr;
  }
  //渲染title并且计算总量以及负面率
  function titleSender(obj){
    if(!obj.data.totalList) return;
    var sumCnt = 0;
    var negativeCnt = 0;
    var titleUlDom = $(".page-index").find("#yqfaTitle");
    $.each(obj.data.totalList,function(i,n){
      sumCnt += n.value ;
      if(n.sentiment == "negative"){
        negativeCnt = n.value;
      }
      titleUlDom.find("."+ n.sentiment+"Num").text(n.value);
    });
    var negativePercent = (sumCnt === 0?0:Math.round(negativeCnt / sumCnt * 10000)/ 100.00) + "%";
    titleUlDom.find(".sumCnt").text(sumCnt);
    titleUlDom.find(".negativePercent").text(negativePercent);
  }
  //渲染走势图
  function _senderLine(){
    var sourceObj = {
      'news' : {title:'新闻',color:'#F9543F'},
      'bbs' :  {title:'论坛',color:'#FE8D94'},
      'weibo' : {title:'微博',color:'#F3C17F'},
      'epub' : {title:'电子报',color:'#FE8E5C'},
      'tieba' : {title:'贴吧',color:'#9BABDA'},
      'blog' : {title:'博客',color:'#2FC5EB'},
      'wx_gzh' : {title:'微信',color:'#55C59E'},
      // 取值处理
      'get':function(source){
        if(this[source]){
          return this[source];
        }else{
          return {title:'未知',color:'#55C59E'};
        }
      }
    };
    var optionLine = {
      tooltip : {},
      legend : {
        x : 'center',
        y : 'top',
        data : []
      },
      toolbox : {
        show : true,
        showTitle : false,
        orient : 'vertical',
        x : 'right',
        y : 'center',
        feature : {
          mark : {show : false},
          dataView : {show : false},
          magicType : {show : false},
          restore : {show : true},
          saveAsImage : {show : true}
        }
      },
      calculable : true,
      xAxis : [ {
        type : 'category',
        boundaryGap : false,
        data : []
      } ],
      yAxis : [ {
        type : 'value'
      } ],
      color : [],
      series : []
    };
    var param = {
      success: function (data) {
        setLineData(sourceObj,optionLine, data);
      }
    };
    ajax.load('home_line', param);
  }
  //渲染line数据
  function setLineData(sourceObj,optionLine,data){
    var xAxis = {};
    for(var i in data.data){
      var valueArray = [];
      var media = data.data[i];
      for(var m in media){
        valueArray.push(media[m].count == null?0:media[m].count);
        xAxis[media[m].publicTime] = '';
      }

      optionLine.series.push({
        name : sourceObj.get(i).title,
        type : 'line',
        data : valueArray
      });
      optionLine.legend.data.push(sourceObj.get(i).title);
      optionLine.color.push(sourceObj.get(i).color);
    }

    // 横坐标设置
    for(var i in xAxis){
      optionLine.xAxis[0].data.push(i);
    }
    var myChartLine = ec.init(document.getElementById('chartLine'));
    myChartLine.setOption(optionLine);
  }
  function _getBarData(planId,chartDom){
    var param = {
      query:{
        timeRanges:7,
        planId:planId
      },
      success:function(data){
        senderBar(chartDom,data);
      }
    };
    ajax.load('home_bar',param);
  }
  //渲染bar
  function senderBar(chartDom,obj){
    var optionBar = {
      tooltip : {trigger : 'item',formatter : "{b}<br/>{a}:{c}"},
      legend : {
        x : '200px',
        y : 'top',
        data : [ '负面','正面' ],
        textStyle : {
          color : '#999'
        }
      },
      toolbox : {
        show : true,
        showTitle : false,
        orient : 'vertical',
        x : 'right',
        y : 'center',
        feature : {mark : {show : false},
          dataView : {show : false},
          magicType : {show : false},
          restore : {show : true},
          saveAsImage : {show : true}
        }
      },
      calculable : true,
      xAxis : [ {type : 'value'} ],
      yAxis : [ {
        type : 'category',
        data : []
      } ],
      series : [{
        name : '负面',
        type : 'bar',
        stack : '总量',
        barWidth : 10,
        itemStyle : {
          normal : {
            color : [ '#FF6D6E' ]
          }
        },
        data : []
      },
        {
          name : '正面',
          type : 'bar',
          stack : '总量',
          barWidth : 10,
          itemStyle : {
            normal : {
              color : [ '#59C2E6' ]
            }
          },
          data : []
        } ]
    };
    // 重新加载汇总图的数据
    optionBar.yAxis[0].data = [];
    optionBar.series[0].data = [];
    optionBar.series[1].data = [];
    var mediaArray = [];
    var positiveArray = [];
    var negativeArray = [];
    var positiveTotal = 0;
    var negativeTotal = 0;
    for (j = 0; j < obj.data.array.length; j++) {
      mediaArray.push(obj.data.array[j].media);
      positiveArray.push(obj.data.array[j].positive);
      negativeArray.push(obj.data.array[j].negative);
      positiveTotal += obj.data.array[j].positive;
      negativeTotal += obj.data.array[j].negative;
    }
    var totalAll = positiveTotal + negativeTotal;
    var negativePercent = (totalAll === 0?0:Math.round(negativeTotal / totalAll * 10000)/ 100.00) + "%";
    optionBar.yAxis[0].data = mediaArray;
    optionBar.series[0].data = negativeArray;
    optionBar.series[1].data = positiveArray;
    var myChartBar = ec.init(document.getElementById(chartDom));
    myChartBar.setOption(optionBar);
    var parentD = $("#"+chartDom).parent().parent().parent().prev();
    parentD.find(".totalAll").text(totalAll);
    parentD.find(".positiveTotal").text(positiveTotal);
    parentD.find(".negativeTotal").text(negativeTotal);
    parentD.find(".negativePercent").text(negativePercent);
    myChartBar.on("click", function(param) {
      var subData = {sentiment : param.data.sentiment,timeRanges:7};
      window.open('pages/monitor/monitorinfolist.html?'+ $.param(subData));
    })
  }
  //图表初始化
  function _chartInit(planId,chartDom){
    if(planId){
      //渲染柱形图
      _getBarData(planId,chartDom);
    }else {
      //渲染饼图
      _senderPie();
      //渲染走势图
      _senderLine();
    }
  }
  return {
    chartInit:_chartInit
  }
});
