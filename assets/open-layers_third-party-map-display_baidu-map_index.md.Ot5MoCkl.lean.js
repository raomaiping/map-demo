import{i as s,ai as i,an as a,ao as n,T as h,a as l,M as k,t as p,m as t,o as e,c as E,_ as r,p as d,f as g,g as y,h as F}from"./app.2DJL4jsJ.js";import{A as o}from"../js/index/index.sBZz26mU.js";const c={id:"map"},A=r(s({__name:"index",setup(s){const r=i("EPSG:3857"),d=[];for(let i=0;i<19;i+=1)d[i]=Math.pow(2,18-i);const g=new a({origin:[0,0],resolutions:d}),y=new n({projection:r,tileGrid:g,attributions:o,tileUrlFunction:s=>{if(!s)return"";const i=s[0];let a=s[1],n=s[2];return a<0&&(a="M"+-a),n<0&&(n="M"+-n),"http://online3.map.bdimg.com/onlinelabel/?qt=tile&x="+a+"&y="+n+"&z="+i+"&styles=pl&udt=20151021&scaler=1&p=1"}}),F=new h({source:y});let A=null;return l((()=>{A=new k({target:"map",layers:[F],view:new p({center:[0,0],zoom:2})})})),t((()=>{A&&(A.dispose(),A=null)})),(s,i)=>(e(),E("div",c))}}),[["__scopeId","data-v-aa152672"]]),D=g("h1",{id:"百度地图",tabindex:"-1"},[y("百度地图 "),g("a",{class:"header-anchor",href:"#百度地图","aria-label":'Permalink to "百度地图"'},"​")],-1),C=g("div",{class:"tip custom-block"},[g("p",{class:"custom-block-title"},"TIP"),g("p",null,"加载百度地图。")],-1),u=F("",2),m=JSON.parse('{"title":"百度地图","description":"","frontmatter":{},"headers":[],"relativePath":"open-layers/third-party-map-display/baidu-map/index.md","filePath":"open-layers/third-party-map-display/baidu-map/index.md","lastUpdated":1704792985000}'),B={name:"open-layers/third-party-map-display/baidu-map/index.md"},q=Object.assign(B,{setup:s=>(s,i)=>(e(),E("div",null,[D,C,d(A),u]))});export{m as __pageData,q as default};
