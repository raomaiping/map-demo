import{i as a,a as n,m as o,o as e,c as s,at as t,_ as i}from"../../assets/app.2DJL4jsJ.js";import{M as p,A as r}from"../index/index.sBZz26mU.js";const d={id:"map"},m=i(a({__name:"index",setup(a){let i=null;return n((()=>{i=t.map("map",{crs:t.CRS.EPSG3857,center:[42.45,-71.11],minZoom:1,maxZoom:18,zoom:15}),t.tileLayer(p,{noWrap:!0,attribution:r}).addTo(i),new t.GPX("/gpx/fells_loop.gpx",{async:!0,marker_options:{startIconUrl:"/image/pin-icon-start.png",endIconUrl:"/image/pin-icon-end.png",shadowUrl:"/image/pin-shadow.png",wptIconUrls:{"":"/image/pin-icon-wpt.png"}}}).on("loaded",(a=>{null==i||i.fitBounds(a.target.getBounds())})).addTo(i)})),o((()=>{i&&(i.remove(),i=null)})),(a,n)=>(e(),s("div",d))}}),[["__scopeId","data-v-4408b194"]]);export{m as default};