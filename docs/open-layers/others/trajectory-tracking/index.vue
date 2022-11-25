<template>
  <div id="map">
    <div class="setting">
      滑动控制速度:
      <el-slider v-model="state.speed" class="slider" :min="10" :max="999" />
      <el-button
        type="primary"
        :icon="!state.isPlay ? VideoPlay : VideoPause"
        @click="handleStatus"
      >
        {{ !state.isPlay ? "开启" : "关闭" }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, onBeforeUnmount } from "vue";
import { Map, View, Feature } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { defaults, FullScreen } from "ol/control";
import { XYZ, Vector as VectorSource } from "ol/source";
import { Polyline } from "ol/format";
import { Point, Geometry, LineString } from "ol/geom";
import { getVectorContext } from "ol/render";
import { Style, Stroke, Icon, Text, Fill } from "ol/style";
import { VideoPlay, VideoPause } from "@element-plus/icons-vue";
import { Coordinate } from "ol/coordinate";
import { ATTRIBUTIONS, MAPURL } from "../../../constants";
const state = reactive({
  speed: 100,
  isPlay: false,
});
let map: Map | null,
  lastTime: number,
  route: Geometry | LineString,
  position: Point,
  vectorLayer: VectorLayer<VectorSource<Point>>,
  text: Feature<Point>;
let distance = 0;
let oldP: Coordinate = [];
let rotation = 0;
const initMap = () => {
  map = new Map({
    //初始化map
    target: "map",
    //地图容器中加载的图层
    layers: [
      //加载瓦片图层数据
      new TileLayer({
        source: new XYZ({
          attributions: ATTRIBUTIONS,
          url: MAPURL,
          maxZoom: 20,
        }),
      }),
    ],
    view: new View({
      projection: "EPSG:3857", // 坐标系，有EPSG:4326和EPSG:3 857
      center: [-5639523.95, -3501274.52],
      //地图初始显示级别
      zoom: 9,
      minZoom: 2,
      maxZoom: 19,
    }),
    //加载控件到地图容器中
    controls: defaults().extend([
      new FullScreen(), //加载全屏显示控件（目前支持非IE内核浏览器）
    ]),
  });
};
const handleStatus = () => {
  if (state.isPlay) {
    stopAnimation();
  } else {
    startAnimation();
  }
};
function moveFeature(event) {
  const speed = Number(state.speed);
  const time = event.frameState.time;
  const elapsedTime = time - lastTime;
  distance = (distance + (speed * elapsedTime) / 1e6) % 2;
  lastTime = time;

  const currentCoordinate = (route as LineString).getCoordinateAt(
    distance > 1 ? 2 - distance : distance
  );

  position.setCoordinates(currentCoordinate);
  const vectorContext = getVectorContext(event);

  /**
   * 使用反正切函数实现计算夹角弧度来实现图标的转向。
   * 在开始计算前图标的默认指向角度也要提前了解
   * 如这个 “<-” 默认为180度，正余弦为sin=0 cos=-1夹角弧度为Math.atan2(0, -1)。知道图标的默认弧度后就可实时的计算转向的弧度了
   * 公式为Math.atan2(y2 - y1, x2 - x1) - Math.atan2(0, -1)
   **/

  if (oldP.length) {
    rotation =
      Math.atan2(0, 1) -
      Math.atan2(
        currentCoordinate[1] - oldP[1],
        currentCoordinate[0] - oldP[0]
      );
  }

  vectorContext.setStyle(
    new Style({
      text: new Text({
        text: "->",
        // rotateWithView: true,
        rotation: rotation,
        font: "normal 20px 微软雅黑",
        fill: new Fill({
          color: "red",
        }),
      }),
    })
  );
  vectorContext.drawGeometry(position);

  oldP = currentCoordinate;

  map?.render();
}
function startAnimation() {
  state.isPlay = true;
  lastTime = Date.now();
  vectorLayer.on("postrender", moveFeature);
  text.setGeometry(undefined);
}

function stopAnimation() {
  state.isPlay = false;
  text.setGeometry(position);
  vectorLayer.un("postrender", moveFeature);
  text.setStyle(
    new Style({
      text: new Text({
        text: "->",
        // rotateWithView: true,
        rotation: rotation,
        font: "normal 20px 微软雅黑",
        fill: new Fill({
          color: "red",
        }),
      }),
    })
  );
  map?.render();
}
onMounted(() => {
  initMap();

  fetch("/json/route.json").then((response) => {
    response.json().then((result) => {
      const polyline: Polyline = result.routes[0].geometry;

      route = new Polyline({
        factor: 1e6,
      }).readGeometry(polyline, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      });

      const routeFeature = new Feature({
        type: "route",
        geometry: route,
      });
      const startMarker = new Feature({
        type: "icon",
        geometry: new Point((route as LineString).getFirstCoordinate()),
      });
      const endMarker = new Feature({
        type: "icon",
        geometry: new Point((route as LineString).getLastCoordinate()),
      });
      const p: Point | undefined = startMarker?.getGeometry()?.clone();
      if (p) {
        position = p;

        const geoMarker = new Feature({
          type: "geoMarker",
          geometry: position,
        });
        // console.log(route.getFirstCoordinate())
        text = new Feature({
          // geometry: new ol.geom.Point([-5655881.474053027, -3511517.0817902135]),
          geometry: position,
          type: "text",
        });
        let test = position.getFirstCoordinate();

        // 初始样式设置
        const styles = {
          route: new Style({
            stroke: new Stroke({
              width: 6,
              color: [237, 212, 0, 0.8],
            }),
          }),
          icon: new Style({
            image: new Icon({
              anchor: [0.5, 1],
              src: "/image/icon.png",
            }),
          }),
          text: new Style({
            text: new Text({
              text: "->",
              // rotateWithView: true,
              rotation: Math.atan2(test[0] - test[1], test[1] - test[0]),
              font: "normal 20px 微软雅黑",
              fill: new Fill({
                color: "red",
              }),
            }),
          }),
        };

        vectorLayer = new VectorLayer({
          source: new VectorSource({
            features: [routeFeature, geoMarker, startMarker, endMarker, text],
          }),
          style: function (feature) {
            return styles[feature.get("type")];
          },
        });

        map?.addLayer(vectorLayer);
      }
    });
  });
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
  position: relative;
  height: 650px;
}
.setting {
  position: absolute;
  width: 410px;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  display: flex;
  align-items: center;
  color: #ccc;
  font-weight: bold;
}
.slider {
  width: 180px;
  margin: 20px;
}
</style>
