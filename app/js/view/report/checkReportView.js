define(['tool/Utils','echarts/echartsmin'], function (util,ec) {
    Handlebars.registerHelper("math", function(v1, operator, v2){
        if(operator == "+"){	return v1+v2;}
        if(operator == "-"){	return v1-v2;}
        if(operator == "*"){	return v1*v2;}
        if(operator == "/"){	return v1/v2;}
        if(operator == "%"){	return v1%v2;}
    });
    var weeklyReportListHtml;
    function _renderWeeklyReadGuideList(dataArr){
        weeklyReportListHtml = !weeklyReportListHtml?($("#weeklyReadGuidList").html()):weeklyReportListHtml;
        var weeklyReportListTemplate = Handlebars.compile(weeklyReportListHtml);
        var reportListHtml = weeklyReportListTemplate(dataArr);
        $(".weeklyReadGuidList").html(reportListHtml);
    }
    function _renderPage(data){
        $("#reportName").text(decodeURIComponent(data.reportName));
        $("#startDate").text(decodeURIComponent(data.startDate).split(" ")[0]);
        $("#endDate").text(decodeURIComponent(data.endDate).split(" ")[0]);
        var baseUrl = HX_Ajax_Path.downloadweeklyreport+"?token="+util.getToken()+"&path="+decodeURIComponent(data.path)+
            "&reportName="+decodeURIComponent(data.reportName)+"&startDate="+decodeURIComponent(data.startDate)+
            "&endDate="+decodeURIComponent(data.endDate);
        $("#downReport").attr("href",baseUrl);
    }
    function _renderWeeklyCarrierdisList(data){
        var newData = reform(data);
        var optionPie = {
            tooltip : {
                trigger: 'item',
                formatter: "{b}<br/>值:{c}<br/>占比:{d}%"
            },
            legend: {
                orient : 'vertical',
                x : 'left',
                data:newData.nameList
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
            color : ['#00CCC8','#FE8D94','#F3C17F','#FE8E5C','#9BABDA','#8D89A9','#55C59E','#B155C5'],
            calculable : false,
            series : [
                {
                    name:'分布统计',
                    type:'pie',
                    radius : [0, '75%'],
                    funnelAlign: 'right',
                    data:newData.pieList
                }
            ]
        };
        var myChartPie = ec.init(document.getElementById('reportChartPie'));
        myChartPie.setOption(optionPie);//weeklyCarrierdisList
        var weeklyCarrierdisListTemplate = Handlebars.compile($("#weeklyCarrierdisList").html());
        var weeklyCarrierdisList = weeklyCarrierdisListTemplate(newData.gridList);
        $(".weeklyCarrierdisList").find("tbody").html(weeklyCarrierdisList);
    }
    //组织新参数
    function reform(data){
        var obj = {
            nameList:[],
            pieList:[],
            gridList:[]
        };
        var total = {
            name: '总计',
            similarity:0,
            negative:0,
            positive:0,
            warn:0
        };
        $.each(data,function(i,n){
            obj.nameList.push(n.name);
            obj.pieList.push({
                name:n.name,
                value: n.count
            });
            obj.gridList.push({
                name: n.name,
                similarity: n.similarity - 0,
                negative: n.negative - 0,
                positive: n.positive - 0,
                warn: n.warn - 0
            });
            total.similarity += n.similarity-0;
            total.negative += n.negative-0;
            total.positive += n.positive-0;
            total.warn += n.warn-0;
        });
        obj.gridList.push(total);
        return obj;
    }
    function _renderWeeklyTop10SentmediadisList(data,isPositive){
        var newData = top10Reform(data);
        var barDom = (!isPositive)?"reportChartBar1":"reportChartBar2";
        if(newData.valueList.length == 0){
            $("#"+barDom).html(HX_config.noDataHtml);
            return;
        }
        var optionBar =  {
            tooltip : {
                trigger: 'item',
                formatter: "{b}<br/>值:{c}"
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
            color : isPositive? ['#59C2E6']:['#FF6D6E'],
            grid:{
                x: 90
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
                    data : newData.nameList
                }
            ],
            series : [
                {
                    name:isPositive?'正面':'负面',
                    type:'bar',
                    barWidth: 15,
                    itemStyle : {
                        normal : {
                            label : {
                                position : 'inside',
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        }
                    },
                    data:newData.valueList
                }
            ]
        };
        var myChartBar = ec.init(document.getElementById(barDom));
        myChartBar.setOption(optionBar);

    }

    //重组top10数据
    function top10Reform(data){
        var obj = {
            nameList:[],
            valueList:[]
        };
        $.each(data,function(i,n){
            obj.nameList.push(n.name);
            obj.valueList.push(n.value);
        });
        return obj;
    }
    return {
        //初始化渲染
        renderPage:_renderPage,
        //渲染导读列表数据
        renderWeeklyReadGuideList:_renderWeeklyReadGuideList,
        //渲染载体分布统计
        renderWeeklyCarrierdisList:_renderWeeklyCarrierdisList,
        //获取top10
        renderWeeklyTop10SentmediadisList:_renderWeeklyTop10SentmediadisList
    }
});
