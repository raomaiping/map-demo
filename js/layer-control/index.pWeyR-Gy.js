import{i as t,a,m as e,o,c as r,at as n,_ as i}from"../../assets/app.2DJL4jsJ.js";import{A as d}from"../index/index.sBZz26mU.js";const c={id:"map"},l=i(t({__name:"index",setup(t){let i=null;return a((()=>{(()=>{i=n.map("map",{zoomControl:!1,crs:n.CRS.EPSG3857,center:[22.548857,114.064839],minZoom:1,maxZoom:18,zoom:18,maxBounds:n.latLngBounds(n.latLng(-180,-180),n.latLng(180,180))});const t=n.tileLayer("http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",{noWrap:!0,attribution:d}),a=n.tileLayer("http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",{noWrap:!0,attribution:d}),e=n.tileLayer("http://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",{noWrap:!0,attribution:d}),o=n.tileLayer("http://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",{noWrap:!0,attribution:d}),r=n.layerGroup([t,a]),c={"天地图矢量":r,"天地图影像":n.layerGroup([e,o])};i.addLayer(r),n.control.layers(c).addTo(i)})()})),e((()=>{i&&(i.remove(),i=null)})),(t,a)=>(o(),r("div",c))}}),[["__scopeId","data-v-e228e7fd"]]);export{l as default};
