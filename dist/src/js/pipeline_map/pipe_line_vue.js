var pipe_left_top={props:{title:{type:String}},template:"#pipe_left_top",methods:{click1:function(){this.$emit("click1")}}},pipe_line_list={props:{pointerdatas:{type:Array},currentnetname:{type:String},slineid:{type:String},linetotal:{type:Number},olinedetailedited:{type:[String,Object]}},template:"#pipe_line_list",components:{"pipe-left-top":pipe_left_top},methods:{deleteLine:function(e){var t=this;xxwsWindowObj.xxwsAlert("您是否确定要删除该管线?",function(){$.ajax({type:"POST",url:"/cloudlink-inspection-event/commonData/pipemapline/delete?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify({objectId:e.objectId}),dataType:"json",success:function(i){1==i.success?xxwsWindowObj.xxwsAlert("删除成功",function(){e.objectId==t.slineid&&t.$emit("checkedline",""),t.$emit("updatelinedetailbyid",e.objectId,2)}):xxwsWindowObj.xxwsAlert("服务异常，请稍候重试")}})},!0)},clickLi:function(e){var t=this;t.olinedetailedited&&e.objectId!=t.slineid?xxwsWindowObj.xxwsAlert("当前管线已修改未保存,您是否放弃对当前管线的编辑?",function(){t.$emit("checkedline",e.objectId)},!0):t.$emit("checkedline",e.objectId)},createInfo:function(){if(this.linetotal>199)return void xxwsWindowObj.xxwsAlert("您已达到系统规定管线数量(200条)，无法继续新建，如需新建请联系客服。");var e={title:"新增管线",width:"800",height:"450"},t={pipeLineName:"",pipeMaterial:"",pipeDiameter:"",pipeThickness:"",pipeLength:"",pipeLineRemark:""},i=[{title:"新建",bgcolor:"#59b6fc",color:"#fff",disabled:!1},{title:"取消",bgcolor:"#fff",color:"#333",disabled:!1}];this.$emit("createinfo",e,t,i)},back:function(){var e=this;e.olinedetailedited?xxwsWindowObj.xxwsAlert("当前管线已修改未保存,您是否放弃对当前管线的编辑?",function(){e.$emit("changelist"),e.$emit("checkedline",""),e.$emit("enterlinelist",!1)},!0):(e.$emit("changelist"),e.$emit("checkedline",""),e.$emit("enterlinelist",!1))}}},pipe_net_list={props:{pipenetdatas:{type:Array},snetid:{type:String},linetotal:{type:Number}},template:"#pipe_net_list",components:{"pipe-left-top":pipe_left_top},methods:{deleteNet:function(e){var t=this;xxwsWindowObj.xxwsAlert("您是否确定要删除该管网?",function(){$.ajax({type:"POST",url:"/cloudlink-inspection-event/commonData/pipemapnetwork/delete?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify({objectId:e.objectId}),dataType:"json",success:function(i){1==i.success?xxwsWindowObj.xxwsAlert("删除成功",function(){e.objectId==t.snetid&&t.$emit("chooseNet",""),t.$emit("updatenetdetailbyid",e.objectId,2)}):xxwsWindowObj.xxwsAlert("服务异常，请稍候重试")}})},!0)},enterInto:function(e){this.$emit("enterlinelist",!0),this.$emit("changelist",e)},createInfo:function(){var e={title:"新增管网",width:"600",height:"350"},t={pipeNetworkName:"",pipeNetworkRemark:""},i=[{title:"确定",bgcolor:"#59b6fc",color:"#fff",disabled:!1},{title:"取消",bgcolor:"#fff",color:"#333",disabled:!1}];this.$emit("createinfo",e,t,i)},clickLi:function(e){this.$emit("chooseNet",e.objectId)},checkNetToS:function(e){var t=this,i={objectId:e.objectId};"1"==+e.pipeNetworkUsed?xxwsWindowObj.xxwsAlert("当前管网已启用，是否确认关闭?",function(){i.pipeNetworkUsed=0,t.startPipe(i)},!0):xxwsWindowObj.xxwsAlert("您是否确认启用当前管网?",function(){i.pipeNetworkUsed=1,t.startPipe(i)},!0)},startPipe:function(e){var t=this;$.ajax({type:"POST",url:"/cloudlink-inspection-event/pipemapnetwork/updateStatus?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify(e),dataType:"json",success:function(i){1==i.success?"1"==+e.pipeNetworkUsed?(t.$emit("updatenetdetailbyid",e.objectId,3),xxwsWindowObj.xxwsAlert("启用成功")):(t.$emit("updatenetdetailbyid",e.objectId,3),xxwsWindowObj.xxwsAlert("关闭成功")):xxwsWindowObj.xxwsAlert("服务异常，请稍候重试")}})}}},pipe_left={props:{pipenetdatas:{type:Array},pointerdatas:{type:Array},snetid:{type:String},slineid:{type:String},olinedetailedited:{type:[String,Object]}},data:function(){return{currentList:"net",styleobj:{},currentNetName:"",chooseLine:[],netshow:!1,pipeshow:!1,show:!0,lineTotal:this.pointerdatas.length}},watch:{pointerdatas:function(){var e=this;e.chooseLine=e.pointerdatas.filter(function(t){return t.pipeNetworkId==e.snetid}),e.lineTotal=e.pointerdatas.length}},computed:{slidestyle:function(){return{"margin-left":"net"===this.currentList?"0px":"-300px "}},warpperslidestyle:function(){return{"margin-left":this.show?"0px":"-300px "}}},mounted:function(){$(".scroll").mCustomScrollbar({theme:"minimal-dark",advanced:{updateOnContentResize:!0}})},template:"#pipe-left",components:{"pipe-line-list":pipe_line_list,"pipe-net-list":pipe_net_list},methods:{chooseNet:function(e){this.$emit("choosenet",e)},checkedline:function(e){this.$emit("checkedline",e)},enterlinelist:function(e){this.$emit("enterlinelist",e)},updateNetDetailById:function(e,t){this.$emit("updatenetdetailbyid",e,t)},updateLineDetailById:function(e,t){this.$emit("updatelinedetailbyid",e,t)},changeListShow:function(){this.show?$(".up_btn").addClass("direction"):$(".up_btn").removeClass("direction"),this.show=!this.show},changelist:function(e){e?(this.currentList="line",this.currentNetName=e.pipeNetworkName,this.chooseLine=this.pointerdatas.filter(function(t){return t.pipeNetworkId==e.objectId})):this.currentList="net"},createInfo:function(e,t,i){this.styleobj=e,this.inputobj=t,this.aFooters=i,"新增管网"==this.styleobj.title&&(this.netshow=!this.netshow),"新增管线"==this.styleobj.title&&(this.pipeshow=!this.pipeshow)},createSave:function(){"新增管网"==this.styleobj.title?this.saveNet():this.saveLine()},saveNet:function(){var e=this,t={objectId:baseOperation.createuuid(),pipeNetworkName:e.inputobj.pipeNetworkName.trim(),pipeNetworkRemark:e.inputobj.pipeNetworkRemark.trim(),pipeNetworkUsed:0};e.verifyNet()&&$.ajax({type:"POST",url:"/cloudlink-inspection-event/commonData/pipemapnetwork/save?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify(t),dataType:"json",success:function(i){1==i.success?xxwsWindowObj.xxwsAlert("新增管网成功",function(){e.netshow=!e.netshow,e.$emit("updatenetdetailbyid",t.objectId,1)}):xxwsWindowObj.xxwsAlert("服务异常，请稍候重试")}})},saveLine:function(){var e=this,t={objectId:baseOperation.createuuid(),pipeNetworkId:this.snetid,pipeLineName:this.inputobj.pipeLineName.trim(),pipeMaterial:this.inputobj.pipeMaterial.trim(),pipeDiameter:this.inputobj.pipeDiameter.trim(),pipeThickness:this.inputobj.pipeThickness.trim(),pipeFactLength:this.inputobj.pipeLength.trim(),pipeLineRemark:this.inputobj.pipeLineRemark.trim(),pipeColor:"#59B6FC",pipeStyle:"solid",pipeWeight:"3"};e.verifyPipe()&&$.ajax({type:"POST",url:"/cloudlink-inspection-event/commonData/pipemapline/save?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:JSON.stringify(t),dataType:"json",success:function(i){1==i.success?xxwsWindowObj.xxwsAlert("新增管线成功",function(){e.pipeshow=!e.pipeshow,e.$emit("updatelinedetailbyid",t.objectId,1)}):xxwsWindowObj.xxwsAlert("服务异常，请稍候重试")}})},verifyNet:function(){var e=this;return 0==e.inputobj.pipeNetworkName.trim().length?(xxwsWindowObj.xxwsAlert("管网名称不能为空"),!1):e.inputobj.pipeNetworkName.trim().length>50?(xxwsWindowObj.xxwsAlert("管网名称长度不能超过50个字"),!1):!(e.inputobj.pipeNetworkRemark.trim().length>201)||(xxwsWindowObj.xxwsAlert("管网备注不能超过200个字"),!1)},verifyPipe:function(){if(0==this.inputobj.pipeLineName.trim().length)return xxwsWindowObj.xxwsAlert("管线名称不能为空"),!1;if(this.inputobj.pipeLineName.trim().length>50)return xxwsWindowObj.xxwsAlert("管线名称长度不能超过50个字"),!1;if(this.inputobj.pipeMaterial.trim().length>50)return xxwsWindowObj.xxwsAlert("管线材质长度不能超过50个字"),!1;if(this.inputobj.pipeDiameter.trim().length>50)return xxwsWindowObj.xxwsAlert("管线管径长度不能超过50个字"),!1;if(this.inputobj.pipeThickness.trim().length>50)return xxwsWindowObj.xxwsAlert("管线壁厚长度不能超过50个字"),!1;if(this.inputobj.pipeLength.trim().length>0){var e=!0;return/^[0-9]{1,1}\d{0,8}(\.\d{1,3})?$/.test(this.inputobj.pipeLength.trim())||(xxwsWindowObj.xxwsAlert("管线实际长度格式错误"),e=!1),e}return!(this.inputobj.pipeLineRemark.trim().length>201)||(xxwsWindowObj.xxwsAlert("管线备注长度不能超过200个字"),!1)}}};