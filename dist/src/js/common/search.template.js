!function(){function e(e){this.eventsMap={"click .search_more":"e_toogleMore","click .item":"e_clickItem","click .gf_reset_Btn":"e_resetAndSearch","click .search_Btn":"e_searchByKeyword","keypress .searchInput":"e_searchByKeywordOnKeypress"},a++,this.init(e)}var t=function(t){return t||alert("请传入参数！"),new e(t)},a=0;e.prototype={constructor:e,defaultParams:{wrapper:"",itemArr:[],queryObj:null,cbRender:null,callback:function(e){}},init:function(e){var t=this;this.params=$.extend({},this.defaultParams,e,!0),this.wrapper=$(this.params.wrapper),this.queryObj=this.params.queryObj,this.defaultQuerryObj=$.extend({},this.queryObj,!0),this.callback=function(){t.queryObj.keyword=t.wrapper.find(".searchInput").val(),t.params.callback(t.queryObj)},this.class="search_index_"+a;var i=this.template();this.render(i),this.bindEvent(),this.renderActive(this.queryObj)},renderActive:function(e){var t=this;for(var a in e){var i=t.wrapper.find(".item").parent("[data-class="+a+"]");i.not(".item2_id").find(".item").removeClass("active");var s=i.find('.item[data-value="'+e[a]+'"]');if(s.addClass("active").siblings().removeClass("active"),s.parent().hasClass("item2_id")){s.parent().show().siblings().hide();var r={};r[a]=s.parent().attr("data-father"),t.renderActive(r)}else 0===s.find("i").length&&i.filter(".item2_id").hide();"date"===a&&("diy"===e[a]?$("#item_diy").addClass("active"):$("#item_diy").removeClass("active"))}t.params.cbRender&&t.params.cbRender()},bindEvent:function(){this.initializeOrdinaryEvent(this.eventsMap),this.isDatePicker&&this.bindDateDiyEvent()},bindDateDiyEvent:function(){var e=this,t=this.wrapper.find(".datetimeStart"),a=this.wrapper.find(".datetimeEnd"),i=this.wrapper.find(".diyDateBtn"),s=function(){var e=t.val(),s=a.val();e&&s?i.addClass("active"):i.removeClass("active")};t.datetimepicker({format:"yyyy-mm-dd",minView:"month",language:"zh-CN",autoclose:!0}).on("change",function(){s()}).on("click",function(){t.datetimepicker("setEndDate",a.val())}),a.datetimepicker({format:"yyyy-mm-dd",minView:"month",language:"zh-CN",autoclose:!0}).on("change",function(){s()}).on("click",function(){a.datetimepicker("setStartDate",t.val())}),i.on("click",function(){var i=t.val(),s=a.val();return i?s?(e.queryObj.startDate=i,e.queryObj.endDate=s,e.queryObj.date="diy",e.renderActive({date:"diy"}),void e.callback(e.queryObj)):void(window.xxwsWindowObj?xxwsWindowObj.xxwsAlert("请选择结束时间"):alert("请选择结束时间")):void(window.xxwsWindowObj?xxwsWindowObj.xxwsAlert("请选择开始时间"):alert("请选择开始时间"))})},render:function(e){this.wrapper.prepend(e)},template:function(){var e="",t=this;return this.params.itemArr.forEach(function(a){e+=t.createItemLine(a)}),['<div class="container-fluid search_item_wrapper '+this.class+'">','<div class="top">','<div class="row search_title">',this.createTopLeftTemplate(this.params.topItem),this.topRightTemplate(),"</div>",'<div class="more_item_wrapper">','<div class="sub_wrapper">','<b class="up_triangle"><i></i></b>','<div class="son_wrapper">',e,"</div>","</div>","</div>","</div>","</div>"].join("")},createItemLine:function(e){if("object"==typeof e){var t=e.title,a=(e.items,function(e){var t=e.title,a=e.items,i="",s="";return"string"==typeof a?s+=a:a.forEach(function(e,a){if("string"==typeof e&&(i+=e),"object"==typeof e)if(e.children){i+='<span class="item"  data-subvalue="'+e.subValue+'" data-value="'+e.value+'">'+e.name+'<i class="glyphicon glyphicon-menu-down"></i></span>';var r='<div class="item2_id" data-father="'+e.value+'" data-class="'+t.value+'"><b> ( </b>';e.children.forEach(function(e){r+='<span class="item" data-value="'+e.value+'">'+e.name+"</span>"}),r+="<b> ) </b></div>",s+=r}else i+='<span class="item" data-value="'+e.value+'">'+e.name+"</span>"}),{item1:i,item2:s}}(e));return['<div class="line">','<div class="title">'+t.name+"</div>",'<div class="item_box">','<div class="item1" data-class="'+t.value+'">',a.item1,"</div>",a.item2?'<div class="item2">'+a.item2+"</div>":"","</div>","</div>"].join("")}if("date"===e)return this.isDatePicker=!0,this.dateLineTemplate()},topRightTemplate:function(){return['<div class="col-lg-6 col-xs-12 right_wrapper">','<div class="search_btn_right">','<div class="search_reset gf_reset_Btn" id="">重置</div>','<div class="more search_more" id="">高级搜索</div>',"</div>",'<div class="search_wrapper">','<div class="input_wrapper">','<input class="searchInput"  type="text" placeholder="输入关键字搜索">',"</div>",'<span class="mybtn search_Btn" id="">确定</span>',"</div>","</div>"].join("")},createTopLeftTemplate:function(e){for(var t='<div class="col-lg-6 col-xs-12 btn_wrapper">',a=e.widthRate.length,i=0;i<a;i++)t+=this._createTopItems(e.data[i],e.widthRate[i]);return t+="</div>"},_createTopItems:function(e,t){var a="";if("object"==typeof e){a+='<div class="col-xs-'+t+'" data-class="'+e.title.value+'">';var i=Math.floor(12/e.items.length);return i=i<1?1:i,i=i>4?4:i,a+=e.items.map(function(e,t){return'<div class="item col-xs-'+i+'" data-value="'+e.value+'">'+e.name+"</div>"}).join(""),a+="</div>"}return"date"===e?['<div class="col-xs-'+t+'" data-class="date">','<div class="item col-xs-4" data-value="all">不限</div>','<div class="item col-xs-4" data-value="day">今天</div>','<div class="item col-xs-4" data-value="week">本周</div>',"</div>"].join(""):'<div class="col-xs-'+t+'">'+e+"</div>"},dateLineTemplate:function(){return['<div class="line">','<div class="title">时间</div>','<div class="item_box">','<div class="item1" data-class="date">','<span class="item" data-value="all">不限</span>','<span class="item" data-value="day">今日</span>','<span class="item" data-value="week">本周</span>','<span class="item" data-value="month">本月</span>',this._DIYDateTemplate(),"</div>","</div>","</div>"].join("")},_DIYDateTemplate:function(){return['<span class="date">','<span id="item_diy" class="diy">自定义：</span>','<input size="16" type="text"   placeholder="选择起始时间" readonly class="form_datetime datetimeStart">',"<span>&nbsp;&nbsp;至&nbsp;&nbsp;</span>",'<input size="16" type="text"   placeholder="选择结束时间" readonly class="form_datetime datetimeEnd">','<span class="itemBtn diyDateBtn"  data-value="diy">确定</span>',"</span>"].join("")},initializeOrdinaryEvent:function(e){this._scanEventsMap(e,!0)},_scanEventsMap:function(e,t){var a=/^(\S+)\s*(.*)$/,i=t?"on":"off";for(var s in e)if(e.hasOwnProperty(s)){"string"==typeof e[s]&&(e[s]=this[e[s]].bind(this));var r=s.match(a);this.wrapper[i](r[1],r[2],e[s])}},e_searchByKeywordOnKeypress:function(e){e&&13===e.keyCode&&this.e_searchByKeyword()},e_searchByKeyword:function(){this.callback()},e_resetAndSearch:function(e){var t=this;$.extend(t.queryObj,t.defaultQuerryObj),t.wrapper.find(".datetimeStart").val(""),t.wrapper.find(".datetimeEnd").val(""),t.wrapper.find(".diyDateBtn").removeClass("active"),t.wrapper.find(".searchInput").val(""),t.renderActive(t.queryObj),this.callback(this.queryObj)},e_toogleMore:function(e){var t=e.currentTarget;$(t).hasClass("active")?($(t).removeClass("active"),this.wrapper.find(".more_item_wrapper").slideUp()):($(t).addClass("active"),this.wrapper.find(".more_item_wrapper").slideDown())},e_clickItem:function(e){var t=e.currentTarget,a=$(t).parent().attr("data-class"),i=$(t).attr("data-subvalue")||$(t).attr("data-value");"date"===a&&this.setDate(i),this.queryObj[a]=i;var s={};s[a]=i,this.renderActive(s),this.callback()},setDate:function(e){var t=this;switch(e){case"day":var a=(new Date).Format("yyyy-MM-dd");t.queryObj.startDate=a,t.queryObj.endDate=a;break;case"week":var a=new Date;t.queryObj.startDate=a.getWeekStartDate().Format("yyyy-MM-dd"),t.queryObj.endDate=a.getWeekEndDate().Format("yyyy-MM-dd");break;case"month":var a=new Date;t.queryObj.startDate=a.getMonthStartDate().Format("yyyy-MM-dd"),t.queryObj.endDate=a.getMonthEndDate().Format("yyyy-MM-dd");break;default:t.queryObj.startDate="",t.queryObj.endDate=""}}},window.createSearhTemplate=t,function(){Date.prototype.Format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"H+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var a in t)new RegExp("("+a+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[a]:("00"+t[a]).substr((""+t[a]).length)));return e},Date.prototype.getWeekStartDate=function(){var e=this,t=e.getDay();return t=0===t?7:t,e.setDate(e.getDate()-(t-1)),e},Date.prototype.getWeekEndDate=function(){var e=this,t=e.getDay();return t=0===t?7:t,e.setDate(e.getDate()+(7-t)),e},Date.prototype.getMonthStartDate=function(){var e=this;return e.setDate(1),e},Date.prototype.getMonthEndDate=function(){var e=this,t=e.getMonth();return e.setMonth(t+1),e.setDate(1),e.setDate(0),e},Date.prototype.getChinaDay=function(){var e=["日","一","二","三","四","五","六"];return e[this.getDay()]}}()}();