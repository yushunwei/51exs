define(
    [
      'echarts/echarts',
      'echarts/chart/pie', // 使用柱状图就加载bar模块，按需加载
      'echarts/chart/line',
      'echarts/chart/bar'
    ]
    , function (ec) {
        function init (){
          // 基于准备好的dom，初始化echarts图表
          var myChartPie = ec.init(document.getElementById('chartPie'));

          var optionPie = {
            tooltip : {
              trigger: 'item',
              formatter: "{b}<br/>值:{c}<br/>占比:{d}%"
            },
            toolbox: {
              show : true,
              showTitle: false,
              orient : 'vertical',
              x : 'right',
              y : 'top',
              feature : {
                mark : {show: false},
                dataView : {show: false},
                magicType : {show: false},
                restore : {show: true},
                saveAsImage : {show: true}
              }
            },
            calculable : false,
            series : [
              {
                name:'汇总',
                type:'pie',
                selectedMode: 'single',
                radius : [0, 60],


                // for funnel
                x: '20%',
                width: '40%',
                funnelAlign: 'right',
                itemStyle : {
                  normal : {
                    label : {
                      position : 'inner'
                    },
                    labelLine : {
                      show : false
                    }
                  },
                  emphasis: {
                    label: {
                      show: true,
                      textStyle: {
                        color: '#fff'
                      }
                    }
                  }
                },
                data:[
                  {   value:6,
                    itemStyle:{
                      normal : {
                        color : ['#3693B3']
                      }
                    },
                    name:'正面'
                  },
                  {   value:6,
                    itemStyle:{
                      normal : {
                        color : ['#737980']
                      }
                    },
                    name:'中性'
                  },
                  {   value:6,
                    itemStyle:{
                      normal : {
                        color : ['#B24747']
                      }
                    },
                    name:'负面'
                  }

                ]
              },
              {
                name:'舆情方案',
                type:'pie',
                radius : [80, 110],

                // for funnel
                x: '60%',
                width: '35%',
                funnelAlign: 'left',
                max: 1048,
                data:[
                  {   value:1,
                    itemStyle:{
                      normal : {color : ['#309BBF'],label: {textStyle: {color: '#309BBF'} },labelLine : { lineStyle: {color: '#309BBF' } }}
                    },
                    name:'我的公司'
                  },
                  {   value:1,
                    itemStyle:{
                      normal : {color : ['#29A3CC'],label: {textStyle: {color: '#29A3CC'} },labelLine : { lineStyle: {color: '#29A3CC' } }  }
                    },
                    name:'行业'
                  },
                  {   value:1,
                    itemStyle:{
                      normal : {color : ['#21ABD9'],label: {textStyle: {color: '#21ABD9'} },labelLine : { lineStyle: {color: '#21ABD9' } }  }
                    },
                    name:'财务'
                  },
                  {   value:1,
                    itemStyle:{
                      normal : {color : ['#17B2E6'],label: {textStyle: {color: '#17B2E6'} },labelLine : { lineStyle: {color: '#17B2E6' } }  }
                    },
                    name:'品牌形象'
                  },
                  {   value:1,
                    itemStyle:{
                      normal : {color : ['#0CB9F2'],label: {textStyle: {color: '#0CB9F2'} },labelLine : { lineStyle: {color: '#0CB9F2' } }  }
                    },
                    name:'方案一'
                  },
                  {   value:1,
                    itemStyle:{
                      normal : {color : ['#05C1FF'],label: {textStyle: {color: '#05C1FF'} },labelLine : { lineStyle: {color: '#05C1FF' } }  }
                    },
                    name:'其他'
                  },
                  {   value:1,
                    itemStyle:{
                      normal : {color : ['#7E858C'],label: {textStyle: {color: '#7E858C'} },labelLine : { lineStyle: {color: '#7E858C' } }  }
                    },
                    name:'我的公司'
                  },
                  {   value:1,
                    itemStyle:{
                      normal : {color : ['#8A9199'],label: {textStyle: {color: '#8A9199'} },labelLine : { lineStyle: {color: '#8A9199' } }  }
                    },
                    name:'行业'
                  },
                  {   value:1,
                    itemStyle:{
                      normal : {color : ['#959DA6'],label: {textStyle: {color: '#959DA6'} },labelLine : { lineStyle: {color: '#959DA6' } }  }
                    },
                    name:'财务'
                  },
                  {   value:1,
                    itemStyle:{
                      normal : {color : ['#A1AAB2'],label: {textStyle: {color: '#A1AAB2'} },labelLine : { lineStyle: {color: '#A1AAB2' } }  }
                    },
                    name:'品牌形象'
                  },
                  {   value:1,
                    itemStyle:{
                      normal : {color : ['#ACB6BF'],label: {textStyle: {color: '#ACB6BF'} },labelLine : { lineStyle: {color: '#ACB6BF' } }  }
                    },
                    name:'方案一'},
                  {   value:1,
                    itemStyle:{
                      normal : {color : ['#B8C2CC'],label: {textStyle: {color: '#B8C2CC'} },labelLine : { lineStyle: {color: '#B8C2CC' } }  }
                    },
                    name:'其他'
                  },
                  {   value:1,
                    itemStyle:{
                      normal : {color : ['#BF4C4C'],label: {textStyle: {color: '#BF4C4C'} },labelLine : { lineStyle: {color: '#BF4C4C' } }  }
                    },
                    name:'我的公司'
                  },
                  {   value:1,
                    itemStyle:{
                      normal : {color : ['#CC5252'],label: {textStyle: {color: '#CC5252'} },labelLine : { lineStyle: {color: '#CC5252' } }  }
                    },
                    name:'行业'
                  },
                  {   value:1,
                    itemStyle:{
                      normal : {color : ['#D95757'],label: {textStyle: {color: '#D95757'} },labelLine : { lineStyle: {color: '#D95757' } }  }
                    },
                    name:'财务'
                  },
                  {   value:1,
                    itemStyle:{
                      normal : {color : ['#E55C5C'],label: {textStyle: {color: '#E55C5C'} },labelLine : { lineStyle: {color: '#E55C5C' } }  }
                    },
                    name:'品牌形象'
                  },
                  {   value:1,
                    itemStyle:{
                      normal : {color : ['#E56767'],label: {textStyle: {color: '#E56767'} },labelLine : { lineStyle: {color: '#E56767' } }  }
                    },
                    name:'方案一'
                  },
                  {   value:1,
                    itemStyle:{
                      normal : {color : ['#FF7F7F'],label: {textStyle: {color: '#FF7F7F'} },labelLine : { lineStyle: {color: '#FF7F7F' } }  }
                    },
                    name:'其他'
                  }
                ]
              }
            ]
          };
          // 为echarts对象加载数据
          myChartPie.setOption(optionPie);

          var ecConfig = require('echarts/config');
          myChartPie.on(ecConfig.EVENT.PIE_SELECTED, function (param){
            var selected = param.selected;
            var serie;
            var str = '当前选择： ';
            for (var idx in selected) {
              serie = optionPie.series[idx];
              for (var i = 0, l = serie.data.length; i < l; i++) {
                if (selected[idx][i]) {
                  str += '【系列' + idx + '】' + serie.name + ' : ' +
                      '【数据' + i + '】' + serie.data[i].name + ' ';
                }
              }
            }
            document.getElementById('wrong-message').innerHTML = str;
          });

          // 基于准备好的dom，初始化echarts图表
          var myChartLine = ec.init(document.getElementById('chartLine'));

          var optionLine =  {
            tooltip : {
            },
            legend: {
              x : 'center',
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
            xAxis : [
              {
                type : 'category',
                boundaryGap : false,
                data : ['2006-03-02','2006-03-04','2006-03-06','2006-03-08']
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            color: ['#F9543F','#FE8D94','#F3C17F','#FE8E5C','#9BABDA','#2FC5EB','#55C59E'],
            series : [
              {
                name:'新闻',
                type:'line',
                data:[120, 132, 101, 134]
              },
              {
                name:'论坛',
                type:'line',
                data:[220, 182, 191, 234]
              },
              {
                name:'微博',
                type:'line',
                data:[150, 232, 201, 154]
              },
              {
                name:'电子报',
                type:'line',
                data:[320, 332, 301, 334]
              },
              {
                name:'贴吧',
                type:'line',
                data:[20, 72, 21, 14]
              },
              {
                name:'博客',
                type:'line',
                data:[90, 92, 81, 194]
              },
              {
                name:'微信',
                type:'line',
                data:[280, 282, 251, 264]
              }
            ]
          };

          // 为echarts对象加载数据
          myChartLine.setOption(optionLine);

          // 基于准备好的dom，初始化echarts图表
          var myChartBar1 = ec.init(document.getElementById('chartBar1'));
          var myChartBar2 = ec.init(document.getElementById('chartBar2'));
          var myChartBar3 = ec.init(document.getElementById('chartBar3'));


          var optionBar =  {
            tooltip : {
              trigger: 'item',
              formatter: "{b}<br/>{a}:{c}"
            },
            legend: {
              x : 'center',
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
            calculable : true,
            xAxis : [
              {
                type : 'value'
              }
            ],
            yAxis : [
              {
                type : 'category',
                data : ['新浪微博','小米网','华为','百度贴吧','手机高手','MIUI','数码之家','新浪','vivo官网']
              }
            ],
            series : [
              {
                name:'负面',
                type:'bar',
                stack: '总量',
                barWidth: 10,
                itemStyle : { normal: {color : ['#FF6D6E'] }},
                data:[20, 32, 31, 34, 90, 30, 20, 30, 20]
              },
              {
                name:'正面',
                type:'bar',
                stack: '总量',
                barWidth: 10,
                itemStyle : { normal: {color : ['#59C2E6'] }},
                data:[120, 132, 101, 134, 90, 230, 210, 230, 210]
              }
            ]
          };

          // 为echarts对象加载数据
          myChartBar1.setOption(optionBar);
          myChartBar2.setOption(optionBar);
          myChartBar3.setOption(optionBar);
        }

  return {
    init: init
  }
});
