function checkLen(e){var t=$(e).val().length;t>199&&$(e).val($(e).val().substring(0,200));var i=200-t;i<0&&(i=0),$(e).next(".text_num").text("("+i+"字)")}function dateChangeForSearch(){var e=$("#historydateStart").val(),t=$("#historydateEnd").val();""!=e&&""!==t?$("#diyDateBtn").addClass("active"):$("#diyDateBtn").removeClass("active")}function previewPicture(e){viewPicObj.viewPic(e)}var searchObj={$items:$(".top .item"),$searchInput:$("#searchInput"),defaultObj:{regionId:"",residential:"",enterhomeUserTypeCode:"",userStatusCode:"",keyword:"",pageNum:1,pageSize:10},querryObj:{regionId:"",residential:"",enterhomeUserTypeCode:"",userStatusCode:"",keyword:"",pageNum:1,pageSize:10},activeObj:{enterhomeUserTypeCode:"",userStatusCode:""},init:function(){this.renderActive(),this.bindEvent(),this.bindDateDiyEvent(),farmeObj.getQuartersList(""),farmeObj.getAreaList(!0)},renderActive:function(e){var t=this;e||(e=t.activeObj);for(var i in e){var a=t.$items.parent("[data-class="+i+"]");a.find(".item").removeClass("active"),a.find('.item[data-value="'+e[i]+'"]').addClass("active")}},bindEvent:function(){var e=this;e.$items.click(function(){var t=$(this).parent().attr("data-class"),i=$(this).attr("data-value");e.querryObj[t]=i;var a={};a[t]=i,e.renderActive(a),e.refreshTable()}),$("select[name=areaList]").change(function(){$("select[name=quartersList]").html('<option value="">全部（小区/院/村）</option>'),e.querryObj.regionId=$(this).val(),e.querryObj.residential="",e.refreshTable(),farmeObj.getQuartersList($(this).val())}),$("select[name=quartersList]").change(function(){e.querryObj.residential=$(this).val(),e.refreshTable()}),$("#gf_Btn").click(function(){var t=$(this).parent().find("input").val().trim();e.querryObj.keyword=t,e.refreshTable()}),e.$searchInput.keypress(function(t){t&&13===t.keyCode&&e.refreshTable()}),$("#search_more").click(function(){$(this).hasClass("active")?($(this).removeClass("active"),$(".more_item_wrapper").slideUp()):($(this).addClass("active"),$(".more_item_wrapper").slideDown())}),$("#gf_reset_Btn").click(function(){$.extend(e.querryObj,e.defaultObj),$("select[name=areaList]").val(""),farmeObj.getQuartersList(""),e.$searchInput.val(""),e.renderActive(),e.refreshTable()})},refreshTable:function(){var e=this;e.querryObj.keyword=e.$searchInput.val().trim(),e.$searchInput.val(e.querryObj.keyword),e.querryObj.pageNum="1",$("#userList").bootstrapTable("removeAll"),$("#userList").bootstrapTable("refreshOptions",{pageNumber:+e.querryObj.pageNum,pageSize:+e.querryObj.pageSize,queryParams:function(t){return e.querryObj.pageSize=t.pageSize,e.querryObj.pageNum=t.pageNumber,e.querryObj}})},bindDateDiyEvent:function(){$("#historydateStart").datetimepicker({format:"yyyy-mm-dd",minView:"month",language:"zh-CN",autoclose:!0}).on("click",function(){$("#historydateStart").datetimepicker("setEndDate",$("#historydateEnd").val())}),$("#historydateEnd").datetimepicker({format:"yyyy-mm-dd",minView:"month",language:"zh-CN",autoclose:!0}).on("click",function(){$("#historydateEnd").datetimepicker("setStartDate",$("#historydateStart").val())}),$(document).on("click",".dateTimeAdd",function(){$(this).datetimepicker({format:"yyyy-mm-dd",minView:"month",language:"zh-CN",autoclose:!0,endDate:new Date}),$(this).datetimepicker("show").on("changeDate",function(){$(this).datetimepicker("hide")})})}},userTable={$addBtn:$("#addUserBtn"),$importBtn:$("#importBtn"),$deleteBtn:$("#deleteBtn"),init:function(){var e=this;e.getTable(),e.$addBtn.click(function(){farmeObj.$addUserFrame.find(".modal-header span").text("新建用户"),farmeObj.$addUserFrame.find(".modal-footer .addSubmit").show(),farmeObj.$addUserFrame.find(".modal-footer .modifySubmit").hide(),farmeObj.formReset(),farmeObj.gasText(1),farmeObj._isModify=!1,farmeObj.$addUserFrame.find("input[name=createUserName]").val(JSON.parse(lsObj.getLocalStorage("userBo")).userName),farmeObj.$addUserFrame.modal()}),e.$deleteBtn.click(function(){var e=$("#userList").bootstrapTable("getSelections"),t=[];if(0==e.length)return xxwsWindowObj.xxwsAlert("请选择你需要删除的用户！"),!1;for(var i=0;i<e.length;i++)t.push(e[i].objectId);var a={tip:"慎重！此删除操作会导致所选用户的相关数据彻底移除，您是否确认删除该用户？",name_title:"提示",name_cancel:"取消",name_confirm:"确定",isCancelBtnShow:!0,callBack:function(){farmeObj.deleteMoreUser(t)}};xxwsWindowObj.xxwsAlert(a)}),e.$importBtn.click(function(){importObj.$batchImportFrame.modal(),$(".batchImportInput").val("")})},getTable:function(){var e=this;$("#userList").bootstrapTable({url:"/cloudlink-inspection-event/commonData/userArchive/getPageList?token="+lsObj.getLocalStorage("token"),method:"post",toolbar:"#toolbar",toolbarAlign:"left",cache:!1,showHeader:!0,showRefresh:!0,pagination:!0,striped:!0,sidePagination:"server",pageNumber:1,pageSize:10,pageList:[10,20,50],search:!1,searchOnEnterKey:!1,queryParamsType:"",queryParams:function(e){return searchObj.defaultObj.pageSize=e.pageSize,searchObj.defaultObj.pageNum=e.pageNumber,searchObj.defaultObj},onLoadSuccess:function(e){e.success},onDblClickRow:function(e){return farmeObj._userId=e.objectId,farmeObj.detailsReset(),farmeObj.$usreDetailsFrame.modal(),!1},columns:[{field:"state",checkbox:!0,align:"center",visible:!0,sortable:!1,width:"4%"},{field:"userFileName",title:"用户名称",align:"center",visible:!0,sortable:!1,width:"10%",editable:!0},{field:"userFileCode",title:"用户编号",align:"center",visible:!0,sortable:!1,width:"10%",editable:!0},{field:"enterhomeUserTypeName",title:"用户类型",align:"center",visible:!0,sortable:!1,width:"8%",editable:!0},{field:"userStatusName",title:"用户状态",align:"center",visible:!0,sortable:!1,width:"8%"},{field:"regionName",title:"所属片区",align:"center",visible:!0,sortable:!1,width:"15%",editable:!0},{field:"residential",title:"小区/院/村",align:"center",visible:!0,sortable:!1,width:"10%"},{field:"address",title:"详细地址",align:"center",visible:!0,sortable:!1,width:"25%",editable:!0},{field:"operate",title:"操作",align:"center",events:e.tableEvent(),width:"10%",formatter:e.tableOperation}]})},tableOperation:function(e,t,i){var a=null,s=null;return 1==JSON.parse(lsObj.getLocalStorage("userBo")).isSysadmin?(a="modify",s="delete"):t.createUserId==JSON.parse(lsObj.getLocalStorage("userBo")).objectId?(a="modify",s="delete"):(a="modify_end",s="delete_end"),['<a class="look" href="javascript:void(0)" title="查看">',"<i></i>","</a>",'<a class="'+a+'" href="javascript:void(0)" title="修改">',"<i></i>","</a>",'<a class="'+s+'" href="javascript:void(0)" title="删除">',"<i></i>","</a>"].join("")},tableEvent:function(){return{"click .look":function(e,t,i,a){return farmeObj._userId=i.objectId,farmeObj.detailsReset(),farmeObj.$usreDetailsFrame.modal(),!1},"click .modify":function(e,t,i,a){return farmeObj._userId=i.objectId,farmeObj.$addUserFrame.modal(),farmeObj.$addUserFrame.find(".modal-header span").text("编辑用户"),farmeObj.$addUserFrame.find(".modal-footer .addSubmit").hide(),farmeObj.$addUserFrame.find(".modal-footer .modifySubmit").show(),farmeObj.formReset(),farmeObj._isModify=!0,!1},"click .delete":function(e,t,i,a){var s={tip:"慎重！此删除操作会导致该用户的相关数据移除，您是否确认删除该用户？",name_title:"提示",name_cancel:"取消",name_confirm:"确定",isCancelBtnShow:!0,callBack:function(){farmeObj.deleteUser(i.objectId)}};return xxwsWindowObj.xxwsAlert(s),!1}}}},farmeObj={$addUserFrame:$("#addUserFrame"),$usreDetailsFrame:$("#usreDetailsFrame"),$historyInspectFrame:$("#historyInspectFrame"),$addSubmit:$(".addSubmit"),$modifySubmit:$(".modifySubmit"),$addGasBtn:$(".addGasBtn span"),$deleteUserBtn:$(".deleteUserBtn"),$historyBtn:$(".getHistory"),_gasObj:[],querryObj:{startDate:"",endDate:"",groupId:""},_isModify:null,_userId:null,_flag:!0,init:function(){var e=this;e.$addSubmit.click(function(){e.verification()}),e.$modifySubmit.click(function(){e.verification()}),e.$addGasBtn.click(function(){var t=$("#formGasAdd").find(".gasList").length;t>10?xxwsWindowObj.xxwsAlert("您添加的燃气表太多了，最多十个"):e.gasText(t+1)}),e.$addUserFrame.on("shown.bs.modal",function(t){void 0!=$("#formBasicsAdd").data("bootstrapValidator")&&$("#formBasicsAdd").data("bootstrapValidator").resetForm(!0),1==e._isModify&&e.setModifyDetails()}),e.$usreDetailsFrame.on("shown.bs.modal",function(t){e.getDetails()}),e.$deleteUserBtn.click(function(){var t={tip:"慎重！此删除操作会导致该用户的相关数据移除，您是否确认删除该用户？",name_title:"提示",name_cancel:"取消",name_confirm:"确定",isCancelBtnShow:!0,callBack:function(){e.deleteUser(e._userId)}};xxwsWindowObj.xxwsAlert(t)}),e.$historyBtn.click(function(){e.historyReset(),e.$historyInspectFrame.modal(),e.querryObj.groupId=e._userId,e.getHistoryData()}),e.$historyInspectFrame.on("show.bs.modal",function(e){}),$(".getRepairHistory").click(function(){repairObj.openHistoryFrame(e._userId)}),$(".historyTimeBtn").click(function(){var t=$(this).attr("data-value");if("diy"==t){if(""==$("#historydateStart").val())return void xxwsWindowObj.xxwsAlert("请选择起始时间");if(""==$("#historydateEnd").val())return void xxwsWindowObj.xxwsAlert("请选择起始时间");e.querryObj.startDate=$("#historydateStart").val(),e.querryObj.endDate=$("#historydateEnd").val(),$(".historyTimeTxt").find(".historyTimeBtn").removeClass("active")}else $(this).addClass("active"),$(this).siblings("span").removeClass("active"),e.setDate(t);e.getHistoryData()})},formReset:function(){var e=this;e._gasObj=[],$(".text_num").text("(200字)"),e.$addUserFrame.find("input").val(""),e.$addUserFrame.find("textarea").val("");for(var t=e.$addUserFrame.find("select"),i=0;i<t.length;i++)t.eq(i).find("option:eq(0)").prop("selected",!0);void 0!=$("#formGasAdd").data("bootstrapValidator")&&$("#formGasAdd").data("bootstrapValidator").destroy(),e.$addUserFrame.find(".gasList").remove(),$("select[name=userRegionList]").html('<option value="">请选择</option>'),addressObj.setAdress(),e.getAreaList(!1)},gasText:function(e){var t=baseOperation.createuuid(),i='<div class="gasList"><div class="gasTitle"><p>燃气表-'+e+'</p><input type="hidden" name="gasmeterName" value="燃气表-'+e+'"><input type="hidden" name="objectId" value="'+t+'"><input type="hidden" name="operationFlag" value="1"><span class="closedGas"><img src="/src/images/user/closed.png" width="10" /></span></div><div class="formList"><div class="formListHalf"><div class="formListLeft"><i>*</i>类型</div><div class="formListRight"><select class="form-control" name="gasmeterTypeCode"><option value="GMT_01">机械表</option><option selected value="GMT_02">IC卡表</option><option value="GMT_03">远传表</option><option value="GMT_99">其他</option></select></div></div><div class="formListHalf"><div class="formListLeft"><i>*</i>进气方向</div><div class="formListRight"><select class="form-control" name="gasmeterEntermode"><option value="左进">左进</option><option value="右进">右进</option></select></div></div></div><div class="formList"><div class="formListHalf"><div class="formListLeft"><i>*</i>使用状态</div><div class="formListRight"><select class="form-control" name="gasmeterStatusCode"><option value="GMUS_01">在用</option><option value="GMUS_02">停用</option><option value="GMUS_03">已拆卸</option></select></div></div><div class="formListHalf"><div class="formListLeft">生产日期</div><div class="formListRight"><input type="text" name="manufactureDate" class="form-control pointer dateTimeAdd" placeholder="请选择日期" readonly></div></div></div><div class="formList"><div class="formListHalf"><div class="formListLeft">生产厂家</div><div class="formListRight form-group"><input type="text" name="manufacturer" class="form-control" /></div></div><div class="formListHalf"><div class="formListLeft">编号</div><div class="formListRight form-group"><input type="text" name="gasmeterCode" class="form-control" /></div></div></div><div class="formList"><div class="formListHalf"><div class="formListLeft">型号</div><div class="formListRight form-group"><input type="text" name="gasmeterMode" class="form-control" /></div></div><div class="formListHalf"><div class="formListLeft">使用年限</div><div class="formListRight form-group"><input type="text" name="serviceLife" class="form-control" /></div></div></div><div class="formList"><div class="formListLeft">规格</div><div class="formListRight form-group"><input type="text" class="form-control" name="specifications" /></div></div></div>';$("div.addGasBtn").before(i)},verification:function(e){var t=this;if(""==$("#formBasicsAdd").find("select[name=areaCode]").val())return void xxwsWindowObj.xxwsAlert("请选择详细地址");var i={message:"This value is not valid",feedbackIcons:{valid:"glyphicon glyphicon-ok",invalid:"glyphicon glyphicon-remove",validating:"glyphicon glyphicon-refresh"},fields:{residential:{validators:{notEmpty:{message:"请输入小区/院/村"},stringLength:{max:25,message:"小区/院/村字数过长，不能大于25"}}},biulding:{validators:{stringLength:{max:15,message:"楼号字数过长，不能大于15"}}},unit:{validators:{stringLength:{max:15,message:"单元号字数过长，不能大于15"}}},room:{validators:{notEmpty:{message:"请输入门牌号"},stringLength:{max:50,message:"门牌号字数过长，不能大于50"}}},userFileName:{validators:{stringLength:{max:25,message:"用户名称字数过长，不能大于25"}}},userFileCode:{validators:{stringLength:{max:25,message:"用户编号字数过长，不能大于25"}}},contactUser:{validators:{stringLength:{max:25,message:"联系人字数过长，不能大于25"}}},contactPhone:{validators:{regexp:{regexp:/^((1\d{10})|(([0-9]{3,4}-)?[0-9]{7,8}))$/,message:"联系电话输入错误"}}},alternativePhone:{validators:{regexp:{regexp:/^((1\d{10})|(([0-9]{3,4}-)?[0-9]{7,8}))$/,message:"备用电话输入错误"}}},identityCard:{validators:{stringLength:{max:18,message:"身份证号字数过长，不能大于18"}}},pressureRangeMin:{validators:{numeric:{message:"格式错误，只能是数字格式"},between:{min:0,max:1e4,message:"数值大小在0~~10000之间"}}},pressureRangeMax:{validators:{numeric:{message:"格式错误，只能是数字格式"},between:{min:0,max:1e4,message:"数值大小在0~~10000之间"}}}}},a={message:"This value is not valid",feedbackIcons:{valid:"glyphicon glyphicon-ok",invalid:"glyphicon glyphicon-remove",validating:"glyphicon glyphicon-refresh"},fields:{manufacturer:{validators:{stringLength:{max:25,message:"生产厂家字数过长，不能大于25"}}},gasmeterCode:{validators:{stringLength:{max:30,message:"编号字数过长，不能大于30"}}},gasmeterMode:{validators:{stringLength:{max:25,message:"型号字数过长，不能大于25"}}},serviceLife:{validators:{stringLength:{max:15,message:"使用年限字数过长，不能大于15"}}},specifications:{validators:{stringLength:{max:100,message:"规格字数过长，不能大于100"}}}}};$("#formBasicsAdd").bootstrapValidator(i),$("#formBasicsAdd").data("bootstrapValidator").validate(),void 0!=$("#formGasAdd").data("bootstrapValidator")&&$("#formGasAdd").data("bootstrapValidator").destroy(),$("#formGasAdd").bootstrapValidator(a),$("#formGasAdd").data("bootstrapValidator").validate(),1==$("#formBasicsAdd").data("bootstrapValidator").isValid()&&1==$("#formGasAdd").data("bootstrapValidator").isValid()?t.getFormData():$("#addUserFrame .modal-body").scrollTop(0)},getFormData:function(){var e=this,t=fromObj.getForm($("#formBasicsAdd")),i=[],a="",s=t.userRegionList;if(a=$(".addressProvince").find("option:selected").text()+$(".addressCity").find("option:selected").text()+$(".addressCounty").find("option:selected").text()+$(".addressTown").find("option:selected").text()+(t.residential+(""==t.biulding?"":"-"+t.biulding))+(""==t.unit?"":"-"+t.unit)+"-"+t.room,$("#formGasAdd .gasList").length>0)for(var r=0;r<$("#formGasAdd .gasList").length;r++){var o=fromObj.getForm($("#formGasAdd .gasList").eq(r));i.push(o)}if(t.userGasmeterList=i,t.userRegionList=""==s?[]:[{regionId:s}],t.address=a,t.objectId=e._userId,t.remark=$("#addUserFrame").find("textarea[name=remark]").val().trim(),0!=e._gasObj.length&&null!=e._gasObj&&void 0!=e._gasObj)for(var r=0;r<e._gasObj.length;r++){var n=!1;gasid=e._gasObj[r].objectId;for(var d=0;d<t.userGasmeterList.length;d++)gasid==t.userGasmeterList[d].objectId&&(n=!0);0==n&&(e._gasObj[r].operationFlag=-1,t.userGasmeterList.push(e._gasObj[r]))}1==e._isModify?e.modifyUser(t):(t.objectId=baseOperation.createuuid(),e.addUser(t))},addUser:function(e){var t=this;1==t._flag&&(t._flag=!1,$.ajax({type:"POST",url:"/cloudlink-inspection-event/userArchive/save?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify(e),dataType:"json",success:function(e){if(1==e.success){var i={tip:"新建用户成功",name_title:"提示",name_cancel:"取消",name_confirm:"确定",isCancelBtnShow:!1,callBack:function(){window.location.reload()}};xxwsWindowObj.xxwsAlert(i)}else"XE03001"==e.code?xxwsWindowObj.xxwsAlert("新建用户失败，地址重复"):"XE03002"==e.code?xxwsWindowObj.xxwsAlert("用户编号重复"):xxwsWindowObj.xxwsAlert("新建用户失败");t.again()},error:function(){xxwsWindowObj.xxwsAlert("新建用户失败"),t.again()}}))},modifyUser:function(e){var t=this;1==t._flag&&(t._flag=!1,$.ajax({type:"POST",url:"/cloudlink-inspection-event/userArchive/update?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify(e),dataType:"json",success:function(e){if(1==e.success){var i={tip:"修改用户成功",name_title:"提示",name_cancel:"取消",name_confirm:"确定",isCancelBtnShow:!1,callBack:function(){window.location.reload()}};xxwsWindowObj.xxwsAlert(i)}else"XE03001"==e.code?xxwsWindowObj.xxwsAlert("修改用户失败，地址重复"):"XE03002"==e.code?xxwsWindowObj.xxwsAlert("用户编号重复"):xxwsWindowObj.xxwsAlert("修改用户失败");t.again()},error:function(){xxwsWindowObj.xxwsAlert("修改用户失败"),t.again()}}))},setModifyDetails:function(){var e=this,t={objectId:e._userId};e._gasObj=[],$.ajax({type:"GET",url:"/cloudlink-inspection-event/commonData/userArchive/get?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:t,dataType:"json",success:function(t){if(1==t.success){var i=t.rows[0];if(e._gasObj=i.userGasmeterBoList,fromObj.setForm("addUserFrame",i),addressObj.setAdress(i.areaCode),i.userGasmeterBoList.length>0){for(var a=0;a<i.userGasmeterBoList.length;a++){var s='<div class="gasList"><div class="gasTitle"><p>'+i.userGasmeterBoList[a].gasmeterName+'</p><input type="hidden" name="gasmeterName" value="'+i.userGasmeterBoList[a].gasmeterName+'"><input type="hidden" name="objectId" value="'+i.userGasmeterBoList[a].objectId+'"><input type="hidden" name="operationFlag" value="2"></div><div class="formList"><div class="formListHalf"><div class="formListLeft"><i>*</i>类型</div><div class="formListRight"><select class="form-control" name="gasmeterTypeCode"><option value="GMT_01">机械表</option><option selected value="GMT_02">IC卡表</option><option value="GMT_03">远传表</option><option value="GMT_99">其他</option></select></div></div><div class="formListHalf"><div class="formListLeft"><i>*</i>进气方向</div><div class="formListRight"><select class="form-control" name="gasmeterEntermode"><option value="左进">左进</option><option value="右进">右进</option></select></div></div></div><div class="formList"><div class="formListHalf"><div class="formListLeft"><i>*</i>使用状态</div><div class="formListRight"><select class="form-control" name="gasmeterStatusCode"><option value="GMUS_01">在用</option><option value="GMUS_02">停用</option><option value="GMUS_03">已拆卸</option></select></div></div><div class="formListHalf"><div class="formListLeft">生产日期</div><div class="formListRight"><input type="text" value="'+i.userGasmeterBoList[a].manufactureDate+'" name="manufactureDate" class="form-control pointer dateTimeAdd" placeholder="请选择日期" readonly></div></div></div><div class="formList"><div class="formListHalf"><div class="formListLeft">生产厂家</div><div class="formListRight form-group"><input type="text" value="'+i.userGasmeterBoList[a].manufacturer+'" name="manufacturer" class="form-control" /></div></div><div class="formListHalf"><div class="formListLeft">编号</div><div class="formListRight form-group"><input type="text" value="'+i.userGasmeterBoList[a].gasmeterCode+'" name="gasmeterCode" class="form-control" /></div></div></div><div class="formList"><div class="formListHalf"><div class="formListLeft">型号</div><div class="formListRight form-group"><input type="text" value="'+i.userGasmeterBoList[a].gasmeterMode+'" name="gasmeterMode" class="form-control" /></div></div><div class="formListHalf"><div class="formListLeft">使用年限</div><div class="formListRight form-group"><input type="text" value="'+i.userGasmeterBoList[a].serviceLife+'" name="serviceLife" class="form-control" /></div></div></div><div class="formList"><div class="formListLeft">规格</div><div class="formListRight form-group"><input type="text" value="'+i.userGasmeterBoList[a].specifications+'" class="form-control" name="specifications" /></div></div></div>';$("div.addGasBtn").before(s)}for(var a=0;a<i.userGasmeterBoList.length;a++){var r=$("#formGasAdd").find(".gasList").eq(a);r.find("select[name=gasmeterTypeCode]").val(i.userGasmeterBoList[a].gasmeterTypeCode),r.find("select[name=gasmeterEntermode]").val(i.userGasmeterBoList[a].gasmeterEntermode),r.find("select[name=gasmeterStatusCode]").val(i.userGasmeterBoList[a].gasmeterStatusCode)}}$("select[name=userRegionList]").val(i.regionId);var o=200-i.remark.length;$(".text_num").text("("+o+"字)")}else xxwsWindowObj.xxwsAlert("获取用户修改信息失败")},error:function(){xxwsWindowObj.xxwsAlert("获取用户修改信息失败")}})},detailsReset:function(){var e=this;e.$usreDetailsFrame.find(".frameListRight p").text("------"),e.$usreDetailsFrame.find(".gasDetailsMain").html("")},getDetails:function(){var e=this,t={objectId:e._userId};$.ajax({type:"GET",url:"/cloudlink-inspection-event/commonData/userArchive/get?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:t,dataType:"json",success:function(e){if(1==e.success){var t=e.rows[0];if(fromObj.setDetails("usreDetailsFrame",t),t.userGasmeterBoList.length>0)for(var i=0;i<t.userGasmeterBoList.length;i++){var a='<div class="gasMainList"><div class="gasMainTitle"><p>'+t.userGasmeterBoList[i].gasmeterName+'</p></div><div class="frameList"><div class="frameListHalf"><div class="frameListLeft">类型</div><div class="frameListRight"><p data-name="installationTimeT">'+t.userGasmeterBoList[i].gasmeterTypeName+'</p></div></div><div class="frameListHalf"><div class="frameListLeft">进气方向</div><div class="frameListRight"><p data-name="investmentTimeT">'+t.userGasmeterBoList[i].gasmeterEntermode+'</p></div></div></div><div class="frameList"><div class="frameListHalf"><div class="frameListLeft">使用状态</div><div class="frameListRight"><p data-name="installationTimeT">'+t.userGasmeterBoList[i].gasmeterStatusName+'</p></div></div><div class="frameListHalf"><div class="frameListLeft">生产日期</div><div class="frameListRight"><p data-name="investmentTimeT">'+t.userGasmeterBoList[i].manufactureDate+'</p></div></div></div><div class="frameList"><div class="frameListHalf"><div class="frameListLeft">生产厂家</div><div class="frameListRight"><p data-name="installationTimeT">'+t.userGasmeterBoList[i].manufacturer+'</p></div></div><div class="frameListHalf"><div class="frameListLeft">编号</div><div class="frameListRight"><p data-name="investmentTimeT">'+t.userGasmeterBoList[i].gasmeterCode+'</p></div></div></div><div class="frameList"><div class="frameListHalf"><div class="frameListLeft">型号</div><div class="frameListRight"><p data-name="installationTimeT">'+t.userGasmeterBoList[i].gasmeterMode+'</p></div></div><div class="frameListHalf"><div class="frameListLeft">使用年限</div><div class="frameListRight"><p data-name="investmentTimeT">'+t.userGasmeterBoList[i].serviceLife+'</p></div></div></div><div class="frameList"><div class="frameListLeft">规格</div><div class="frameListRight"><p data-name="installationTimeT">'+t.userGasmeterBoList[i].specifications+"</p></div></div></div>";$(".gasDetailsMain").append(a)}else $(".gasDetailsMain").html("<p class='gaslistNone'>暂无燃气表信息</p>")}else xxwsWindowObj.xxwsAlert("获取用户详情信息失败")},error:function(){xxwsWindowObj.xxwsAlert("获取用户详情信息失败")}})},deleteUser:function(e){var t={objectId:e};$.ajax({type:"POST",url:"/cloudlink-inspection-event/userArchive/delete?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify(t),dataType:"json",success:function(e,t){if(1==e.success){var i={tip:"用户删除成功！",name_title:"提示",name_cancel:"取消",name_confirm:"确定",isCancelBtnShow:!1,callBack:function(){window.location.reload()}};xxwsWindowObj.xxwsAlert(i)}else 410==e.code?xxwsWindowObj.xxwsAlert("您没有删除用户的权限！"):"XE03004"==e.code?xxwsWindowObj.xxwsAlert("该用户已存在安检记录，无法删除"):"XE03006"==e.code?xxwsWindowObj.xxwsAlert("您没有删除用户的权限！"):xxwsWindowObj.xxwsAlert("用户删除失败！")}})},deleteMoreUser:function(e){var t={idList:e};$.ajax({type:"POST",url:"/cloudlink-inspection-event/userArchive/deleteBatch?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify(t),dataType:"json",success:function(e,t){if(1==e.success){var i={tip:"用户删除成功！",name_title:"提示",name_cancel:"取消",name_confirm:"确定",isCancelBtnShow:!1,callBack:function(){window.location.reload()}};xxwsWindowObj.xxwsAlert(i)}else if(410==e.code)xxwsWindowObj.xxwsAlert("您没有删除用户的权限！");else if("XE03004"==e.code){$(".hintsDeleteMainList ul").html(""),$("#validationDeleteFrame").modal();var a=e.rows;if(a.length>0)for(var s=0;s<a.length;s++){var r='<li><span class="listLeft">'+(s+1)+'</span><span class="listRight">'+a[s].address+"</span></li>";$(".hintsDeleteMainList ul").append(r)}}else"XE03006"==e.code?xxwsWindowObj.xxwsAlert("您没有删除用户的权限！"):xxwsWindowObj.xxwsAlert("用户删除失败！")}})},getAreaList:function(e){var t={keyword:"",pageNum:1,pageSize:1e4};$.ajax({type:"POST",url:"/cloudlink-inspection-event/commonData/region/getPageList?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify(t),dataType:"json",success:function(t){if(1==t.success){var i=t.rows,a=null;a=1==e?'<option value="">全部（片区）</option>':'<option value="">请选择</option>';for(var s=0;s<i.length;s++)a+='<option value="'+i[s].objectId+'">'+i[s].regionName+"</option>";1==e?(a+='<option value="none">无</option>',$("select[name=areaList]").html(a)):$("select[name=userRegionList]").html(a)}}})},getQuartersList:function(e){var t={regionId:e,pageNum:1,pageSize:1e3};$.ajax({type:"POST",url:"/cloudlink-inspection-event/commonData/residentialName/getPageList?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify(t),dataType:"json",success:function(e){if(1==e.success){for(var t=e.rows,i='<option value="">全部（小区/院/村）</option>',a=0;a<t.length;a++)i+='<option value="'+t[a].residential+'">'+t[a].residential+"</option>";$("select[name=quartersList]").html(i)}}})},satisfaction:function(e){switch(e){case"1":var t='<ul><li><img src="/src/images/security/star.png" width="20" alt=""></li></ul><span>非常不满</span>';return t;case"2":var t='<ul><li><img src="/src/images/security/star.png" width="20" alt=""></li><li><img src="/src/images/security/star.png" width="20" alt=""></li></ul><span>不满意</span>';return t;case"3":var t='<ul><li><img src="/src/images/security/star.png" width="20" alt=""></li><li><img src="/src/images/security/star.png" width="20" alt=""></li><li><img src="/src/images/security/star.png" width="20" alt=""></li></ul><span>一般</span>';return t;case"4":var t='<ul><li><img src="/src/images/security/star.png" width="20" alt=""></li><li><img src="/src/images/security/star.png" width="20" alt=""></li><li><img src="/src/images/security/star.png" width="20" alt=""></li><li><img src="/src/images/security/star.png" width="20" alt=""></li></ul><span>满意</span>';return t;default:var t='<ul><li><img src="/src/images/security/star.png" width="20" alt=""></li><li><img src="/src/images/security/star.png" width="20" alt=""></li><li><img src="/src/images/security/star.png" width="20" alt=""></li><li><img src="/src/images/security/star.png" width="20" alt=""></li><li><img src="/src/images/security/star.png" width="20" alt=""></li></ul><span>非常满意</span>';return t}},historyReset:function(){$("#historydateStart").val(""),$("#historydateEnd").val(""),$(".historyTimeBtn").removeClass("active"),$(".historyTimeBtn").eq(0).addClass("active"),$(".historyMainDetails").html(""),this.querryObj.startDate="",this.querryObj.endDate=""},getHistoryData:function(){var e=this;$(".historyMainDetails").html(""),$.ajax({type:"POST",url:"/cloudlink-inspection-event/commonData/securityCheckRecordHistory/getList?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify(e.querryObj),dataType:"json",success:function(t){if(1==t.success){var i=t.rows,a="";if(i.length>0)for(var s=0;s<i.length;s++){var r=e.satisfaction(i[s].satisfaction),o="";if(i[s].hiddendangers.length>0)for(var n=0;n<i[s].hiddendangers.length;n++)o+='<span class="dangerC">'+i[s].hiddendangers[n].hiddendangerName+"</span>";else o="<span>无</span>";var d="";if(i[s].pic.length>0)for(var n=0;n<i[s].pic.length;n++)d+='<li class="event_pic_list"><img  src="/cloudlink-core-file/file/getImageBySize?fileId='+i[s].pic[n]+'&viewModel=fill&width=104&hight=78" data-original="/cloudlink-core-file/file/downLoad?fileId='+i[s].pic[n]+'" onclick="previewPicture(this)" alt=""/></li>';else d="<span>无</span>";var l="";if(i[s].signature.length>0)for(var c=0;c<i[s].signature.length;c++)l+='<li class="event_pic_list"><img  src="/cloudlink-core-file/file/getImageBySize?fileId='+i[s].signature[c]+'&viewModel=fill&width=156&hight=78" data-original="/cloudlink-core-file/file/downLoad?fileId='+i[s].signature[c]+'" onclick="previewPicture(this)" alt=""/></li>';else l="<span>无</span>";var m=null,f=null;0==i[s].isdanger?(m="不存在",f="hideClass"):1==i[s].isdanger?(m="存在",f="showClass"):(m="",f="hideClass");var v=null;v="EHS_001"==i[s].enterhomeSituationTypeCode?"showClass":"hideClass",a+='<div class="frameDetailsMain"><div class="frameList"><div class="frameListHalf"><div class="frameListLeft">安检时间</div><div class="frameListRight"><p>'+i[s].securityCheckTime+'</p></div></div><div class="frameListHalf"><div class="frameListLeft">安检人</div><div class="frameListRight"><p>'+i[s].createUserName+'</p></div></div></div><div class="frameList"><div class="frameListHalf"><div class="frameListLeft">安检计划</div><div class="frameListRight"><p>'+i[s].planName+'</p></div></div><div class="frameListHalf"><div class="frameListLeft">入户情况</div><div class="frameListRight"><p>'+i[s].enterhomeSituationTypeName+'</p></div></div></div><div class="frameList"><div class="frameListHalf"><div class="frameListLeft">安全隐患</div><div class="frameListRight"><p>'+m+'</p></div></div><div class="frameListHalf"><div class="frameListLeft">整改时间</div><div class="frameListRight"><p>'+i[s].remediationTime+'</p></div></div></div><div class="frameList '+f+'"><div class="frameListLeft">隐患情况</div><div class="frameListRight"><p class="hiddendangersT">'+o+'</p></div></div><div class="frameList '+f+'"><div class="frameListLeft">隐患措施告知</div><div class="frameListRight"><p>隐患整改措施已告知用户并解释清楚</p></div></div><div class="frameList"><div class="frameListLeft">备注</div><div class="frameListRight"><p>'+i[s].remark+'</p></div></div><div class="frameList"><div class="frameListLeft">照片</div><div class="frameListRight"><ul>'+d+'</ul></div></div><div class="frameList '+v+'"><div class="frameListLeft">用户签字</div><div class="frameListRight"><ul>'+l+'</ul></div></div><div class="frameList '+v+'"><div class="frameListLeft">用户满意度</div><div class="frameListRight satisfaction">'+r+"</div></div></div>"}else a="<span class='notEmptyData'>暂无检查记录</span>";$(".historyMainDetails").append(a)}else xxwsWindowObj.xxwsAlert("获取历史检查记录失败")},error:function(e){xxwsWindowObj.xxwsAlert("获取历史检查记录失败")}})},setDate:function(e){var t=this;switch(e){case"day":var i=(new Date).Format("yyyy-MM-dd");t.querryObj.startDate=i,t.querryObj.endDate=i;break;case"week":var i=new Date;t.querryObj.startDate=i.getWeekStartDate().Format("yyyy-MM-dd"),t.querryObj.endDate=i.getWeekEndDate().Format("yyyy-MM-dd");break;case"month":var i=new Date;t.querryObj.startDate=i.getMonthStartDate().Format("yyyy-MM-dd"),t.querryObj.endDate=i.getMonthEndDate().Format("yyyy-MM-dd");break;default:t.querryObj.startDate="",t.querryObj.endDate=""}},again:function(){this._flag=!0}},exportFileObj={$exportAll:$("#export_all"),$exportChoice:$("#export_choice"),$templatesBtn:$("#templatesBtn"),expoerObj:{regionId:"",residential:"",enterhomeUserTypeCode:"",userStatusCode:"",keyword:"",pageNum:1,pageSize:10,idList:[]},init:function(){var e=this;this.$exportAll.click(function(){e.expoerObj.idList=[],e.expoerCondition()}),this.$exportChoice.click(function(){var t=$("#userList").bootstrapTable("getSelections");if(e.expoerObj.idList=[],0==t.length)return xxwsWindowObj.xxwsAlert("请选择你需要导出的用户！"),!1
;for(var i=0;i<t.length;i++)e.expoerObj.idList.push(t[i].objectId);e.expoerCondition()}),e.$templatesBtn.click(function(){e.exportTemlates()})},expoerCondition:function(){$.extend(this.expoerObj,searchObj.querryObj),this.expoerData(this.expoerObj)},expoerData:function(e){var t={url:"/cloudlink-inspection-event/commonData/userArchive/export?token="+lsObj.getLocalStorage("token"),data:e,method:"post"};this.downLoadFile(t)},exportTemlates:function(){var e={url:"/cloudlink-inspection-event/userArchive/downLoadTemplate?token="+lsObj.getLocalStorage("token"),method:"post"};this.downLoadFile(e)},downLoadFile:function(e){var t=$.extend(!0,{method:"post"},e),i=$('<iframe id="down-file-iframe" />'),a=$('<form target="down-file-iframe" method="'+t.method+'" />');a.attr("action",t.url);for(var s in t.data)a.append('<input type="hidden" name="'+s+'" value="'+t.data[s]+'" />');i.append(a),$(document.body).append(i),a[0].submit(),i.remove()}},importObj={$submitBtn:$(".submitFileBtn"),$batchImportFrame:$("#batchImportModal"),$hintsFrame:$("#validationHintsFrame"),$confirmationFrame:$("#confirmationFrame"),$transitionFrame:$("#transitionFrame"),$refrsetFrame:$("#refrsetFrame"),$confirmationBtn:$(".confirmationBtn"),_addressObj:null,_flag:!0,init:function(){var e=this;$(".batchImport").click(function(){$(".upload_picture").trigger("click")}),e._addressObj=setAddress({defalutId:"",dataUrl:"/src/js/user/city.json",provinceSelector:".province",citySelector:".city",countySelector:".county",townSelector:".country"}),e.$batchImportFrame.on("shown.bs.modal",function(t){$(".feedback_img_file").find("input[type=file]").val(""),e._addressObj.initDefaultAddress()}),e.$submitBtn.click(function(){e.importVerification()}),e.$confirmationBtn.click(function(){e.cockedFile()}),e.$refrsetFrame.on("hide.bs.modal",function(e){window.location.reload()})},importVerification:function(){var e=this,t=e._addressObj.result.townCode,i=$(".batchImportInput").val().trim();if(""==t||null==t||void 0==t)return xxwsWindowObj.xxwsAlert("请选择用户所在地区"),!1;if(""==i||null==i)return xxwsWindowObj.xxwsAlert("请选择上传的文件"),!1;var a=$(".feedback_img_file").find("input").attr("id");e.uploadFlie(a,t)},uploadFlie:function(e,t){var i=this,a=baseOperation.createuuid();1==i._flag&&(i._flag=!1,i.$transitionFrame.modal(),i.$transitionFrame.find(".transitionMain dd span").text("数据格式规范验证"),$.ajaxFileUpload({url:"/cloudlink-core-file/attachment/web/v1/save?businessId="+a+"&bizType=excel&token="+lsObj.getLocalStorage("token"),secureuri:!1,fileElementId:e,dataType:"json",type:"POST",async:!1,success:function(e,a){if(1==e.success){var s=e.rows[0].fileId;i.fileCheck(s,t)}else i.$transitionFrame.modal("hide"),i.again(),xxwsWindowObj.xxwsAlert("校验失败，请稍后重试")},error:function(e){i.$transitionFrame.modal("hide"),i.again()}}))},fileCheck:function(e,t){var i=this,a={fileId:e,areaCode:t};$.ajax({type:"POST",url:"/cloudlink-inspection-event/userArchive/importValidate?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify(a),dataType:"json",success:function(e,t){if(1==e.success){var a=e.rows[0].status,s=e.rows[0].total;if($(".hintsTotal").text(s),$(".confirmationText span").text(s),$(".confirmationAdopt span").text(s),1==a)i.$transitionFrame.find(".transitionMain dd span").text("地址验证"),i.fileCheckTwo();else{var r=e.rows[0].errors;$(".hintsNum").text(r.length),i.$transitionFrame.modal("hide"),i.$hintsFrame.modal(),$(".hintsMainList ul").html(""),i.$hintsFrame.find(".modal-header h3 span").text("数据格式规范验证"),i.$hintsFrame.find(".hintsMainTitle i").text("必填项未填写、填写项不符合规范"),i.again();for(var o=0;o<r.length;o++){var n="";if(r[o].msg&&(n=r[o].msg+"行地址重复、"),r[o].colErrors)for(var d=0;d<r[o].colErrors.length;d++){var l;"notBlank"==r[o].colErrors[d].msgType?l="列未填写":"typemismatch"==r[o].colErrors[d].msgType||"integrality"==r[o].colErrors[d].msgType?l="列填写不规范":"addressDuplicate"==r[o].colErrors[d].msgType&&(l="行地址重复"),n+="第"+r[o].colErrors[d].colNum+l+"、"}var c='<li><span class="listLeft">'+r[o].rowNum+'</span><span class="listRight">'+n+"</span></li>";$(".hintsMainList ul").append(c)}}}else xxwsWindowObj.xxwsAlert("校验失败，请稍后重试"),i.$transitionFrame.modal("hide"),i.again()},error:function(e){i.$transitionFrame.modal("hide"),i.again(),xxwsWindowObj.xxwsAlert("校验失败，请稍后重试")}})},fileCheckTwo:function(){var e=this;$.ajax({type:"POST",url:"/cloudlink-inspection-event/userArchive/importValidateAddress?token="+lsObj.getLocalStorage("token"),contentType:"application/json",dataType:"json",success:function(t,i){if(1==t.success){if(1==t.rows[0].status)e.$confirmationFrame.modal(),e.$transitionFrame.modal("hide"),e.again();else{var a=t.rows[0].errors;$(".hintsNum").text(a.length),e.$transitionFrame.modal("hide"),e.$hintsFrame.modal(),$(".hintsMainList ul").html(""),e.$hintsFrame.find(".modal-header h3 span").text("地址验证"),e.$hintsFrame.find(".hintsMainTitle i").text("地址已存在"),e.again();for(var s=0;s<a.length;s++){var r="";a[s].msg&&(r=a[s].rowNum+"行的地址系统中已存在");var o='<li><span class="listLeft">'+a[s].rowNum+'</span><span class="listRight">'+r+"</span></li>";$(".hintsMainList ul").append(o)}}}else xxwsWindowObj.xxwsAlert("校验失败，请稍后重试"),e.$transitionFrame.modal("hide"),e.again()},error:function(t){e.$transitionFrame.modal("hide"),e.again(),xxwsWindowObj.xxwsAlert("校验失败，请稍后重试")}})},cockedFile:function(){var e=this;1==e._flag&&(e._flag=!1,e.$transitionFrame.modal(),e.$transitionFrame.find(".transitionMain dd span").text("批量导入"),$.ajax({type:"POST",url:"/cloudlink-inspection-event/userArchive/importBatch?token="+lsObj.getLocalStorage("token"),contentType:"application/json",dataType:"json",success:function(t,i){1==t.success?(e.$transitionFrame.modal("hide"),e.again(),e.$refrsetFrame.modal()):(xxwsWindowObj.xxwsAlert("导入失败，请稍后重试"),e.$transitionFrame.modal("hide"),e.again())},error:function(t){e.$transitionFrame.modal("hide"),e.again(),xxwsWindowObj.xxwsAlert("导入失败，请稍后重试")}}))},again:function(){this._flag=!0}};$(function(){searchObj.init(),userTable.init(),farmeObj.init(),exportFileObj.init(),importObj.init(),$(document).on("click",".closedGas",function(){void 0!=$("#formGasAdd").data("bootstrapValidator")&&$("#formGasAdd").data("bootstrapValidator").destroy(),$(this).closest(".gasList").remove();var e=$("#formGasAdd").find(".gasList").length;if(e>0)for(var t=0;t<e;t++){var i=$("#formGasAdd").find(".gasList").eq(t);i.find("input[name=gasmeterName]").val("燃气表-"+(t+1)),i.find(".gasTitle p").text("燃气表-"+(t+1))}}),$(document).on("show.bs.modal",".modal",function(e){var t=1040+10*$(".modal:visible").length;$(this).css("z-index",t),setTimeout(function(){$(".modal-backdrop").not(".modal-stack").css("z-index",t-1).addClass("modal-stack")},0)}),$(document).on("hidden.bs.modal",".modal",function(e){$(".modal:visible").length>0&&$("body").addClass("modal-open")})});