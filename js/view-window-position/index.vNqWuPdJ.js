import{i as t,a,m as e,n,o,c as r,f as s,p as l,w as u,q as i,at as m,ay as p,g as c,v as d,x as g,_ as f}from"../../assets/app.2DJL4jsJ.js";import{M as x,A as y}from"../index/index.sBZz26mU.js";const $={class:"top-bar"},_=(t=>(d("data-v-e8550679"),t=t(),g(),t))((()=>s("div",{id:"map"},null,-1))),B=f(t({__name:"index",setup(t){let d=null;const g=()=>{if(null===d)return;const t=d.getCenter();p.alert(`经度${t.lng} , 纬度${t.lat}`,"当前视图中心",{confirmButtonText:"收到"})},f=()=>{if(null===d)return;const t=d.getZoom();p.alert(`${t}级`,"当前显示级数",{confirmButtonText:"收到"})},B=()=>{if(null===d)return;const t=d.getBounds(),a=t.getSouthWest().lat,e=t.getSouthWest().lng,n=t.getNorthEast().lat,o=t.getNorthEast().lng;p.alert(`<p>经度：${e} 至 ${o}</p><p>纬度：${a} 至 ${n}</p>`,"当前地图范围：",{confirmButtonText:"收到",dangerouslyUseHTMLString:!0})},C=()=>{if(null===d)return;const t=d.getSize();p.alert(`宽${t.x},高${t.y}`,"当前视窗范围",{confirmButtonText:"收到"})};return a((()=>{d=m.map("map",{zoomControl:!1,crs:m.CRS.EPSG3857,center:[22.548857,114.064839],minZoom:1,maxZoom:18,zoom:10,maxBounds:m.latLngBounds(m.latLng(-180,-180),m.latLng(180,180))}),m.tileLayer(x,{noWrap:!0,attribution:y}).addTo(d)})),e((()=>{d&&(d.remove(),d=null)})),(t,a)=>{const e=n("el-button");return o(),r(i,null,[s("div",$,[l(e,{type:"primary",onClick:g},{default:u((()=>[c("当前中心")])),_:1}),l(e,{type:"primary",onClick:f},{default:u((()=>[c("当前级数")])),_:1}),l(e,{type:"primary",onClick:B},{default:u((()=>[c("当前地图范围")])),_:1}),l(e,{type:"primary",onClick:C},{default:u((()=>[c("当前视口范围")])),_:1})]),_],64)}}}),[["__scopeId","data-v-e8550679"]]);export{B as default};
