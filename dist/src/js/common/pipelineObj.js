!function(e,t,i){var n={_aLineData:null,_aPolyline:[],bdMap:null,init:function(e){if(!e)return void alert("请传入百度地图的实例对象");this.bdMap=e,this._requestData()},_requestData:function(){var e=this;if(this._aLineData)return void e.drawLines();t.ajax({type:"POST",url:"/cloudlink-inspection-event/commonData/pipemaplinedetail/getPageList?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify({pipeNetworkUsed:"1",pageNum:1,pageSize:200}),dataType:"json",success:function(t){1==t.success?(e._aLineData=t.rows,e.drawLines()):i.xxwsAlert("服务异常，请稍候重试")}})},drawLines:function(){var e=this,t=(this.bdMap,this._aLineData);!t||0===t.length||this._aPolyline.length>0||(this._aPolyline=[],t.forEach(function(t,i){if(t.line&&0!==t.line.length&&t.line.length>1){var n=e._draw_line(t.line,{strokeColor:t.pipeColor,strokeWeight:t.pipeWeight,strokeStyle:t.pipeStyle,strokeOpacity:1,enableEditing:e.isEditable||!1,enableMassClear:!1});e._aPolyline.push(n)}}))},_draw_line:function(e,t,i){i||(e=e.map(function(e,t,i){return new BMap.Point(e.bdLon,e.bdLat)}));var n={strokeColor:t.strokeColor||"blue",strokeWeight:t.strokeWeight||2,strokeStyle:t.strokeStyle||"solid",strokeOpacity:t.strokeOpacity||.5,enableEditing:t.enableEditing||!1,enableMassClear:t.enableMassClear||!1},a=new BMap.Polyline(e,n);return this.bdMap.addOverlay(a),a},removeLines:function(){var e=this;this._aPolyline.forEach(function(t,i){e.bdMap.removeOverlay(t)}),this._aPolyline=[]}};e.pipeLineObj=n}(window,$,xxwsWindowObj);