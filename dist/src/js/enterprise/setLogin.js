function relaodEnterprise(){var e="",t="",s=JSON.parse(lsObj.getLocalStorage("userBo")),o={userId:s.objectId,status:"0,1"};$.ajax({type:"GET",url:"/cloudlink-core-framework/enterprise/getByUserId?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:o,dataType:"json",success:function(o){if(1==o.success){for(var n=o.rows,a=0;a<n.length;a++)n[a].objectId==s.enterpriseId?e='<div class="row"><div class = "col-md-2" ></div> <div class = "col-md-8"><div class = "radio on_check"><label><input type = "radio"  name = "optionEnterprise"   id = "loginnowId" value = "'+n[a].objectId+'" checked ><span>'+n[a].enterpriseName+'（默认登录）</span> </label > </div></div > <div class = "col-md-2" ></div></div > ':"0"==n[a].status?t+='<div class="row"><div class = "col-md-2" ></div> <div class = "col-md-8"><div class = "radio"><label><input type = "radio"  name = "optionEnterprise"   id = "nojoin'+a+'" value = "'+n[a].objectId+'"  ><span>'+n[a].enterpriseName+'（ 受邀企业)</span> </label > </div></div > <div class = "col-md-2" ></div></div > ':"1"==n[a].status&&(t+='<div class="row"><div class = "col-md-2" ></div> <div class = "col-md-8"><div class = "radio"><label><input type = "radio"  name = "optionEnterprise"   id = "join'+a+'" value = "'+n[a].objectId+'"  ><span>'+n[a].enterpriseName+'</span> </label > </div></div > <div class = "col-md-2" ></div></div > ');$(".allenterprised").append(e+t)}}})}function getDefaultEnterpriseId(e){$.ajax({type:"POST",url:"/cloudlink-core-framework/login/getDefaultEnterpriseId",contentType:"application/json",data:JSON.stringify({userId:e}),dataType:"json",success:function(e){1==e.success&&e.rows.length>0&&joinDefaultEnterprise(e.rows[0].enterpriseId)},error:function(e,t,s){console.log(e),console.log(t),console.log(s)}})}function joinDefaultEnterprise(e){var t=JSON.parse(lsObj.getLocalStorage("userBo"));$.ajax({type:"POST",url:"/cloudlink-core-framework/login/joinEnterprise",contentType:"application/json",data:JSON.stringify({userId:t.objectId,enterpriseId:e}),dataType:"json",success:function(e){if(1==e.success){var t=e.rows,s=e.token;lsObj.setLocalStorage("token",s),lsObj.setLocalStorage("userBo",JSON.stringify(t[0])),lsObj.setLocalStorage("timeOut",(new Date).getTime()+828e5),parent.location.href="../../main.html"}else switch(e.code){case"400":$(".hidkuai2 span").text("服务异常");break;case"401":$(".hidkuai2 span").text("参数异常");break;case"E01":$(".hidkuai2 span").text("您的账户已被该企业冻结");break;case"E02":$(".hidkuai2 span").text("您的账户已被该企业移除");break;case"E03":$(".hidkuai2 span").text("该企业不存在")}},error:function(e,t,s){console.log(e),console.log(t),console.log(s)}})}$(function(){relaodEnterprise()}),$("body").on("click",".radio",function(){$(".radio").removeClass("on_check"),$(this).addClass("on_check"),$(this).find("input[type='radio']").prop("checked",!0)}),$(".setdefault button").click(function(){var e="",t="";t=$("input[name='optionEnterprise']:checked").val(),e=$("input[name='optionEnterprise']:checked").attr("id");var s=JSON.parse(lsObj.getLocalStorage("userBo"));"loginnowId"==e?xxwsWindowObj.xxwsAlert("当前企业已经登录"):null==t||""==t?xxwsWindowObj.xxwsAlert("请选择一个默认企业后，才可登录成功"):""!=e?$.ajax({type:"POST",url:"/cloudlink-core-framework/user/setDefaultEnterpriseAndJoin?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify({userId:s.objectId,enterpriseId:t}),dataType:"json",success:function(e){1==e.success?getDefaultEnterpriseId(s.objectId):xxwsWindowObj.xxwsAlert("服务异常，请稍候重试")}}):$.ajax({type:"POST",url:"/cloudlink-core-framework/user/setDefaultEnterprise?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify({userId:s.objectId,enterpriseId:t}),dataType:"json",success:function(e){1==e.success?getDefaultEnterpriseId(s.objectId):xxwsWindowObj.xxwsAlert("默认企业设置失败，请重新登录进行设置")}})}),$(".return button").click(function(){parent.location.href="../../main.html"});