import{i as s,T as i,X as a,S as n,C as h,F as l,l as k,k as p,V as t,as as E,a as e,M as r,t as d,m as g,o as y,c as F,_ as o,p as c,f as u,g as C,h as A}from"./app.2DJL4jsJ.js";import{A as m,M as B}from"../js/index/index.sBZz26mU.js";const D={id:"map",class:"map"},f=o(s({__name:"index",setup(s){const o=new i({source:new a({attributions:m,url:B,maxZoom:20})}),c={Point:new n({image:new h({fill:new l({color:"rgba(255,255,0,0.4)"}),radius:5,stroke:new k({color:"#ff0",width:1})})}),LineString:new n({stroke:new k({color:"#f00",width:3})}),MultiLineString:new n({stroke:new k({color:"#0f0",width:3})})},u=new p({source:new t({url:"/gpx/fells_loop.gpx",format:new E}),style:function(s){const i=s.getGeometry();if(i)return c[i.getType()]}});let C=null;return e((()=>{C=new r({layers:[o,u],target:"map",view:new d({center:[-7916041.528716288,5228379.045749711],zoom:12})})})),g((()=>{C&&(C.dispose(),C=null)})),(s,i)=>(y(),F("div",D))}}),[["__scopeId","data-v-cb3de3ed"]]),w=u("h1",{id:"gpx",tabindex:"-1"},[C("GPX "),u("a",{class:"header-anchor",href:"#gpx","aria-label":'Permalink to "GPX"'},"​")],-1),q=u("div",{class:"tip custom-block"},[u("p",{class:"custom-block-title"},"TIP"),u("p",null,[C("加载 "),u("code",null,"GPX"),C(" 数据")])],-1),S=A("",2),x=JSON.parse('{"title":"GPX","description":"","frontmatter":{},"headers":[],"relativePath":"open-layers/third-party-map-display/gpx/index.md","filePath":"open-layers/third-party-map-display/gpx/index.md","lastUpdated":1704792985000}'),v={name:"open-layers/third-party-map-display/gpx/index.md"},T=Object.assign(v,{setup:s=>(s,i)=>(y(),F("div",null,[w,q,c(f),S]))});export{x as __pageData,T as default};
