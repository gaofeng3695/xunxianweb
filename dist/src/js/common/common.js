!function(){Date.prototype.Format=function(t){var e={"M+":this.getMonth()+1,"d+":this.getDate(),"H+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var a in e)new RegExp("("+a+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[a]:("00"+e[a]).substr((""+e[a]).length)));return t},Date.prototype.getWeekStartDate=function(){var t=this,e=t.getDay();return e=0===e?7:e,t.setDate(t.getDate()-(e-1)),t},Date.prototype.getWeekEndDate=function(){var t=this,e=t.getDay();return e=0===e?7:e,t.setDate(t.getDate()+(7-e)),t},Date.prototype.getMonthStartDate=function(){var t=this;return t.setDate(1),t},Date.prototype.getMonthEndDate=function(){var t=this,e=t.getMonth();return t.setMonth(e+1),t.setDate(1),t.setDate(0),t},Date.prototype.getChinaDay=function(){var t=["日","一","二","三","四","五","六"];return t[this.getDay()]}}();var commonObj=function(){return{downloadFile:function(t){var e=$.extend(!0,{method:"post"},t),a=$('<iframe id="down-file-iframe" />'),n=$('<form target="down-file-iframe" method="'+e.method+'" />');n.attr("action",e.url);for(var o in e.data)n.append('<input type="hidden" name="'+o+'" value="'+e.data[o]+'" />');a.append(n),$(document.body).append(a),n[0].submit(),a.remove()}}}();