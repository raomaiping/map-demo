<script setup lang="ts">
import { VPDocAsideSponsors } from 'vitepress/theme'

const data = [
  {
    items: [
      {
        img: '/image/wx.webp',
      },
    ],
  },
  {
    items: [
      {
        img: '/image/zfb.webp',
      },
    ],
  },
]
</script>

<template>
  <p class="sponsor-title">
    鼓励作者：欢迎
    <a
      class="VPLink link vp-external-link-icon no-icon"
      href="https://github.com/raomaiping/map-demo"
      target="_blank"
      rel="noreferrer"
      ><!--[-->star<!--]--></a
    >
    或打赏犒劳
  </p>
  <VPDocAsideSponsors :data="data" />
</template>

<style>
.vp-sponsor-grid.medium .vp-sponsor-grid-image {
  max-width: 180px;
  max-height: 180px;
}
.vp-sponsor-grid.vp-sponsor-grid .vp-sponsor-grid-link {
  height: 200px;
}
.sponsor-title {
  margin-top: 10px;
  margin-bottom: 6px;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-brand);
}
</style>
