function checkname(){var e=$("#addname").val().trim(),t=/^[a-zA-Z\u4e00-\u9fa5]/g;return""==e||null==e?($(".addnameReg").text("请输入您的姓名"),!1):e.length>15?($(".addnameReg").text("您输入的姓名过长，最多15个字。"),!1):e.length<2?($(".addnameReg").text("您输入的姓名过短，最少2个字。"),!1):t.test(e)?($(".addnameReg").text(""),!0):($(".addnameReg").text("您输入的姓名格式有误。"),!1)}function checktel(){var e=$("#tel").val().trim(),t=/^1\d{10}$/;return""==e||null==e?($(".numberREG").text("请输入您的手机号"),!1):t.test(e)?($(".numberREG").text(""),!0):($(".numberREG").text("您输入的手机号有误"),!1)}function checkposition(e){var t=/^[\u4E00-\u9FA5A-Za-z0-9]{2,15}$/;return""==e||null==e?($(".positionReg").text(""),!0):e.length>15?($(".positionReg").text("您输入的职位过长，最多15字。"),!1):t.test(e)?($(".positionReg").text(""),!0):($(".positionReg").text("您输入的职位格式有误"),!1)}$(function(){usermanager.init()});var usermanager={$addbut:$(".inviteuser"),$exportAll:$(".export-all"),$adduser:$("#addUser"),$editUser:$("#editUser"),$viewUser:$("#viewUser"),$updateuser:$(".updateuser"),$frozenuser:$(".frozenuser"),$removeuser:$(".removeuser"),$items:$(".top .item"),$searchInput:$("#searchInput"),$searchreset:$(".search_reset"),$btn_selectOrgan:$("#btn_selectOrgan"),differenceInvite:"1",edituserData:null,activeObj:{status:"0,-1,1"},currentName:null,parentOrgId:null,currentId:null,chooseOrgId:null,operationhtml:null,searchObj:{},$flag:!0,defaultOptions:{tip:"冻结后，该用户将不能进行任何操作？",name_title:"提示",name_cancel:"取消",name_confirm:"确定",isCancelBtnShow:!0},querryObj:{pageNum:1,pageSize:10,status:"0,-1,1"},init:function(){this.chooseon(),this.requestOrganTree("init"),this.bindEvent()},chooseon:function(){var e=this,t=e.$items.parent('[data-class="status"]');t.find(".item").removeClass("active"),t.find(".item[data-value='"+e.activeObj.status+"']").addClass("active")},requestOrganTree:function(e){var t=this;$.ajax({type:"GET",url:"/cloudlink-core-framework/organization/getTree",contentType:"application/json",data:{token:lsObj.getLocalStorage("token"),enterpriseId:JSON.parse(lsObj.getLocalStorage("userBo")).enterpriseId},dataType:"json",success:function(a){if(1!=a.success)return void xxwsWindowObj.xxwsAlert("网络连接出错！");t.currentId=a.rows[0].id,t.currentName=a.rows[0].name,t.parentOrgId=a.rows[0].id,t.inittable(a.rows[0].id),"init"==e?t.renderOrganTree(a.rows):t.renderOrganTreeAndCheckbox(a.rows)},statusCode:{404:function(){xxwsWindowObj.xxwsAlert("网络连接出错！")}}})},renderOrganTree:function(e){var t=this,a={view:{showLine:!1,showIcon:!1,addDiyDom:function(e,t){var a=$("#"+t.tId+"_switch"),r=$("#"+t.tId+"_ico");if(a.remove(),r.before(a),t.level>1){var i="<span style='display: none;width:"+0*(t.level-1)+"px'></span>";a.before(i)}}},data:{key:{name:"name"},simpleData:{enable:!0,idKey:"id"}},callback:{onClick:this.zTreeOnClick}};t.zTree=$.fn.zTree.init($("#organ_list"),a,e),$(".ztree").find("a").eq(0).addClass("curSelectedNode"),t.zTree.expandAll(!0)},zTreeOnClick:function(e,t,a){$(".ztree").find("a").eq(0).removeClass("curSelectedNode"),usermanager.currentName=a.name,usermanager.currentId=a.id,usermanager.refreshTable(a.id)},inittable:function(e){var t=this;$("#table").bootstrapTable({url:"/cloudlink-core-framework/user/queryPageByOrgId?token="+lsObj.getLocalStorage("token"),method:"GET",toolbar:"#toolbar",toolbarAlign:"left",cache:!1,showHeader:!0,showRefresh:!0,striped:!0,pagination:!0,sidePagination:"server",pageNumber:1,pageSize:10,pageList:[10,20,50],queryParamsType:"",queryParams:function(a){return t.searchObj.pageSize=a.pageSize,t.searchObj.pageNum=a.pageNumber,t.searchObj.status="0,1,-1",t.searchObj.orgId=e,t.searchObj.enterpriseId=JSON.parse(lsObj.getLocalStorage("userBo")).enterpriseId,t.searchObj},responseHandler:function(e){return e},columns:[{field:"userName",title:"姓名",align:"center",visible:!0,sortable:!1,width:"15%",editable:!0},{field:"mobileNum",title:"手机号",align:"center",visible:!0,sortable:!1,width:"11%",editable:!0},{field:"orgName",title:"部门",align:"center",visible:!0,sortable:!1,width:"15%",editable:!0},{field:"roleNames",title:"角色",align:"center",visible:!0,sortable:!1,width:"13%"},{field:"position",title:"职位",align:"center",visible:!0,sortable:!1,width:"15%",editable:!0,formatter:function(e,t,a){return null==e||""==e?"":e}},{field:"status",title:"人员状态",align:"center",visible:!0,sortable:!1,width:"10%",editable:!0,formatter:function(e,t,a){return 1==e?"<span class='join'>已激活</span>":"0"==e?"<span class='nojoin'>未激活</span>":-1==e?"<span class='frozen'>冻&nbsp&nbsp;&nbsp&nbsp;结</span>":void 0}},{field:"operation",title:"操作",align:"center",events:operateEvents,formatter:function(e,a,r){var i="";return 0==a.status?i+='<a class="inviter"  href="javascript:void(0)" title="再次邀请"><i></i></a>':"0,-1,1"==t.activeObj.status&&(i+='<a style="display:inline-block;width:22px;height:16px;"><i></i></a>'),i+='<a class="view"  href="javascript:void(0)" title="查看"><i></i></a><a class="edituser"  href="javascript:void(0)" title="编辑"><i></i></a><a class="remove"  href="javascript:void(0)" title="移除"><i></i></a>',[i].join("")}}]})},refreshTable:function(e){var t=this;t.querryObj.pageNum="1",$("#table").bootstrapTable("refreshOptions",{pageNumber:+t.querryObj.pageNum,pageSize:+t.querryObj.pageSize,queryParams:function(a){return t.querryObj.pageSize=a.pageSize,t.querryObj.pageNum=a.pageNumber,t.querryObj.orgId=e,t.querryObj.enterpriseId=JSON.parse(lsObj.getLocalStorage("userBo")).enterpriseId,t.querryObj}})},bindEvent:function(){var e=this;e.$addbut.click(function(){$("#departments").val(e.currentName),e.$adduser.modal()}),$(".departments").click(function(){e.differenceInvite="1",null!=e.chooseOrgId&&""!=e.chooseOrgId?departmentObj.getAllData("",e.chooseOrgId):departmentObj.getAllData("",e.currentId)}),$(".invite").click(function(){e.inviteUser("invite")}),$(".againinvite").click(function(){e.inviteUser("againinvite")}),e.$exportAll.click(function(){e.exportAll()}),$(".editdepartment").click(function(){e.differenceInvite="2",departmentObj.getAllData("",e.edituserData.orgId)}),e.$updateuser.click(function(){e.updateuserSave()}),e.$frozenuser.click(function(){e.frozenuser()}),e.$removeuser.click(function(){e.defaultOptions.tip="您是否确定移除该用户？",e.defaultOptions.callBack=function(){e.removeUser(e.edituserData,"edit")},xxwsWindowObj.xxwsAlert(usermanager.defaultOptions)}),e.$items.click(function(){var t=($(this).parent().attr("data-class"),$(this).attr("data-value"));e.querryObj.status=t,e.activeObj.status=t,e.refreshTable(e.currentId),e.chooseon()}),$("#gf_Btn").click(function(){var t=$(this).parent().find("input").val();e.querryObj.keyWord=t,e.refreshTable(e.currentId)}),e.$searchInput.bind("keyup",function(t){if("8"==t.keyCode){var a=$(this).parent().find("input").val();e.querryObj.keyWord=a,e.refreshTable(e.currentId)}}),e.$searchInput.keypress(function(t){if(t&&13===t.keyCode){var a=$(this).parent().find("input").val();e.querryObj.keyWord=a,e.refreshTable(e.currentId)}}),e.$searchreset.click(function(){e.querryObj.status="0,-1,1",e.querryObj.keyWord="",$("#searchInput").val(""),e.activeObj.status="0,-1,1",$(".ztree").find("a").removeClass("curSelectedNode"),$(".ztree").find("a").eq(0).addClass("curSelectedNode"),e.refreshTable(e.parentOrgId),e.chooseon()}),e.$btn_selectOrgan.click(function(){var t=departmentObj.getSelectDepart().value;"1"==e.differenceInvite?($("#departments").val(t[0].name),e.chooseOrgId=t[0].id):($("#editdepartment").val(t[0].name),e.edituserData.orgId=t[0].id,e.edituserData.orgName=t[0].name)})},exportAll:function(){var e=this,t={enterpriseId:JSON.parse(lsObj.getLocalStorage("userBo")).enterpriseId,orgId:e.currentId,status:e.querryObj.status,token:lsObj.getLocalStorage("token")};null!=e.querryObj.keyWord&&""!=e.querryObj.keyWord&&void 0!=e.querryObj.keyWord&&(t.keyWord=e.querryObj.keyWord);var a={url:"/cloudlink-inspection-analysis/personalStatistical/exportUser",data:t,method:"GET"};e.downLoadFile(a)},downLoadFile:function(e){var t=$.extend(!0,{method:"GET"},e),a=$('<iframe id="down-file-iframe" />'),r=$('<form target="down-file-iframe" method="'+t.method+'" />');r.attr("action",t.url);for(var i in t.data)r.append('<input type="hidden" name="'+i+'" value="'+t.data[i]+'" />');a.append(r),$(document.body).append(a),r[0].submit(),a.remove()},againinviteUser:function(e){var t=JSON.parse(lsObj.getLocalStorage("userBo")),a={userMode:"4",enterpriseId:t.enterpriseId,inviter:t.objectId,invitedPhone:e.mobileNum,signName:""};$.ajax({url:"/cloudlink-core-framework/invite/sendInviteMsm",async:!1,contentType:"application/json",data:JSON.stringify(a),type:"post",dataType:"json",success:function(e,t){1==e.success?xxwsWindowObj.xxwsAlert("邀请成功"):"301"==e.code?xxwsWindowObj.xxwsAlert("该人员当日已经被邀请过，本日无法再次邀请"):"302"==e.code?xxwsWindowObj.xxwsAlert("发送短信异常，请联系管理员"):xxwsWindowObj.xxwsAlert("服务异常，请稍候重试")}})},inviteUser:function(e){var t=this;if(1==t.$flag){t.$flag=!1;var a=JSON.parse(lsObj.getLocalStorage("userBo")),r={inviteMode:"1",inviter:a.objectId,enterpriseId:a.enterpriseId,token:lsObj.getLocalStorage("token")};if(null!=t.chooseOrgId&&""!=t.chooseOrgId?r.orgId=t.chooseOrgId:r.orgId=t.currentId,t.addcheckInput())return void t.again();var i=$(".companyRole").val(),n=$("#addposition").val().trim(),s=$("#addname").val().trim(),o=$("#tel").val().trim();r.roleIds=i,r.userName=s,r.position=n,r.mobileNum=o,$.ajax({url:"/cloudlink-core-framework/invite/inviteUser",async:!1,contentType:"application/json",data:JSON.stringify(r),type:"post",dataType:"json",success:function(a,r){1==a.success?xxwsWindowObj.xxwsAlert("邀请成功",function(){"invite"==e?($("#tel").val(""),$("#addname").val(""),$("#addposition").val(""),t.$adduser.modal("hide"),t.refreshTable(t.currentId)):(t.refreshTable(t.currentId),$("#tel").val(""),$("#addname").val(""))}):"R01"==a.code?xxwsWindowObj.xxwsAlert("该用户已加入企业，无需再次邀请。",function(){$("#tel").val(""),$("#addname").val("")}):"400"==a.code?xxwsWindowObj.xxwsAlert("发送短信异常，请联系客服。",function(){$("#tel").val(""),$("#addname").val("")}):xxwsWindowObj.xxwsAlert("服务异常，请稍候重试。",function(){$("#tel").val(""),$("#addname").val("")}),t.again()},error:function(){t.again()}})}},addcheckInput:function(){return!checkname()||(!checktel()||!checkposition())},initClickUser:function(){var e=this.edituserData;null!=e.userName&&""!=e.userName?$("#editname").val(e.userName):$("#editname").val(""),null!=e.mobileNum&&""!=e.mobileNum?$("#edittel").val(e.mobileNum):$("#edittel").val(""),null!=e.sex&&""!=e.sex?$(".editselectsex").val(e.sex):$(".editselectsex").val("男"),null!=e.roleIds&&""!=e.roleIds?$(".editcompanyRole").val(e.roleIds):$("#editcompanyRole").val(""),null!=e.orgName&&""!=e.orgName?$("#editdepartment").val(e.orgName):$("#editdepartment").val(""),null!=e.position&&""!=e.position?$("#editposition").val(e.position):$("#editposition").val(""),null!=e.age&&""!=e.age?$("#editage").val(e.age):$("#editage").val(""),null!=e.wechat&&""!=e.wechat?$("#editwechat").val(e.wechat):$("#editwechat").val(""),null!=e.email&&""!=e.email?$("#editemail").val(e.email):$("#editemail").val(""),null!=e.qq&&""!=e.qq?$("#editqq").val(e.qq):$("#editqq").val("")},removeUser:function(e,t){var a=this,r={objectId:e.objectId,enterpriseId:e.enterpriseId};$.ajax({url:"/cloudlink-core-framework/user/removeFromEnterprise",async:!1,contentType:"application/json",data:JSON.stringify(r),type:"post",dataType:"json",success:function(e,r){1==e.success?xxwsWindowObj.xxwsAlert("移除成功",function(){null!=t&&""!=t&&a.$viewUser.modal("hide"),a.refreshTable(a.currentId)}):xxwsWindowObj.xxwsAlert("服务异常，请稍候重试")}})},updateuserSave:function(){var e=this,t=(e.edituserData,{enterpriseId:e.edituserData.enterpriseId,objectId:e.edituserData.objectId,deleteRoleIds:e.edituserData.roleIds,addRoleIds:$(".editcompanyRole").val(),orgId:e.edituserData.orgId}),a=$("#editposition").val().trim();if(""!=a&&null!=a){if(!checkposition(a))return;t.position=a}else t.position="";$.ajax({type:"POST",url:"/cloudlink-core-framework/user/update?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify(t),dataType:"json",success:function(t){1==t.success?xxwsWindowObj.xxwsAlert("修改成功",function(){$("#editposition").val(""),e.refreshTable(e.currentId),e.$editUser.modal("hide")}):xxwsWindowObj.xxwsAlert("服务异常，请稍候重试")}})},viewuserData:function(e){e.objectId==JSON.parse(lsObj.getLocalStorage("userBo")).objectId?($(".removeuser").css("display","none"),$(".frozenuser").css("display","none")):-1==e.status?($(".removeuser").css("display","inline-block"),$(".frozenuser").css("display","inline-block"),$(".frozenuser").css("background","#59b6fc"),$(".frozenuser").text("账户激活")):0==e.status?($(".removeuser").css("display","inline-block"),$(".frozenuser").css("display","none")):1==e.status&&($(".removeuser").css("display","inline-block"),$(".frozenuser").css("display","inline-block"),$(".frozenuser").text("账户冻结")),""!=e.userName&&null!=e.userName?$(".viewname").text(e.userName):$(".viewname").text(""),""!=e.roleNames&&null!=e.roleNames?$(".viewroleName").text(e.roleNames):$(".viewroleName").text(""),""!=e.mobileNum&&null!=e.mobileNum?$(".viewMobileNum").text(e.mobileNum):$(".viewMobileNum").text(""),""!=e.age&&null!=e.age?$(".editage").text(e.age):$(".editage").text(""),""!=e.wechat&&null!=e.wechat?$(".editwechat").text(e.wechat):$(".editwechat").text(""),null!=e.orgName&&""!=e.orgName?$(".editorgName").text(e.orgName):$(".editorgName").text(""),null!=e.position&&""!=e.position?$(".editposition").text(e.position):$(".editposition").text(""),null!=e.sex&&""!=e.sex?$(".editsex").text(e.sex):$(".editsex").text("男"),null!=e.qq&&null!=e.qq?$(".editqq").text(e.qq):$(".editqq").text(""),null!=e.email&&""!=e.email?$(".editemail").text(e.email):$(".editemail").text("")},frozenuser:function(){var e=this;-1==e.edituserData.status?(e.defaultOptions.tip="激活后，该用户可以正常访问系统？",e.defaultOptions.callBack=function(){$.ajax({url:"/cloudlink-core-framework/user/unfreeze",async:!1,contentType:"application/json",data:JSON.stringify({enterpriseId:e.edituserData.enterpriseId,objectId:e.edituserData.objectId}),type:"post",dataType:"json",success:function(t,a){1==t.success?(e.$viewUser.modal("hide"),$(".frozenuser").text("账户冻结"),e.refreshTable(e.currentId),e.edituserData.status):xxwsWindowObj.xxwsAlert("服务异常，请稍候重试")}})},xxwsWindowObj.xxwsAlert(e.defaultOptions)):(e.defaultOptions.tip="冻结后，该用户将不能进行任何操作？",e.defaultOptions.callBack=function(){$.ajax({url:"/cloudlink-core-framework/user/freeze",async:!1,contentType:"application/json",data:JSON.stringify({enterpriseId:e.edituserData.enterpriseId,objectId:e.edituserData.objectId}),type:"post",dataType:"json",success:function(t,a){1==t.success?(e.$viewUser.modal("hide"),$(".frozenuser").text("账户激活"),e.refreshTable(e.currentId),e.edituserData.status):xxwsWindowObj.xxwsAlert("服务异常，请稍候重试")}})},xxwsWindowObj.xxwsAlert(e.defaultOptions))},again:function(){this.$flag=!0}};window.operateEvents={"click .view":function(e,t,a,r){usermanager.$viewUser.modal(),usermanager.edituserData=a,usermanager.viewuserData(a)},"click .inviter":function(e,t,a,r){usermanager.againinviteUser(a)},"click .remove":function(e,t,a,r){a.objectId==JSON.parse(lsObj.getLocalStorage("userBo")).objectId?alert("您是该企业的系统管理员，当前无法移除，如需移除，请您移交系统管理员权限。\n由新系统管理员进行移除。"):(usermanager.defaultOptions.tip="您是否确定移除该用户？",usermanager.defaultOptions.callBack=function(){usermanager.removeUser(a)},xxwsWindowObj.xxwsAlert(usermanager.defaultOptions))},"click .edituser":function(e,t,a,r){usermanager.$editUser.modal(),usermanager.edituserData=a,usermanager.initClickUser()}},$("#addname").blur(function(){checkname()}),$("#tel").blur(function(){checktel()}),$("#addposition").blur(function(){checkposition($("#addposition").val().trim())}),$("#editposition").blur(function(){checkposition($("#editposition").val().trim())}),$(".age").blur(function(){var e=$(".age").val().trim();return""==e||null==e?($(".ageReg").text("请输入您的年龄"),!1):($(".ageReg").text(""),!0)}),$(".wechart").blur(function(){var e=$(".wechart").val().trim();return""==e||null==e?($(".wechartReg").text("请输入您的微信号码"),!1):($(".wechartReg").text(""),!0)}),$(".qq").blur(function(){var e=$(".qq").val().trim(),t=/^[1-9][0-9]{4,9}$/;return""==e||null==e?($(".qqReg").text("请输入您的QQ号码"),!1):t.test(e)?($(".qqReg").text(""),!0):($(".qqReg").text("您输入的QQ号码有误"),!1)}),$(".email").blur(function(){var e=$(".email").val().trim(),t=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;return""==e||null==e?($(".emailReg").text("请输入您的邮箱"),!1):t.test(e)?($(".emailReg").text(""),!0):($(".emailReg").text("您输入的邮箱格式有误"),!1)}),$(document).on("show.bs.modal",".modal",function(e){var t=1040+10*$(".modal:visible").length;$(this).css("z-index",t),setTimeout(function(){$(".modal-backdrop").not(".modal-stack").css("z-index",t-1).addClass("modal-stack")},0)}),$(document).on("hidden.bs.modal",".modal",function(e){$(".modal:visible").length>0&&$("body").addClass("modal-open")});