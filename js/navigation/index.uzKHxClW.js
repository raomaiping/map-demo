import{i as a,a as o,m as t,o as e,c as s,at as n,_ as m}from"../../assets/app.2DJL4jsJ.js";import{M as r,A as d}from"../index/index.sBZz26mU.js";const i={id:"map"},l=m(a({__name:"index",setup(a){let m=null;return o((()=>{m=n.map("map",{zoomControl:!1,crs:n.CRS.EPSG3857,center:[22.548857,114.064839],minZoom:1,maxZoom:18,zoom:10,maxBounds:n.latLngBounds(n.latLng(-180,-180),n.latLng(180,180))}),n.tileLayer(r,{noWrap:!0,attribution:d}).addTo(m),n.control.navbar({forwardTitle:"前进",backTitle:"后退",homeTitle:"回到地图初始位置"}).addTo(m)})),t((()=>{m&&(m.remove(),m=null)})),(a,o)=>(e(),s("div",i))}}),[["__scopeId","data-v-a6facb20"]]);export{l as default};