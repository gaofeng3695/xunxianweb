$(function(){});var playerObj={$close:$(".player_wrapper .btn_close"),$date:$(".player_wrapper .title .date"),$rangeNow:$(".player_wrapper .title .now "),$rangeEnd:$(".player_wrapper .title .end "),$speed:$(".player_wrapper .title .speed .item"),$btn_play:$(".player_wrapper .time_line .btn_play"),$time_mark:$(".player_wrapper .time_line .time_mark"),$stick_bar:$(".player_wrapper .time_line .stick_bar"),$move_bar:$(".player_wrapper .time_line .move_bar"),$active_bar:$(".player_wrapper .time_line .line_bar_active"),$time_now:$(".player_wrapper .time_line .time_now"),$line_bar:$(".player_wrapper .time_line .line_bar"),$mask_bar:$(".player_wrapper .time_line .mask_bar"),$event_line:$(".player_wrapper .time_line .event_line"),lineLength:$(".player_wrapper .time_line .line_bar").width(),timer:null,nowTime:0,beginTime:null,endTime:null,allTime:null,aData:null,lastPt:null,nextPt:null,rate:30,init:function(){var e=this;this.timer=null,this.nowTime=0,this.beginTime=null,this.endTime=null,this.allTime=null,this.aData=null,this.lastPt=null,this.nextPt=null,this.rate=30,this.$date.html("-"),this.$rangeNow.html("-"),this.$rangeEnd.html("-"),this.$time_mark.html("-"),this.$time_now.html("-"),e.$move_bar.css("left",0),e.$active_bar.css("width",0),e.$time_now.css("left",0),e.isBindEvent||(e.bindEvent(),e.isBindEvent=!0),$(".player_wrapper").css("display","block"),e.$btn_play.addClass("active"),e.$speed.removeClass("active").eq(1).addClass("active"),mapObj.$bdMap.clearOverlays()},bindEvent:function(){var e=this;e.$btn_play[0].onclick=function(){if($(this).hasClass("active"))return e.nowTime>=e.allTime&&(e.nowTime=0),void e.setTimer(!0);e.setTimer()},e.$close.click(function(){e.close_player(function(){eventObj.getInitialPoints()}),inspectObj.openInspect()}),e.$speed.click(function(){var t=$(this).index(),n=[1,30,60,120,240];e.$speed.removeClass("active"),$(this).addClass("active"),e.rate=n[t-1]}),e.$mask_bar.on("click",function(t){var t=t||event;return e.nowTime=t.offsetX/e.lineLength*e.allTime,e.setCurrentPointByTime(e.nowTime+e.beginTime),e.renderTimeLine(),!1}),e.$move_bar[0].onmousedown=function(){var t=e.$btn_play.hasClass("active");this.ispause=t,e.setTimer(),this.onmousemove=null,this.onmousemove=function(t){var t=t||event;return e.nowTime=Math.ceil(+e.$move_bar.css("left").slice(0,-2)+t.offsetX)/e.lineLength*e.allTime,e.setCurrentPointByTime(e.nowTime+e.beginTime),e.renderTimeLine(),!1}},e.$move_bar[0].onmouseup=e.$move_bar[0].onmouseout=function(e){var e=e||event;return this.onmousemove=null,!1}},render:function(){var e=this,t=new Date(e.beginTime).Format("yyyy.MM.dd"),n=new Date(e.endTime).Format("yyyy.MM.dd"),i=t;if(n.slice(-2)!==t.slice(-2))var i=t+" - "+n;e.$date.html(i),e.$rangeEnd.html(new Date(e.allTime-288e5).Format("HH:mm:ss")),e.renderStick()},renderStick:function(){for(var e=this,t=new Date(e.beginTime).Format("HH:mm:ss"),n=new Date(e.endTime).Format("HH:mm:ss"),i="",a='<div class="time">'+t+"</div>",r=1;r<6;r++)i+='<div class="stick" style="left:'+r/6*e.lineLength+'px"></div>',a+='<div class="time" style="left:'+r/6*e.lineLength+'px">'+new Date(e.beginTime+e.allTime*r/6).Format("HH:mm:ss")+"</div>";a+='<div class="time" style="left:'+r/6*e.lineLength+'px">'+n+"</div>",e.$stick_bar.html(i),e.$time_mark.html(a)},renderTimeLine:function(){var e=this,t=e.nowTime/e.allTime;t=t>1?1:t,e.$move_bar.css("left",600*t),e.$active_bar.css("width",600*t),e.$time_now.css("left",600*t);var n=e.beginTime+e.nowTime;n=n>e.endTime?e.endTime:n,e.$time_now.html(new Date(n).Format("HH:mm:ss"));var i=e.nowTime>e.allTime?e.allTime:e.nowTime;i-=288e5,e.$rangeNow.html(new Date(i).Format("HH:mm:ss"))},play:function(e,t){this.requestRoutePoint(e,t)},requestRoutePoint:function(e,t){var n=this;n.close_player(),$.ajax({type:"POST",url:"/cloudlink-inspection-trajectory/trajectory/getByRecordId",contentType:"application/json",data:JSON.stringify({inspRecordId:e}),dataType:"json",success:function(i){return 1!=i.success?void xxwsWindowObj.xxwsAlert("网络连接出错！code:-1"):0===i.rows.length?void xxwsWindowObj.xxwsAlert("当前巡检记录无轨迹点！"):(n.requestEventInfo(e),n.init(),n.aData=i.rows,n.beginTime=n.aData[0].createTime,n.endTime=n.aData[n.aData.length-1].createTime,n.allTime=n.endTime-n.beginTime,n.render(),n.drawRoute(n.aData,t),void n.movePerson(n.aData))},statusCode:{404:function(){xxwsWindowObj.xxwsAlert("网络连接出错！code:404")}}})},requestEventInfo:function(e){$.ajax({type:"POST",url:"/cloudlink-inspection-event/eventInfo/web/v1/getPageList?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify({status:"20,21,30",type:"",startDate:"",endDate:"",keyword:"",inspRecordId:e,pageNum:1,pageSize:100}),dataType:"json",success:function(e){if(1!=e.success)return void xxwsWindowObj.xxwsAlert("网络连接出错！code:-1");var t=e.rows;0!==t.length&&eventObj.setEventPointsMarker(t,!0)},statusCode:{404:function(){xxwsWindowObj.xxwsAlert("网络连接出错！code:404")}}})},drawRoute:function(e,t){var n=e.map(function(e,t,n){return new BMap.Point(e.bdLon,e.bdLat)}),i=(mapObj.$bdMap.setViewport(n,{zoomFactor:-1}),new BMap.Polyline(n,{strokeColor:"#59b6fc",strokeWeight:4,strokeOpacity:1})),a=new BMap.Marker(new BMap.Point(e[0].bdLon,e[0].bdLat),{icon:new BMap.Icon("/src/images/map/icon_start.png",new BMap.Size(30,42),{anchor:new BMap.Size(15,42)})}),r=new BMap.Marker(new BMap.Point(e[e.length-1].bdLon,e[e.length-1].bdLat),{icon:new BMap.Icon("/src/images/map/icon_end.png",new BMap.Size(30,42),{anchor:new BMap.Size(15,42)})});mapObj.$bdMap.addOverlay(a),1==+t&&mapObj.$bdMap.addOverlay(r),mapObj.$bdMap.addOverlay(i)},drawEventOnLine:function(e){var t=this,n="";console.log(e),e.forEach(function(e,i){var a=t.getDateFromDateString(e.createTime).getTime(),r=(a-t.beginTime)/t.allTime;r=r>1?1:r,r=r<0?0:r,n+='<div class="item dis1" style="left:'+t.lineLength*r+'px"></div>'}),t.$event_line.html(n)},movePerson:function(e){var t=this;t.personMarker=new BMap.Marker(new BMap.Point(e[0].bdLon,e[0].bdLat),{icon:new BMap.Icon("/src/images/map/icon_person.png",new BMap.Size(30,42))}),mapObj.$bdMap.addOverlay(t.personMarker),t.renderTimeLine()},setTimer:function(e){var t=this,n=t.aData;t.timer&&(t.$btn_play.addClass("active"),clearInterval(t.timer)),t.nowTime>t.allTime||!e||(t.$btn_play.removeClass("active"),t.timer=setInterval(function(){t.nowTime+=40*t.rate,t.nowTime>t.allTime&&(t.$btn_play.addClass("active"),clearInterval(t.timer)),t.setCurrentPointByTime(n[0].createTime+t.nowTime),t.renderTimeLine()},40))},setCurrentScopeByTime:function(e){for(var t=this,n=t.aData,i=n.length,a=0;a<i;a++)if(e<n[a].createTime)return t.lastPt=n[a-1],void(t.nextPt=n[a]);t.lastPt=n[i-1],t.nextPt=null},setCurrentPointByTime:function(e){var t=this;if(t.setCurrentScopeByTime(e),t.nextPt){var n=e-t.lastPt.createTime,i=t.nextPt.createTime-t.lastPt.createTime,a=n/i,r=t.lastPt.bdLat+(t.nextPt.bdLat-t.lastPt.bdLat)*a,s=t.lastPt.bdLon+(t.nextPt.bdLon-t.lastPt.bdLon)*a;t.personMarker.setPosition(new BMap.Point(s,r))}},close_player:function(e){this.setTimer(),mapObj.$bdMap.clearOverlays(),inspectObj.$inspectBtn.removeClass("active"),eventObj.closeEvent(),$(".player_wrapper").css("display","none"),"[object Function]"===Object.prototype.toString.call(e)&&e()},getDateFromDateString:function(e){var t=new Date;return t.setFullYear(e.slice(0,4)),t.setMonth(+e.slice(5,7)-1),t.setDate(e.slice(8,10)),t.setHours(+e.slice(11,13)),t.setMinutes(+e.slice(14,16)),t.setSeconds(0),t}},searchObj={$ul:$(".location ul"),$input:$("#location_search"),init:function(){this.bindEvent()},bindEvent:function(){function e(){t.lastPoint&&mapObj.$bdMap.removeOverlay(t.lastPoint);var e=new BMap.LocalSearch(mapObj.$bdMap,{onSearchComplete:function(){if(!e.getResults().getPoi(0))return void xxwsWindowObj.xxwsAlert("未找到该点，请重新搜索");var n=e.getResults().getPoi(0).point;mapObj.$bdMap.centerAndZoom(n,18),t.lastPoint=new BMap.Marker(n),mapObj.$bdMap.addOverlay(t.lastPoint)}});e.search(i)}var t=this,n=new BMap.Autocomplete({input:"location_search",location:mapObj.$bdMap,onSearchComplete:function(e){}});n.addEventListener("onhighlight",function(e){var t="",n=e.fromitem.value,i="";e.fromitem.index>-1&&(i=n.province+n.city+n.district+n.street+n.business),t="FromItem<br />index = "+e.fromitem.index+"<br />value = "+i,i="",e.toitem.index>-1&&(n=e.toitem.value,i=n.province+n.city+n.district+n.street+n.business),t+="<br />ToItem<br />index = "+e.toitem.index+"<br />value = "+i});var i;n.addEventListener("onconfirm",function(t){var n=t.item.value;i=n.province+n.city+n.district+n.street+n.business,e()})},renderResult:function(){}};$(function(){searchObj.init()});