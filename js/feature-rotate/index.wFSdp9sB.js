import{i as a,a as t,m as e,o as r,c as o,at as i,_ as n}from"../../assets/app.2DJL4jsJ.js";import{A as d}from"../index/index.sBZz26mU.js";const s={id:"map"},c=n(a({__name:"index",setup(a){let n=null;return t((()=>{n=i.map("map",{crs:i.CRS.EPSG3857,center:[30.5217,114.3948],dragging:!1,zoom:18}),i.tileLayer("http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",{noWrap:!0,attribution:d}).addTo(n),i.tileLayer("http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",{noWrap:!0,attribution:d}).addTo(n),i.rectangle([[30.52172,114.39359],[30.52153,114.39428]],{color:"#ff7800",weight:1,fillOpacity:.5,transform:!0}).addTo(n).transform.enable({rotation:!0,scaling:!0,uniformScaling:!0})})),e((()=>{n&&(n.remove(),n=null)})),(a,t)=>(r(),o("div",s))}}),[["__scopeId","data-v-9d4ca99c"]]);export{c as default};
