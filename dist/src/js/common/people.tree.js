var peopleTreeObj={$tree:$("#people_list"),_frameName:null,aPeopleName:[],selectPersonArr:[],init:function(){},requestPeopleTree:function(e,r,o){var t=this;if(t.selectPersonArr=[],t._frameName=e,r)for(var l=0;l<r.length;l++)t.selectPersonArr[l]=r[l];if(t.aAllPeople)return void t.renderPeopleTree(t.aAllPeople);$.ajax({type:"GET",url:"/cloudlink-core-framework/user/getOrgUserTree?token="+lsObj.getLocalStorage("token"),contentType:"application/json",data:{token:lsObj.getLocalStorage("token"),status:1},dataType:"json",success:function(e){var r=e.rows;if(1!=e.success)return void xxwsWindowObj.xxwsAlert("获取人员信息失败！");if(1==o)for(var l=0;l<r.length;l++)r[l].id==JSON.parse(lsObj.getLocalStorage("userBo")).objectId&&r.splice(l,1);t.aAllPeople=r,t.renderPeopleTree(t.aAllPeople)},statusCode:{404:function(){xxwsWindowObj.xxwsAlert("获取人员信息失败！")}}})},renderPeopleTree:function(e){var r=this,o={view:{showLine:!0},data:{key:{name:"treenodename"},simpleData:{enable:!0,pIdKey:"pid"}},check:{enable:!0,chkStyle:"checkbox"}};r.zTree=$.fn.zTree.init(r.$tree,o,e),r.zTree.expandAll(!0),r.setSelectPeople()},setSelectPeople:function(){var e=this;if(e.selectPersonArr.length>0)for(var r=0;r<e.selectPersonArr.length;r++){var o=e.zTree.getNodesByParam("id",e.selectPersonArr[r].relationshipPersonId,null);e.zTree.checkNode(o[0],!0,!0)}},getSelectPeople:function(){var e=this;e.aPeopleName=[],e.selectPersonArr=[];var r=null;e.zTree.getCheckedNodes(!0).forEach(function(o,t){o.isParent||(r={relationshipPersonId:o.id,relationshipPersonName:o.treenodename},e.selectPersonArr.push(r),e.aPeopleName.push(o.treenodename))});var o={key:e._frameName,selectedArr:e.selectPersonArr,selectedName:e.aPeopleName.join("，")};return $("#stakeholder").modal("hide"),o},initPeopleList:function(){var e=this;e.aPeopleName=[],e.selectPersonArr=[],e.$receiveUser.val(""),e.zTree&&e.zTree.checkAllNodes(!1)}};$(function(){peopleTreeObj.init()});