import{i as a,a as t,m as e,o,c as n,at as d,aw as r,_ as i}from"../../assets/app.2DJL4jsJ.js";import{A as s}from"../index/index.sBZz26mU.js";const m={id:"map"},l=i(a({__name:"index",setup(a){let i=null;return t((()=>{(()=>{i=d.map("map",{zoomControl:!1,crs:d.CRS.EPSG3857,center:[22.548857,114.064839],minZoom:1,maxZoom:18,zoom:18,maxBounds:d.latLngBounds(d.latLng(-180,-180),d.latLng(180,180))}),d.tileLayer("http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",{noWrap:!0,attribution:s}).addTo(i),d.tileLayer("http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",{noWrap:!0,attribution:s}).addTo(i);const a=new d.TileLayer("http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",{minZoom:1,maxZoom:18,noWrap:!0}),t=new r(a,{toggleDisplay:!0});i.addControl(t)})()})),e((()=>{i&&(i.remove(),i=null)})),(a,t)=>(o(),n("div",m))}}),[["__scopeId","data-v-688b2fbd"]]);export{l as default};