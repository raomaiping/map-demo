import{i as s,T as i,X as a,a as n,m as l,o as h,c as p,M as k,t,G as E,a0 as e,a1 as r,_ as d,p as g,f as y,g as F,h as o}from"./app.2DJL4jsJ.js";import{A as c,M as C}from"../js/index/index.sBZz26mU.js";const B={id:"map"},u=d(s({__name:"index",setup(s){const d=new i({source:new a({attributions:c,url:C,maxZoom:20})});let g=null;return n((()=>{g=new k({target:"map",layers:[d],view:new t({projection:"EPSG:4326",center:[0,0],zoom:5}),controls:E().extend([new e({className:"ol-overviewmap ol-custom-overviewmap",layers:[new i({source:new r({url:"https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=0e6fc415256d4fbb9b5166a718591d71"})})],collapseLabel:"»",label:"«",collapsed:!1})])})})),l((()=>{g&&(g.dispose(),g=null)})),(s,i)=>(h(),p("div",B))}}),[["__scopeId","data-v-92315d13"]]),m=y("h1",{id:"鹰眼控件",tabindex:"-1"},[F("鹰眼控件 "),y("a",{class:"header-anchor",href:"#鹰眼控件","aria-label":'Permalink to "鹰眼控件"'},"​")],-1),A=y("div",{class:"tip custom-block"},[y("p",{class:"custom-block-title"},"TIP"),y("p",null,"在地图右上角添加鹰眼控件。")],-1),D=o("",2),v=JSON.parse('{"title":"鹰眼控件","description":"","frontmatter":{},"headers":[],"relativePath":"open-layers/map-controls/overview-map/index.md","filePath":"open-layers/map-controls/overview-map/index.md","lastUpdated":1704792985000}'),w={name:"open-layers/map-controls/overview-map/index.md"},q=Object.assign(w,{setup:s=>(s,i)=>(h(),p("div",null,[m,A,g(u),D]))});export{v as __pageData,q as default};