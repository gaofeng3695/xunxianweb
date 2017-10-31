/*
** Created By GF On 2017.10.10
** 为地图添加管线图层
** @使用方法 ：pipeLineObj.init(oBdMap); 入参 oBdMap : 百度地图的实例对象
** @其他方法 ：
        1.pipeLineObj.removeLines(); 清除地图的管线图层
        2.pipeLineObj.drawLines(); 重新添加地图的管线图层
*/


(function(window,$,xxwsWindowObj){ //依赖pipelineDetailModal，模态框实例
    var pipeLineObj = {
        _aLineData : null,
        _aPolyline : [],
        bdMap : null,
        init : function(oBdMap){
            if(!oBdMap){
                alert('请传入百度地图的实例对象');
                return;
            }
            this.bdMap = oBdMap;
            this._requestData();
        },
        _requestData : function(){
            var that = this;
            if(this._aLineData){
                that.drawLines();
                return;
            }
            $.ajax({
                type: "POST",
                url: "/cloudlink-inspection-event/commonData/pipemaplinedetail/getPageList?token=" + lsObj.getLocalStorage('token'),
                contentType: "application/json",
                data: JSON.stringify({
                    "pipeNetworkUsed" : '1',
                    "pageNum": 1,
                    "pageSize": 200
                }),
                dataType: "json",
                success: function(data) {
                    if (data.success == 1) {
                        that._aLineData = data.rows;
                        that.drawLines();
                    } else {
                        xxwsWindowObj.xxwsAlert("服务异常，请稍候重试");
                    }
                }
            });
        },

        drawLines: function() {
            var that = this;
            var map = this.bdMap;
            var aline = this._aLineData;
            if (!aline || aline.length === 0 || this._aPolyline.length > 0) {
                return;
            }
            this._aPolyline = [];
            aline.forEach(function(item, index) {
                if (!item.line || item.line.length === 0) { //没有坐标点就返回
                    return;
                }
                if (item.line.length > 1) { //含有两个坐标点以上，画线
                    var topline = that._draw_line(item.line, {
                        strokeColor: item.pipeColor,
                        strokeWeight: item.pipeWeight,
                        strokeStyle: item.pipeStyle, //dashed
                        strokeOpacity: 1,
                        enableEditing: that.isEditable || false,
                        enableMassClear : false,
                    });
                    topline.addEventListener('click',function(){
                        //alert(item.objectId);
                        if(window.pipelineDetailModal){   //管线详情模态框vue实例
                            pipelineDetailModal.$emit('setLine_toThow', item);
                        }
                    });
                    that._aPolyline.push(topline);
                }
            });
            // map.map.setViewport(aPoints, { //设定视野范围
            //     enableAnimation: true,
            //     margins: [0, 0, 0, 0],
            // });
        },
        _draw_line: function (aPoints, oStyle, isBdPoint) {
            // aPoints : {
            //     bdLon : 123,
            //     bdLat : 123
            // }
            if (!isBdPoint) {
                aPoints = aPoints.map(function (item, index, arr) {
                    return new BMap.Point(item.bdLon, item.bdLat);
                });
            }
            var obj = {
                strokeColor: oStyle.strokeColor || "blue",
                strokeWeight: oStyle.strokeWeight || 2,
                strokeStyle: oStyle.strokeStyle || 'solid', //dashed
                strokeOpacity: oStyle.strokeOpacity || 0.5,
                enableEditing: oStyle.enableEditing || false,
                enableMassClear : oStyle.enableMassClear || false,
            };
            //console.log(obj)
            var polyline = new BMap.Polyline(aPoints, obj);
            this.bdMap.addOverlay(polyline);
            return polyline;
        },
        removeLines : function(){
            var that = this;
            this._aPolyline.forEach(function(item,index){
                that.bdMap.removeOverlay(item);
            });
            this._aPolyline = [];
        }
    };
    window.pipeLineObj = pipeLineObj;
})(window,$,xxwsWindowObj);

