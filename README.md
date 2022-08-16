# Map

通过openlayer渲染地图，并实现功能交互。

本文档基于 [VitePress](https://vitepress.vuejs.org/) 构建

# 技术栈

vue3 + openlayers
# 运行 

yarn docs:dev

# 打包
先删除 node_modules/ol/package.json  里面的 "type": "module",不然会产生打包错误。\
如图：\
[error](./error.png) 构建

yarn docs:build
