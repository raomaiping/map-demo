import{ax as t,i as e,a,m as i,o as s,c as o,at as n,_ as r}from"../../assets/app.2DJL4jsJ.js";import{A as m}from"../index/index.sBZz26mU.js";const l="http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=";t.CRS.BAIDU=new t.Proj.CRS("EPSG:900913","+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs",{resolutions:function(){const t=[];t[0]=Math.pow(2,18);for(let e=1;e<19;e++)t[e]=Math.pow(2,18-e);return t}(),origin:[0,0],bounds:t.bounds([20037508.342789244,0],[0,20037508.342789244])}),t.tileLayer.baidu=function(e){let a;const i="0123456789";switch((e=e||{}).layer){case"vec":default:case"custom":a=t.tileLayer(l,{subdomains:i,tms:!0,attribution:e.attribution||m});break;case"img_d":a=t.tileLayer("http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46",{subdomains:i,tms:!0,attribution:e.attribution||m});break;case"img_z":a=t.tileLayer("http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles="+(e.bigfont?"sh":"sl")+"&v=020",{subdomains:i,tms:!0,attribution:e.attribution||m});break;case"time":var s=(new Date).getTime();a=t.tileLayer("http://its.map.baidu.com:8002/traffic/TrafficTileService?x={x}&y={y}&level={z}&time="+s+"&label=web2D&v=017",{subdomains:i,tms:!0,attribution:e.attribution||m});break;case"img":a=t.layerGroup([t.tileLayer.baidu({layer:"img_d",bigfont:e.bigfont}),t.tileLayer.baidu({layer:"img_z",bigfont:e.bigfont})])}return a};const b={id:"map"},u=r(e({__name:"index",setup(t){let e=null;return a((()=>{e=n.map("map",{crs:n.CRS.BAIDU,center:[22.548857,114.064839],minZoom:1,maxZoom:18,zoom:12}),n.tileLayer.baidu({layer:"vec"}).addTo(e)})),i((()=>{e&&(e.remove(),e=null)})),(t,e)=>(s(),o("div",b))}}),[["__scopeId","data-v-08760b8e"]]);export{u as default};
