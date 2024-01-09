<template>
  <div class="map" ref="map_el">
    <el-button type="primary" class="btn" @click="setBackgroundImage">
      {{ isSetBackgroundImage ? '取消背景' : '设置背景' }}
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref, onBeforeUnmount } from 'vue'
import { Map, View } from 'ol'
import { Projection } from 'ol/proj'
import { Image } from 'ol/layer'
import { ImageStatic } from 'ol/source'
import { getCenter } from 'ol/extent'
import { ATTRIBUTIONS } from '../../../constants'

// 单张图片的矢量图层
const map_el: Ref<HTMLElement | null> = ref(null)
const isSetBackgroundImage = ref(false)
let map: Map | null = null

const initMap = () => {
  if (map_el.value === null) return

  const extent = [0, 0, 1024, 968] //表示图片的尺寸
  const projection = new Projection({
    code: 'EPSG:3857',
    extent,
  })

  const imageLayer = new Image({
    source: new ImageStatic({
      attributions: ATTRIBUTIONS,
      url: '/image/world6.jpg',
      projection,
      imageExtent: extent,
    }),
  })

  map = new Map({
    //初始化map
    target: map_el.value,
    layers: [imageLayer],
    view: new View({
      projection,
      center: getCenter(extent),
      zoom: 2,
    }),
  })
}

const setBackgroundImage = () => {
  if (map_el.value === null) return
  if (isSetBackgroundImage.value) {
    map_el.value.style.backgroundImage = ''
  } else {
    map_el.value.style.backgroundImage =
      'url("https://q2.qlogo.cn/headimg_dl?dst_uin=2582395486&spec=100")'
  }
  isSetBackgroundImage.value = !isSetBackgroundImage.value
}

onMounted(() => {
  initMap()
})

onBeforeUnmount(() => {
  if (map) {
    map.dispose()
    map = null
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
  position: relative;
  width: 100%;
  height: 650px;
}

.btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}
</style>
