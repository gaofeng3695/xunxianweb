var mapObj=function(){var n=new BMap.Map("container"),o=["50","100","200","500","1000","2000","5000","10000","20000","25000","50000","100000","20000","25000","50000","100000","200000","500000","1000000","2000000"];return{getCenterPointAndZoomLevel:function(t,e,a,r){var i=new BMap.Point(t,e),l=new BMap.Point(a,r),L=n.getDistance(i,l).toFixed(1);console.log(L);for(var d={zoomlevel:0,centerPoint:null},b=0,c=o.length;b<c;b++)if(o[b]-L>0){console.log(b),d.zoomlevel=18-b+3;break}var v=new BMap.Point((t+a)/2,(e+r)/2);return d.centerPoint=v,d},getMaxPointAndMinPoint:function(n){for(var o=0,t=0,e=999,a=999,r=n.length,i=0;i<r;i++)o<n[i].bdLon&&(o=n[i].bdLon),e>n[i].bdLon&&(e=n[i].bdLon),t<n[i].bdLat&&(t=n[i].bdLat),a>n[i].bdLat&&(a=n[i].bdLat);return{maxLon:o,maxLat:t,minLon:e,minLat:a}}}}();