import{i as s,T as i,X as a,C as n,l as h,S as k,F as l,V as p,a8 as t,z as E,ar as e,k as r,a as y,M as d,t as g,m as F,o,c,_ as C,p as B,f as u,g as A,h as D}from"./app.2DJL4jsJ.js";import{A as m,M as q}from"../js/index/index.sBZz26mU.js";const w={id:"map"},S=C(s({__name:"index",setup(s){const C=new i({source:new a({attributions:m,url:q,maxZoom:20})}),B=new n({radius:5,fill:void 0,stroke:new h({color:"red",width:1})}),u={Point:new k({image:B}),LineString:new k({stroke:new h({color:"green",width:1})}),MultiLineString:new k({stroke:new h({color:"green",width:1})}),MultiPoint:new k({image:B}),MultiPolygon:new k({stroke:new h({color:"yellow",width:1}),fill:new l({color:"rgba(255, 255, 0, 0.1)"})}),Polygon:new k({stroke:new h({color:"blue",lineDash:[4],width:3}),fill:new l({color:"rgba(0, 0, 255, 0.1)"})}),GeometryCollection:new k({stroke:new h({color:"magenta",width:2}),fill:new l({color:"magenta"}),image:new n({radius:10,fill:void 0,stroke:new h({color:"magenta"})})}),Circle:new k({stroke:new h({color:"red",width:2}),fill:new l({color:"rgba(255,0,0,0.2)"})})},A=new p({features:(new t).readFeatures({type:"FeatureCollection",crs:{type:"name",properties:{name:"EPSG:3857"}},features:[{type:"Feature",geometry:{type:"Point",coordinates:[0,0]}},{type:"Feature",geometry:{type:"LineString",coordinates:[[4e6,-2e6],[8e6,2e6]]}},{type:"Feature",geometry:{type:"LineString",coordinates:[[4e6,2e6],[8e6,-2e6]]}},{type:"Feature",geometry:{type:"Polygon",coordinates:[[[-5e6,-1e6],[-3e6,-1e6],[-4e6,1e6],[-5e6,-1e6]]]}},{type:"Feature",geometry:{type:"MultiLineString",coordinates:[[[-1e6,-75e4],[-1e6,75e4]],[[1e6,-75e4],[1e6,75e4]],[[-75e4,-1e6],[75e4,-1e6]],[[-75e4,1e6],[75e4,1e6]]]}},{type:"Feature",geometry:{type:"MultiPolygon",coordinates:[[[[-5e6,6e6],[-3e6,6e6],[-3e6,8e6],[-5e6,8e6],[-5e6,6e6]]],[[[-2e6,6e6],[0,6e6],[0,8e6],[-2e6,8e6],[-2e6,6e6]]],[[[1e6,6e6],[3e6,6e6],[3e6,8e6],[1e6,8e6],[1e6,6e6]]]]}},{type:"Feature",geometry:{type:"GeometryCollection",geometries:[{type:"LineString",coordinates:[[-5e6,-5e6],[0,-5e6]]},{type:"Point",coordinates:[4e6,-5e6]},{type:"Polygon",coordinates:[[[1e6,-6e6],[3e6,-6e6],[2e6,-4e6],[1e6,-6e6]]]}]}}]})});A.addFeature(new E(new e([5e6,7e6],1e6)));const D=new r({source:A,style:function(s){const i=s.getGeometry();if(i)return u[i.getType()]}});let S=null;return y((()=>{S=new d({layers:[C,D],target:"map",view:new g({center:[0,0],zoom:2})})})),F((()=>{S&&(S.dispose(),S=null)})),(s,i)=>(o(),c("div",w))}}),[["__scopeId","data-v-8a1539d8"]]),f=u("h1",{id:"geojson",tabindex:"-1"},[A("GeoJSON "),u("a",{class:"header-anchor",href:"#geojson","aria-label":'Permalink to "GeoJSON"'},"​")],-1),P=u("div",{class:"tip custom-block"},[u("p",{class:"custom-block-title"},"TIP"),u("p",null,[A("加载 "),u("code",null,"GeoJSON"),A(" 数据")])],-1),b=D("",2),v=JSON.parse('{"title":"GeoJSON","description":"","frontmatter":{},"headers":[],"relativePath":"open-layers/third-party-map-display/geo-json/index.md","filePath":"open-layers/third-party-map-display/geo-json/index.md","lastUpdated":1704792985000}'),L={name:"open-layers/third-party-map-display/geo-json/index.md"},M=Object.assign(L,{setup:s=>(s,i)=>(o(),c("div",null,[f,P,B(S),b]))});export{v as __pageData,M as default};
