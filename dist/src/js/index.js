var titleObj={aDomObj:$(".dashboard .qtty .num"),init:function(){this.request()},request:function(){var t=this;$.ajax({type:"GET",url:"/cloudlink-inspection-analysis/patrolStatistical/getPatrolStatisticsData",contentType:"application/json",data:{token:lsObj.getLocalStorage("token"),status:1},cache:!1,dataType:"json",success:function(e,n){if(1!=e.success)return void xxwsWindowObj.xxwsAlert("网络连接出错！code:-1");var s=e.rows[0],i=[s.userCount,s.patrollingCountToday,s.eventCountToday,s.taskCountToday];t.render(i)},complete:function(t,e){},statusCode:{404:function(){}}})},render:function(t){if(!(!t instanceof Array||4!==t.length)){this.aDomObj.each(function(e){$(this).html(t[e])})}}},taskChartObj={myChart:echarts.init($("#taskChart")[0]),option:null,init:function(){var t=this;t.request(),t.renderWeek()},resize:function(){var t=this;t.option&&(t.myChart.resize(),t.myChart.setOption(t.option))},renderWeek:function(){var t=(new Date).getWeekStartDate().Format("yyyy.MM.dd"),e=(new Date).getWeekEndDate().Format("yyyy.MM.dd");$(".thisWeek").html(t+" - "+e)},request:function(){var t=this;$.ajax({type:"GET",url:"/cloudlink-inspection-task/task/getEnterpriseTasksCountForWeek",contentType:"application/json",data:{token:lsObj.getLocalStorage("token")},cache:!1,dataType:"json",success:function(e,n){if(1!=e.success)return void xxwsWindowObj.xxwsAlert("网络连接出错！code:-1");var s=e.rows[0];t.renderChart(s.completedCount,s.disposingCount)},complete:function(t,e){},statusCode:{404:function(){xxwsWindowObj.xxwsAlert("网络连接出错！code:404")}}})},renderChart:function(t,e){var n=this;t=+t,e=+e;var s=t+e;$("#taskChart_all").html(s),$("#taskChart_done").html(t),$("#taskChart_doing").html(e);var i=0===s?0:100,a=0===s?0:Math.ceil(t/s*100),o=0===s?0:100-a;n.drawChart(i,a,o)},drawChart:function(t,e,n){var s=this;s.option={color:["#64bd63","#59b6fc","#ec7145"],tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},tooltip:{trigger:"axis",axisPointer:{type:"shadow"},formatter:"{b}：{c}%"},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{data:["任务总量","已完成","处理中"],boundaryGap:!0,axisTick:{show:!1},boundaryGap:["20%","20%"],axisLine:{show:!1}}],yAxis:[{type:"value",axisLine:{show:!1},axisTick:{show:!1}}],series:[{name:"直接访问",type:"bar",barWidth:"60%",data:[t,e,n],itemStyle:{normal:{index:0,color:function(t){return["#64bd63","#59b6fc","#ec7145"][t.dataIndex]}}},label:{normal:{show:!0,position:"top",offset:[0,-5],formatter:"{c}%",textStyle:{color:"#333",fontSize:14}}}}]},s.myChart.setOption(s.option)}},eventChartObj={myChart:null,option:null,$tip:$("#chart_tip"),init:function(){this.request()},resize:function(){var t=this;t.option&&t.myChart&&(t.myChart.resize(),t.myChart.setOption(t.option))},request:function(){var t=this;$.ajax({type:"GET",url:"/cloudlink-inspection-event/eventInfo/web/v1/getEnterpriseEventsCountForWeek?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:{token:lsObj.getLocalStorage("token")},cache:!1,dataType:"json",success:function(e,n){if(1!=e.success)return void xxwsWindowObj.xxwsAlert("网络连接出错！code:-1");var s=e.rows;t.render(s)},statusCode:{404:function(){xxwsWindowObj.xxwsAlert("网络连接出错！code:404")}}})},render:function(t){var e=this;t.length>0?(e.$tip.hide(),e.myChart||(e.myChart=echarts.init($("#eventChart")[0])),e.drawChart(t)):e.$tip.show()},drawChart:function(t){var e=this,n=["#58b7fd","#ed7244","#efcd2a","#706cfb","#9387e3","#a5f3ff","#9be534","#64bd62"];e.option={color:n,tooltip:{trigger:"item",formatter:"{b} {c} 起"},legend:{itemWidth:25,itemGap:10,padding:[5,15,15,5],data:t.map(function(t,e){return{name:t.typeName}})},series:[{type:"pie",radius:["35%","65%"],data:t.map(function(t,e){return{name:t.typeName,value:t.count}}),label:{normal:{show:!0,position:"outside",formatter:"{b}: {d} %",textStyle:{color:"#666",fontSize:14}}}}]},e.myChart.setOption(e.option)}},taskListObj={$tip:$("#task_tip"),init:function(){this.request()},request:function(){var t=this;$.ajax({type:"GET",url:"/cloudlink-inspection-task/task/getMyUnDisposedTasks",contentType:"application/json",data:{token:lsObj.getLocalStorage("token"),status:20,size:3},dataType:"json",cache:!1,success:function(e,n){if(1!=e.success)return void xxwsWindowObj.xxwsAlert("网络连接出错！code:-1");var s=e.rows[0],i=s.total,a=s.list;t.render(i,a),t.bindEvent()},complete:function(t,e){},statusCode:{404:function(){xxwsWindowObj.xxwsAlert("网络连接出错！code:404")}}})},bindEvent:function(){$("#taskList_wrapper .mybtn").click(function(){taskObj.taskOpen($(this).attr("data-id"))})},render:function(t,e){var n=this;$("#taskList_total").html(t);var s="",i={"00":"record",10:"record",20:"ask",30:"advise"};if(0==+t)return void n.$tip.css("display","block");n.$tip.css("display","none"),e.forEach(function(t,e,n){s=s+'<div class="line"><div class="line_title"><span class="person">'+t.createUserName+"</span><span>任务号：</span><span>"+t.code+'</span></div><div class="sub_wrap"><div class="icon '+i[t.disposeType]+'"></div><div class="mybtn" data-id="'+t.taskId+'">处置</div><div class="content"><div class="desc">'+t.eventDescription+'</div><div class="dis_title"><span class="person">'+t.disposeUserName+'</span><span class="handle">'+t.disposeTypeName+'</span><span class="date">'+t.disposeTime+'</span></div><div class="dispose">'+t.disposeContent+"</div></div></div></div>"}),$("#taskList_wrapper").html(s)}},eventListObj={$tip:$("#event_tip"),init:function(){this.request()},bindEvent:function(){$("#eventList_wrapper .mybtn").click(function(){var t=this;$("#details").modal(),setTimeout(function(){detailsObj.loadEventDetails($(t).attr("data-id"))},1e3)})},request:function(){var t=this;$.ajax({type:"GET",url:"/cloudlink-inspection-event/eventInfo/getEnterpriseEventsList?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:{token:lsObj.getLocalStorage("token"),status:20,size:3},dataType:"json",cache:!1,success:function(e,n){if(1!=e.success)return void xxwsWindowObj.xxwsAlert("网络连接出错！code:-1");var s=e.rows[0],i=s.total,a=s.list;t.render(i,a),t.bindEvent()},complete:function(t,e){},statusCode:{404:function(){xxwsWindowObj.xxwsAlert("网络连接出错！code:404")}}})},render:function(t,e){var n=this;if($("#eventList_total").html(t),0==+t)return void n.$tip.css("display","block");n.$tip.css("display","none");var s="";e.forEach(function(t,e,n){var i=['<div class="line">','<div class="line_title">','<span class="perosn">',t.inspectorName,"</span>","<span>事件号：</span>","<span>",t.eventCode,"</span>","</div>",'<div class="sub_wrap">','<div class="icon" ','style="background:url(/src/images/common/eventTypeImg/'+(t.eventIconName||"D01.png")+') no-repeat 5px 4px;background-size:43px 43px;">',"</div>",'<div class="content">','<div class="con_title">','<span class="date">',t.occurrenceTime,"</span>",'<span class="type">',t.fullTypeName,"</span>",'<span class="scope">',"","</span>","</div>",'<div class="des_wrap">','<div class="mybtn" data-id="'+t.objectId+'">查看</div>','<div class="desc">',t.description,"</div>",'<div class="dist">',t.address,"</div>","</div>","</div>","</div>","</div>"];s+=i.join("")}),$("#eventList_wrapper").html(s)}};!function(){window.onresize=function(){taskChartObj.resize(),eventChartObj.resize()}}(),function(){var t=function(){titleObj.init(),taskChartObj.init(),eventChartObj.init(),taskListObj.init(),eventListObj.init()};t(),setInterval(function(){t()},3e5)}();