import{i as a,a as t,m as e,n as r,o as n,c as d,f as o,p as s,w as i,q as l,at as c,g as p,v as u,x as v,_ as m}from"../../assets/app.2DJL4jsJ.js";import{A as y}from"../index/index.sBZz26mU.js";const f={class:"top-bar"},b=(a=>(u("data-v-d9662e8d"),a=a(),v(),a))((()=>o("div",{id:"map"},null,-1))),x=m(a({__name:"index",setup(a){let u,v,m;function x(){let a=!0;m=setInterval((function(){u&&(a?(u.removeLayer(v),a=!1):(u.addLayer(v),a=!0))}),1e3)}function _(){clearInterval(m)}return t((()=>{u=c.map("map",{crs:c.CRS.EPSG3857,center:[30.5217,114.3948],zoom:18}),c.tileLayer("http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",{noWrap:!0,attribution:y}).addTo(u),c.tileLayer("http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",{noWrap:!0,attribution:y}).addTo(u),v=c.rectangle([[30.52172,114.39359],[30.52153,114.39428]],{color:"red"}).addTo(u)})),e((()=>{u&&(u.remove(),u=null)})),(a,t)=>{const e=r("el-button");return n(),d(l,null,[o("div",f,[s(e,{type:"primary",onClick:x},{default:i((()=>[p("开始闪烁")])),_:1}),s(e,{type:"primary",onClick:_},{default:i((()=>[p("停止闪烁")])),_:1})]),b],64)}}}),[["__scopeId","data-v-d9662e8d"]]);export{x as default};
