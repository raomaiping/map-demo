import{i as a,a as t,m as e,o as n,c as s,at as o,ay as r,_ as l}from"../../assets/app.2DJL4jsJ.js";import{M as i,A as p}from"../index/index.sBZz26mU.js";const m={id:"map"},d=l(a({__name:"index",setup(a){let l=null;return t((()=>{l=o.map("map",{crs:o.CRS.EPSG3857,center:[22.548857,114.064839],zoom:10}),o.tileLayer(i,{noWrap:!0,attribution:p}).addTo(l),l.on("click",(a=>{r.alert(`点击位置为<p>经度：${a.latlng.lng}</p><p>纬度：${a.latlng.lat}</p>`,"地图被单击了！",{confirmButtonText:"收到",dangerouslyUseHTMLString:!0})})),l.on("keypress",(a=>{r.alert(`${a.originalEvent.key}键被按下了`,"按下了键盘!",{confirmButtonText:"收到"})}))})),e((()=>{l&&(l.remove(),l=null)})),(a,t)=>(n(),s("div",m))}}),[["__scopeId","data-v-da8c6a60"]]);export{d as default};