function dateChangeForSearch(){var e=$("#datetimeStart").val(),t=$("#datetimeEnd").val();""!=e&&""!==t?$("#diyDateBtn").addClass("active"):$("#diyDateBtn").removeClass("active")}var trackObj={$items:$(".top .item"),$searchInput:$("#searchInput"),$peopleInput:$("#peopleInput"),tracksIdsArr:[],aPeopleId:[],aPeopleName:[],sCurrentTrackId:"",defaultObj:{status:"1,0",startDate:"",endDate:"",keyword:"",userIds:"",pageNum:1,pageSize:10},querryObj:{status:"1,0",startDate:"",endDate:"",keyword:"",userIds:"",pageNum:1,pageSize:10},activeObj:{status:"1,0",date:"all"},init:function(){var e=this;e.renderActive(),e.bindEvent(),e.bindDateDiyEvent(),e.bindPeopleEvent(),e.initTable()},renderActive:function(e){var t=this;e||(e=t.activeObj);for(var a in e){var i=t.$items.parent("[data-class="+a+"]");i.find(".item").removeClass("active"),i.find('.item[data-value="'+e[a]+'"]').addClass("active"),"date"===a&&("diy"===e[a]?$("#item_diy").addClass("active"):$("#item_diy").removeClass("active"))}},bindEvent:function(){var e=this;e.$items.click(function(){var t=$(this).parent().attr("data-class"),a=$(this).attr("data-value");"date"===t?e.setDate(a):e.querryObj[t]=a;var i={};i[t]=a,e.renderActive(i),e.refreshTable()}),$("#gf_Btn").click(function(){e.refreshTable()}),e.$searchInput.keypress(function(t){t&&13===t.keyCode&&e.refreshTable()}),$("#search_more").click(function(){$(this).hasClass("active")?($(this).removeClass("active"),$(".more_item_wrapper").slideUp()):($(this).addClass("active"),$(".more_item_wrapper").slideDown())}),$("#gf_reset_Btn").click(function(){$.extend(e.querryObj,e.defaultObj),$("#datetimeStart").val(""),$("#datetimeEnd").val(""),$("#diyDateBtn").removeClass("active"),$("#searchInput").val(""),e.initPeopleList(),e.renderActive(),e.refreshTable()}),$("#export_all").click(function(){e.requestOutput(0),1==zhugeSwitch&&zhuge.track("导出巡检记录",{action:"导出全部"})}),$("#export_choice").click(function(){e.requestOutput(2),1==zhugeSwitch&&zhuge.track("导出巡检记录",{action:"导出已选"})}),$("#modal_output").click(function(){e.requestOutput(1,e.sCurrentTrackId),1==zhugeSwitch&&zhuge.track("导出巡检记录",{action:"模态框导出"})})},bindPeopleEvent:function(){var e=this;e.$peopleInput.parent().click(function(){e.requestPeopleTree(),$("#gf_people").modal({})}),$("#btn_selectPeople").click(function(){e.setSelectedPerson(),e.querryObj.userIds=e.aPeopleId.join(","),e.refreshTable()}),$("#clear_people").click(function(){e.initPeopleList(),e.refreshTable()})},bindDateDiyEvent:function(){var e=this,t=$("#datetimeStart"),a=$("#datetimeEnd");t.datetimepicker({format:"yyyy-mm-dd",minView:"month",language:"zh-CN",autoclose:!0}).on("click",function(){t.datetimepicker("setEndDate",a.val())}),a.datetimepicker({format:"yyyy-mm-dd",minView:"month",language:"zh-CN",autoclose:!0}).on("click",function(){a.datetimepicker("setStartDate",t.val())}),$("#diyDateBtn").on("click",function(){var i=t.val(),r=a.val();return i?r?(e.querryObj.startDate=i,e.querryObj.endDate=r,e.renderActive({date:"diy"}),void e.refreshTable()):void xxwsWindowObj.xxwsAlert("请选择结束时间"):void xxwsWindowObj.xxwsAlert("请选择开始时间")})},setDate:function(e){var t=this;switch(e){case"day":var a=(new Date).Format("yyyy-MM-dd");t.querryObj.startDate=a,t.querryObj.endDate=a;break;case"week":var a=new Date;t.querryObj.startDate=a.getWeekStartDate().Format("yyyy-MM-dd"),t.querryObj.endDate=a.getWeekEndDate().Format("yyyy-MM-dd");break;case"month":var a=new Date;t.querryObj.startDate=a.getMonthStartDate().Format("yyyy-MM-dd"),t.querryObj.endDate=a.getMonthEndDate().Format("yyyy-MM-dd");break;default:t.querryObj.startDate="",t.querryObj.endDate=""}},setTracksIdsArr:function(e){var t=this;if(e instanceof Array)t.tracksIdsArr=e.map(function(e){return e.objectId});else{var a=e.objectId,i=t.tracksIdsArr.indexOf(a);-1===i?t.tracksIdsArr.push(a):t.tracksIdsArr.splice(i,1)}},refreshTable:function(){var e=this;e.querryObj.keyword=e.$searchInput.val(),e.querryObj.pageNum="1",$("#gf_table").bootstrapTable("refreshOptions",{pageNumber:+e.querryObj.pageNum,pageSize:+e.querryObj.pageSize,queryParams:function(t){return e.querryObj.pageSize=t.pageSize,e.querryObj.pageNum=t.pageNumber,e.querryObj}})},requestDetails:function(e){var t=this;t.initDetails(),$("#gf_detail").modal({}),$.ajax({type:"GET",url:"/cloudlink-inspection-event/inspectionRecord/web/v1/get",contentType:"application/json",data:{token:lsObj.getLocalStorage("token"),id:e},dataType:"json",success:function(e){if(1!=e.success)return void xxwsWindowObj.xxwsAlert("网络连接出错！code:-1");$("#gf_detail").modal({}),t.renderDetails(e.rows[0])},statusCode:{404:function(){xxwsWindowObj.xxwsAlert("网络连接出错！code:404")}}})},renderDetails:function(e){var t=e.beginTime.slice(0,11),a=t.split("-"),i=new Date(a[0],+a[1]-1,a[2]),r=i.getChinaDay(),n=i.Format("yyyy年MM月dd日")+"&nbsp;&nbsp;&nbsp;星期"+r;$("#gf_detail .beginTime_title").html(n),$("#gf_detail .orgName").html(e.orgName),$("#gf_detail .inspectorName").html(e.inspectorName),$("#gf_detail .eventCount").html(e.eventCount),$("#gf_detail .beginTime").html(e.beginTime),$("#gf_detail .endTime").html(e.endTime),$("#gf_detail .wholeTime").html(e.wholeTime),$("#gf_detail .distance").html((e.distance/1e3).toFixed(2)),this.creteTable(e),setTimeout(function(){$("#details_content").scrollTop(0)},1e3)},creteTable:function(e){$(".middle").html("");var t='<tr><td class="key bg center">序号</td><td class="value bg center">巡线事件类型</td><td class="key bg noPadding center ">事件数量</td> <td class="value bg center">事件详细记录</td></tr>';e.eventContent.length>0?e.eventContent.forEach(function(e,a,i){t+='<tr><td class="center">'+(a+1)+'</td><td  class="center">'+e.parentName+'</td> <td class="center">'+e.eventCount+'</td><td class="center">'+e.eventTypeDesc+"</td> </tr>"}):t+='<tr><td class="center">1</td><td  class="center">无</td> <td class="center"></td><td class="center"></td> </tr>',$(".middle").append(t)},initDetails:function(){$("#gf_detail .beginTime_title").html("--"),$("#gf_detail .orgName").html("--"),$("#gf_detail .inspectorName").html("--"),$("#gf_detail .eventCount").html("--"),$("#gf_detail .beginTime").html("--"),$("#gf_detail .endTime").html("--"),$("#gf_detail .wholeTime").html("--"),$("#gf_detail .distance").html("--"),$("#gf_detail .happen").html(""),$("#gf_detail .none").html("√"),$("#gf_detail .event_desc").html("")},requestOutput:function(e,t){var a=this,i={};if($.extend(i,a.querryObj),delete i.pageSize,delete i.pageNum,i.ids="",1==e&&(i.ids=t),2==e){if(0===a.tracksIdsArr.length)return void xxwsWindowObj.xxwsAlert("请选择需要导出的记录！");i.ids=a.tracksIdsArr.join(",")}commonObj.downloadFile({url:"/cloudlink-inspection-event/inspectionRecord/exportWord?token="+lsObj.getLocalStorage("token"),data:i,method:"post"})},requestPeopleTree:function(){var e=this;e.aAllPeople||$.ajax({type:"GET",url:"/cloudlink-core-framework/user/getOrgUserTree",contentType:"application/json",data:{token:lsObj.getLocalStorage("token"),status:1},dataType:"json",success:function(t){if(1!=t.success)return void xxwsWindowObj.xxwsAlert("网络连接出错！code:-1");e.aAllPeople=t.rows,e.renderPeopleTree(e.aAllPeople)},statusCode:{404:function(){xxwsWindowObj.xxwsAlert("网络连接出错！code:404")}}})},initTable:function(){var e=this;$("#gf_table").bootstrapTable({url:"/cloudlink-inspection-event/inspectionRecord/web/v1/getPageList?token="+lsObj.getLocalStorage("token"),method:"post",toolbar:"#toolbar",toolbarAlign:"left",cache:!1,striped:!0,showHeader:!0,showRefresh:!0,pagination:!0,sidePagination:"server",pageNumber:e.querryObj.pageNum,pageSize:e.querryObj.pageSize,pageList:[10,20,50],search:!1,searchOnEnterKey:!1,sortable:!1,queryParamsType:"",queryParams:function(t){return e.querryObj.pageSize=t.pageSize,e.querryObj.pageNum=t.pageNumber,e.querryObj},columns:[{field:"state",checkbox:!0,align:"center",valign:"middle",visible:!0,sortable:!1,width:"5%"},{field:"name",title:"巡线编号",align:"center",visible:!0,sortable:!0,width:"15%",editable:!0},{field:"beginTime",title:"开始时间",align:"center",visible:!0,sortable:!0,width:"15%",editable:!0},{field:"endTime",title:"结束时间",align:"center",visible:!0,sortable:!0,width:"15%",editable:!0},{field:"inspectorName",title:"巡线人",align:"center",visible:!0,sortable:!0,width:"10%",editable:!0},{field:"wholeTime",title:"巡线总时长",align:"center",visible:!0,sortable:!0,width:"10%",editable:!0},{field:"distance",title:"巡线里程（公里）",align:"center",visible:!0,sortable:!0,width:"10%",editable:!0,formatter:function(e,t,a){return(e/1e3).toFixed(2)}},{field:"eventCount",title:"事件上报",align:"center",visible:!0,sortable:!0,width:"10%",editable:!0},{field:"operate",title:"操作",align:"center",events:e.tabelEventObj(),width:"10%",formatter:e.table_operateFormatter}]}),e.table_bindEvent()},tabelEventObj:function(){var e=this;return{"click .see":function(t,a,i,r){return e.requestDetails(i.objectId),e.sCurrentTrackId=i.objectId,!1},"click .out":function(t,a,i,r){return e.requestOutput(1,i.objectId),!1}}},table_operateFormatter:function(e,t,a){return['<a class="see" href="javascript:void(0)" title="查看">','<i style="margin: 0 5px;" ></i>',"</a>",'<a class="out" href="javascript:void(0)" title="导出">','<i style="margin: 0 5px;"></i>',"</a>"].join("")},table_bindEvent:function(){var e=this;$("#gf_table").on("check.bs.table",function(t,a){e.setTracksIdsArr(a)}).on("uncheck.bs.table",function(t,a){e.setTracksIdsArr(a)}).on("check-all.bs.table",function(t,a){e.setTracksIdsArr(a)}).on("uncheck-all.bs.table",function(t,a){e.tracksIdsArr=[]}).on("post-body.bs.table",function(){e.tracksIdsArr=[]})},renderPeopleTree:function(e){var t=this,a={view:{showLine:!0},data:{key:{name:"treenodename"},simpleData:{enable:!0,pIdKey:"pid"}},check:{enable:!0,chkStyle:"checkbox"}};t.zTree=$.fn.zTree.init($("#people_list"),a,e),t.zTree.expandAll(!0)},setSelectedPerson:function(){var e=this;e.aPeopleId=[],e.aPeopleName=[],e.zTree.getCheckedNodes(!0).forEach(function(t,a){t.isParent||(e.aPeopleId.push(t.id),e.aPeopleName.push(t.treenodename))}),e.$peopleInput.val(e.aPeopleName.join("，")),$("#gf_people").modal("hide")},initPeopleList:function(){var e=this;e.aPeopleId=[],e.aPeopleName=[],e.$peopleInput.val(""),e.querryObj.userIds="",e.zTree&&e.zTree.checkAllNodes(!1)}};trackObj.init();