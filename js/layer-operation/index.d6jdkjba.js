import{i as a,a as t,m as e,o as r,c as n,at as o,ay as i,_ as c}from"../../assets/app.2DJL4jsJ.js";import{A as d}from"../index/index.sBZz26mU.js";const s={id:"map"},b=c(a({__name:"index",setup(a){let c=null;return t((()=>{(()=>{c=o.map("map",{crs:o.CRS.EPSG3857,center:[22.548857,114.064839],zoom:10});const a=o.tileLayer("http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",{noWrap:!0,attribution:d}),t=o.tileLayer("http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",{noWrap:!0,attribution:d}),e=o.tileLayer("http://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",{noWrap:!0,attribution:d}),r=o.tileLayer("http://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",{noWrap:!0,attribution:d}),n=o.layerGroup([a,t]),s={"矢量":n,"影像":o.layerGroup([e,r])};c.addLayer(n),o.control.layers(s).addTo(c),c.on("baselayerchange",(a=>{i.alert(`当前图层已切换为${a.name}图层`,"图层操作事件触发了",{confirmButtonText:"收到"})}))})()})),e((()=>{c&&(c.remove(),c=null)})),(a,t)=>(r(),n("div",s))}}),[["__scopeId","data-v-392bafbb"]]);export{b as default};
