function checkLen(e){var a=$(e).val().length;a>199&&$(e).val($(e).val().substring(0,200));var t=200-a;t<0&&(t=0),$(e).next(".text_num").text("("+t+"字)")}var primarySearchObj={$items:$(".top .item"),$primarySearchInput:$("#primarySearchInput"),defaultObj:{keyword:"",pageNum:1,pageSize:10},querryObj:{keyword:"",pageNum:1,pageSize:10},init:function(){this.bindEvent()},bindEvent:function(){var e=this;$("#cf_Btn").click(function(){var a=$(this).parent().find("input").val().trim();e.querryObj.keyword=a,e.refreshTable()}),e.$primarySearchInput.keypress(function(a){a&&13===a.keyCode&&e.refreshTable()}),$("#cf_reset_Btn").click(function(){$.extend(e.querryObj,e.defaultObj),e.$primarySearchInput.val(""),e.refreshTable()})},refreshTable:function(){var e=this;e.querryObj.keyword=e.$primarySearchInput.val().trim(),e.$primarySearchInput.val(e.querryObj.keyword),e.querryObj.pageNum=1,$("#kilometerList").bootstrapTable("removeAll"),$("#kilometerList").bootstrapTable("refreshOptions",{pageNumber:+e.querryObj.pageNum,pageSize:+e.querryObj.pageSize,queryParams:function(a){return e.querryObj.pageSize=a.pageSize,e.querryObj.pageNum=a.pageNumber,e.querryObj}})}},clearSearch={resetSearch:function(){$.extend(searchObj.querryObj,searchObj.defaultObj),searchObj.$searchInput.val(""),$("select[name=quartersList]").val(""),searchObj.renderActive(),searchObj.refreshTable()}},areaTable={$NewlyBuiltAreaBtn:$("#NewlyBuiltArea"),$creatModal:$("#newCreatUserModal"),$editModal:$("#editAreaModal"),$lookModal:$("#kilometerDetailsModal"),$rangeModal:$("#viewDetailModal"),$deleteBtn:$(".deleteSubmit"),_regionId:null,_regionName:null,_flag:!0,_isModify:null,objectId:null,init:function(){var e=this;e.getTable(),e.$NewlyBuiltAreaBtn.click(function(){areaTable.creatFormReset(),$("#newCreatUserModal").removeData("userData"),$("#newCreatUserModal").modal(),$("#newCreatUserModal input[name=createUserName]").val(JSON.parse(lsObj.getLocalStorage("userBo")).userName)}),$(".creatSubmit").click(function(){if(1==e._flag){var a=e.formVerification($(".regionMainAdd"));if(0==a)return;var t={tip:"您是否确定创建片区？",name_title:"提示",name_cancel:"取消",name_confirm:"确定",isCancelBtnShow:!0,callBack:function(){e.addArea(a)}};xxwsWindowObj.xxwsAlert(t)}}),$("#areaRange").click(function(){choiceFrameObj.$choiceAreaFrame.modal(),choiceFrameObj._areaChoiceData=$("#newCreatUserModal").data("userData"),e._isModify=!1}),$(".areaChoiceTrueBtn").click(function(){var a=choiceFrameObj.getAreaChoiceData();choiceFrameObj.$choiceAreaFrame.modal("hide");for(var t=[],i=0,o=0;o<a.length;o++)i+=a[o].choiceNumber,t.push(a[o].residential+"("+a[o].choiceNumber+"户)");1==e._isModify?($("#editAreaModal").data("userData",a),$("#editAreaModal").find("input[name=households]").val(0==i?"":i),$("#editAreaModal").find("textarea[name=sphere]").val(t.join("，"))):($("#newCreatUserModal").data("userData",a),$("#newCreatUserModal").find("input[name=households]").val(0==i?"":i),$("#newCreatUserModal").find("textarea[name=sphere]").val(t.join("，")))}),$(".deleteSubmit").click(function(){var a={tip:"您是否确定删除该片区？",name_title:"提示",name_cancel:"取消",name_confirm:"确定",isCancelBtnShow:!0,callBack:function(){e.deleteArea(e._objectId)}};xxwsWindowObj.xxwsAlert(a)}),$(".lookUserListBtn").click(function(){null==e._regionName||""==e._regionName||void 0==e._regionName?xxwsWindowObj.xxwsAlert("无详细信息"):(choiceFrameObj._regionId=e._regionId,$(".areaRangeName .areaName").text(e._regionName),$("#viewDetailFrame").modal())}),$(".saveSubmit").click(function(){if(1==e._flag){var a=e.formVerification($(".regionMainEdit"));if(0==a)return;a.objectId=e._objectId;var t={tip:"您是否确定修改该片区？",name_title:"提示",name_cancel:"取消",name_confirm:"确定",isCancelBtnShow:!0,callBack:function(){e.regionEdit(a)}};xxwsWindowObj.xxwsAlert(t)}}),$("#editAreaRange").click(function(){choiceFrameObj.$choiceAreaFrame.modal(),choiceFrameObj._areaChoiceData=$("#editAreaModal").data("userData"),e._isModify=!0}),e.$lookModal.on("shown.bs.modal",function(a){areaTable.getAreaDetails(e._objectId)}),e.$rangeModal.on("shown.bs.modal",function(a){searchObj.querryObj.regionId=e._objectId,searchObj.defaultObj.regionId=e._objectId,$(".areaName").text(e._regionName),searchObj.refreshTable()}),e.$editModal.on("shown.bs.modal",function(a){areaTable.getEditDetails(e._objectId)})},addArea:function(e){var a=this;a._flag=!1,e.userFileIdVoSet=$("#newCreatUserModal").data("userData"),$.ajax({type:"POST",url:"/cloudlink-inspection-event/region/save?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify(e),dataType:"json",success:function(e){if(1==e.success){var t={tip:"新增片区成功",name_title:"提示",name_cancel:"取消",name_confirm:"确定",isCancelBtnShow:!1,callBack:function(){window.location.reload()}};xxwsWindowObj.xxwsAlert(t)}else"XE03003"==e.code?xxwsWindowObj.xxwsAlert("片区名称已存在"):xxwsWindowObj.xxwsAlert("新增片区失败");a.again()},error:function(){xxwsWindowObj.xxwsAlert("新增片区失败"),a.again()}})},getAreaDetails:function(e){var a=this,t={objectId:e};a._regionName=null,$.ajax({type:"GET",url:"/cloudlink-inspection-event/commonData/region/get?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:t,dataType:"json",success:function(e){1==e.success?(a._regionName=e.rows[0].regionName,a._regionId=e.rows[0].objectId,localStorage.setItem("regionName","name"),$("#kilometerDetailsModal .regionName").text(e.rows[0].regionName),$("#kilometerDetailsModal .createUserName").text(e.rows[0].createUserName),$("#kilometerDetailsModal .households").text(0==e.rows[0].households?"":e.rows[0].households),$("#kilometerDetailsModal .sphere").text(e.rows[0].sphere),$("#kilometerDetailsModal .remark").text(e.rows[0].remark),e.rows[0].createUserId==JSON.parse(lsObj.getLocalStorage("userBo")).objectId?a.$deleteBtn.show():a.$deleteBtn.hide()):xxwsWindowObj.xxwsAlert("获取片区详情失败")},error:function(){xxwsWindowObj.xxwsAlert("获取片区详情失败")}})},deleteArea:function(e){var a={objectId:e};$.ajax({type:"POST",url:"/cloudlink-inspection-event/region/delete?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify(a),dataType:"json",success:function(e,a){if(1==e.success){var t={tip:"片区删除成功！",name_title:"提示",name_cancel:"取消",name_confirm:"确定",isCancelBtnShow:!1,callBack:function(){window.location.reload()}};xxwsWindowObj.xxwsAlert(t)}else 410==e.code?xxwsWindowObj.xxwsAlert("您没有删除权限！"):xxwsWindowObj.xxwsAlert("片区删除失败！")}})},getEditDetails:function(e){var a={objectId:e};$.ajax({type:"GET",url:"/cloudlink-inspection-event/commonData/region/get?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:a,dataType:"json",success:function(e){1==e.success?($("#editAreaModal").find("input[name=regionName]").val(e.rows[0].regionName),$("#editAreaModal").find("input[name=createUserName]").val(e.rows[0].createUserName),$("#editAreaModal").find("input[name=households]").val(0==e.rows[0].households?"":e.rows[0].households),$("#editAreaModal").find("textarea[name=sphere]").val(e.rows[0].sphere),$("#editAreaModal").find("textarea[name=remark]").val(e.rows[0].remark),$("#editAreaModal").data("userData",e.rows[0].userFileIdVoSet)):xxwsWindowObj.xxwsAlert("获取编辑片区失败")},error:function(){xxwsWindowObj.xxwsAlert("获取编辑片区失败")}})},regionEdit:function(e){var a=this;a._flag=!1,e.userFileIdVoSet=$("#editAreaModal").data("userData"),$.ajax({type:"POST",url:"/cloudlink-inspection-event/region/update?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify(e),dataType:"json",success:function(e){if(1==e.success){var t={tip:"修改片区成功",name_title:"提示",name_confirm:"确定",isCancelBtnShow:!1,callBack:function(){window.location.reload()}};xxwsWindowObj.xxwsAlert(t)}else"XE03003"==e.code?xxwsWindowObj.xxwsAlert("片区名称已存在"):xxwsWindowObj.xxwsAlert("修改片区失败");a.again()},error:function(){xxwsWindowObj.xxwsAlert("修改片区失败"),a.again()}}),$("#newCreatUserModal").modal("hide")},detailFormReset:function(){$("#kilometerDetailsModal p").text("")},editFormReset:function(){var e=this;e.$editModal.find("input").val(""),e.$editModal.find("textarea").val(""),$("#editAreaModal").data("userData",null)},creatFormReset:function(){var e=this;e.$creatModal.find("input").val(""),e.$creatModal.find("textarea").val("")},getTable:function(){var e=this;$("#kilometerList").bootstrapTable({url:"/cloudlink-inspection-event/commonData/region/getPageList?token="+lsObj.getLocalStorage("token"),method:"post",toolbar:"#toolbar",toolbarAlign:"left",cache:!1,showHeader:!0,showRefresh:!0,pagination:!0,striped:!0,sidePagination:"server",pageNumber:1,pageSize:10,pageList:[10,20,50],search:!1,searchOnEnterKey:!1,queryParamsType:"",queryParams:function(e){return primarySearchObj.defaultObj.pageSize=e.pageSize,primarySearchObj.defaultObj.pageNum=e.pageNumber,primarySearchObj.defaultObj},onDblClickRow:function(a){return e._objectId=a.objectId,e.getAreaDetails(a.objectId),areaTable.detailFormReset(),e.$lookModal.modal(),!1},columns:[{field:"state",checkbox:!0,align:"center",visible:!0,sortable:!1,width:"4%"},{field:"regionName",title:"片区名称",align:"center",visible:!0,sortable:!1,width:"10%",editable:!0},{field:"sphere",title:"片区范围",align:"center",visible:!0,sortable:!1,width:"18%",editable:!0},{field:"households",title:"片区总户数",align:"center",visible:!0,sortable:!1,width:"4%",editable:!0,formatter:function(e,a,t){return 0==e?"":e}},{field:"createUserName",title:"创建人",align:"center",visible:!0,sortable:!1,width:"4%"},{field:"operate",title:"操作",align:"center",events:e.tableEvent(),width:"10%",formatter:e.tableOperation}]})},tableOperation:function(e,a,t){var i=null,o=null,r=JSON.parse(lsObj.getLocalStorage("userBo")).objectId;return a.createUserId==r?(i="modify",o="delete"):(i="modify_end",o="delete_end"),['<a class="look" href="javascript:void(0)" title="查看">',"<i></i>","</a>",'<a class="range" href="javascript:void(0)" title="范围明细">',"<i></i>","</a>",'<a class="'+i+'" href="javascript:void(0)" title="编辑">',"<i></i>","</a>",'<a class="'+o+'" href="javascript:void(0)" title="删除">',"<i></i>","</a>"].join("")},tableEvent:function(){var e=this;return{"click .look":function(a,t,i,o){return e._objectId=i.objectId,e.detailFormReset(),e.$deleteBtn.hide(),e.$lookModal.modal(),!1},"click .range":function(e,a,t,i){return choiceFrameObj._regionId=t.objectId,$(".areaRangeName .areaName").text(t.regionName),$("#viewDetailFrame").modal(),!1},"click .modify":function(a,t,i,o){return e._objectId=i.objectId,e.editFormReset(),e.$editModal.modal(),!1},"click .delete":function(a,t,i,o){var r={tip:"您是否删除片区？",name_title:"提示",name_cancel:"取消",name_confirm:"确定",isCancelBtnShow:!0,callBack:function(){e.deleteArea(i.objectId)}};return xxwsWindowObj.xxwsAlert(r),!1}}},formVerification:function(e){var a=e.find("input[name=regionName]").val().trim(),t=(e.find("input[name=createUserName]").val().trim(),e.find("input[name=households]").val().trim()),i=e.find("textarea[name=sphere]").val().trim(),o=e.find("textarea[name=remark]").val().trim();return""==a||null==a?(xxwsWindowObj.xxwsAlert("请输入片区名称"),!1):a.length>25?(xxwsWindowObj.xxwsAlert("片区名称过长，填写上限为25个字"),!1):""==i||null==i?(xxwsWindowObj.xxwsAlert("片区范围不能为空"),!1):{regionName:a,sphere:i,households:t,remark:o}},getQuartersList:function(e){var a={regionId:e,pageNum:1,pageSize:1e4};$.ajax({type:"POST",url:"/cloudlink-inspection-event/commonData/residentialName/getPageList?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify(a),dataType:"json",success:function(e){if(1==e.success){for(var a=e.rows,t='<option value="">全部（小区/院/村）</option>',i=0;i<a.length;i++)t+='<option value="'+a[i].residential+'">'+a[i].residential+"</option>";$("select[name=quartersList]").html(t)}}})},again:function(){this._flag=!0}},exportFileObj={$exportAll:$("#export_all"),$exportChoice:$("#export_choice"),expoerObj:{keyword:"",idList:[]},init:function(){var e=this;this.$exportAll.click(function(){e.expoerObj.idList=[],e.expoerCondition()}),this.$exportChoice.click(function(){var a=$("#kilometerList").bootstrapTable("getSelections");if(e.expoerObj.idList=[],0==a.length)return xxwsWindowObj.xxwsAlert("请选择你需要导出的片区！"),!1;for(var t=0;t<a.length;t++)e.expoerObj.idList.push(a[t].objectId);e.expoerCondition()})},expoerCondition:function(){$.extend(this.expoerObj,primarySearchObj.querryObj),this.expoerData(this.expoerObj)},expoerData:function(e){var a={url:"/cloudlink-inspection-event/commonData/region/export?token="+lsObj.getLocalStorage("token"),data:e,method:"post"};this.downLoadFile(a)},downLoadFile:function(e){var a=$.extend(!0,{method:"post"},e),t=$('<iframe id="down-file-iframe" />'),i=$('<form target="down-file-iframe" method="'+a.method+'" />');i.attr("action",a.url);for(var o in a.data)i.append('<input type="hidden" name="'+o+'" value="'+a.data[o]+'" />');t.append(i),$(document.body).append(t),i[0].submit(),t.remove()}};$(function(){$("input").val(""),primarySearchObj.init(),areaTable.init(),exportFileObj.init(),$(document).on("show.bs.modal",".modal",function(e){var a=1040+10*$(".modal:visible").length;$(this).css("z-index",a),setTimeout(function(){$(".modal-backdrop").not(".modal-stack").css("z-index",a-1).addClass("modal-stack")},0)}),$(document).on("hidden.bs.modal",".modal",function(e){$(".modal:visible").length>0&&$("body").addClass("modal-open")})});