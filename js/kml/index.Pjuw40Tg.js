import{i as a,a as e,m as t,o as s,c as r,at as m,_ as n}from"../../assets/app.2DJL4jsJ.js";import{M as o,A as i}from"../index/index.sBZz26mU.js";const l={id:"map"},p=n(a({__name:"index",setup(a){let n=null;return e((()=>{n=m.map("map",{crs:m.CRS.EPSG3857,center:[36.148,-112.335],minZoom:1,maxZoom:18,zoom:15}),m.tileLayer(o,{noWrap:!0,attribution:i}).addTo(n),fetch("/kml/KML_Samples.kml").then((a=>a.text())).then((a=>{if(null===n)return;const e=(new DOMParser).parseFromString(a,"text/xml"),t=new m.KML(e);n.addLayer(t)}))})),t((()=>{n&&(n.remove(),n=null)})),(a,e)=>(s(),r("div",l))}}),[["__scopeId","data-v-e1467b9f"]]);export{p as default};