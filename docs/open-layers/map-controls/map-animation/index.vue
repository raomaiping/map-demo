<template>
  <div class="btns">
    <el-button type="primary" @click="handleSpin">旋转定位到沈阳</el-button>
    <el-button type="primary" @click="handleElastic">弹性定位到北京</el-button>
    <el-button type="primary" @click="handleBounce">反弹定位到上海</el-button>
    <el-button type="primary" @click="handleRotate">围绕武汉旋转</el-button>
    <el-button type="primary" @click="handleFly">飞行定位到广州</el-button>
  </div>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from "vue";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";
import { easeIn, easeOut } from "ol/easing";
import { MAPURL, ATTRIBUTIONS } from "../../../constants";
import XYZ from "ol/source/XYZ";

let map: Map | null = null;

const raster = new TileLayer({
  source: new XYZ({
    attributions: ATTRIBUTIONS,
    url: MAPURL,
    maxZoom: 20,
  }),
});

const view = new View({
  //地图初始中心点
  center: [12950000, 4860000],
  //地图初始显示级别
  zoom: 11,
});

const initMap = () => {
  map = new Map({
    //初始化map
    target: "map",
    //地图容器中加载的图层
    layers: [
      //加载瓦片图层数据
      raster,
    ],
    view,
  });
};

//各定位点(中国省会城市)
const shenyang = fromLonLat([123.24, 41.5]);
const beijing = fromLonLat([116.28, 39.54]);
const shanghai = fromLonLat([121.29, 31.14]);
const wuhan = fromLonLat([114.21, 30.37]);
const guangzhou = fromLonLat([113.15, 23.08]);

// 获取反弹值
function bounce(t) {
  let s = 7.5625,
    p = 2.75,
    l;
  if (t < 1 / p) {
    l = s * t * t;
  } else {
    if (t < 2 / p) {
      t -= 1.5 / p;
      l = s * t * t + 0.75;
    } else {
      if (t < 2.5 / p) {
        t -= 2.25 / p;
        l = s * t * t + 0.9375;
      } else {
        t -= 2.625 / p;
        l = s * t * t + 0.984375;
      }
    }
  }
  return l;
}
// 获取弹性伸缩值
function elastic(t) {
  return (
    Math.pow(2, -10 * t) * Math.sin(((t - 0.075) * (2 * Math.PI)) / 0.3) + 1
  );
}

// 旋转定位到沈阳
const handleSpin = () => {
  const center = view.getCenter();
  if (!center) return;
  view.animate(
    //第一个过程
    {
      //动画结束时的视图中心,即当前视图中心同目标视图中心连线的中心点
      center: [
        center[0] + (shenyang[0] - shenyang[0]) / 2,
        center[1] + (shenyang[1] - shenyang[1]) / 2,
      ],
      rotation: Math.PI, //动画结束时的旋转角度，即180度
      easing: easeIn, //按每一帧动画控制的动画速度，即开始缓慢并逐渐加快速度
    },
    //第二个过程
    {
      center: shenyang, //动画结束时的视图中心
      rotation: 2 * Math.PI, //动画结束时的旋转角度，即360度回正
      easing: easeOut, //按每一帧动画控制的动画速度，即开始快速并逐渐减速
    }
  );
};

// 弹性定位到北京
const handleElastic = () => {
  view.animate({
    center: beijing, ///动画结束时的视图中心
    duration: 2000, //动画的持续时间（以毫秒为单位）
    easing: elastic, //按每一帧动画控制的动画持续时间函数
  });
};

// 反弹定位到上海
const handleBounce = () => {
  view.animate({
    center: shanghai, ///动画结束时的视图中心
    duration: 2000, //动画的持续时间（以毫秒为单位）
    easing: bounce, //按每一帧动画控制的动画持续时间函数
  });
};

// 围绕武汉旋转
const handleRotate = () => {
  const rotation = view.getRotation();
  view.animate(
    //第一个过程
    {
      rotation: rotation + Math.PI, //第一次动画旋转角度
      anchor: wuhan, //自旋的中心点，即武汉
      easing: easeIn, ////按每一帧动画控制的动画速度，即开始缓慢并逐渐加快速度
    },
    //第二个过程
    {
      rotation: rotation + 2 * Math.PI, //动画结束时的旋转角度，即360度回正
      anchor: wuhan, // 旋转中心点
      easing: easeOut, ///按每一帧动画控制的动画速度，即开始快速并逐渐减速
    }
  );
};

// handleFly
const handleFly = () => {
  const duration = 2000; //动画的持续时间（以毫秒为单位）
  const zoom = view.getZoom();
  if (!zoom) return;
  //第一个动画
  view.animate({
    center: guangzhou,
    duration: duration,
  });
  //第二个动画
  view.animate(
    {
      zoom: zoom - 1,
      duration: duration / 2,
    },
    {
      zoom: zoom,
      duration: duration / 2,
    }
  );
};

onMounted(() => {
  initMap();
});

onBeforeUnmount(() => {
  if (map) {
    map.dispose();
    map = null;
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 100%;
  height: 650px;
}

.btns {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
}
</style>
