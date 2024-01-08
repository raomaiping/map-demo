<script setup lang="ts">
import { inject, Ref, computed } from 'vue'
import { useRoute } from 'vitepress'

const DEV = inject('DEV') as Ref<boolean>
const route = useRoute()

const pageId = computed(() => route.path)
</script>

<template>
  <div class="copyright">
    <img
      v-if="!DEV"
      class="visitor"
      :src="`https://visitor-badge.laobi.icu/badge?page_id=raomaiping.map-demo.${pageId}`"
      title="当前页面累计访问数"
      onerror="this.style.display='none'"
    />
    Copyright © 2022-present&nbsp;
    <a href="https://juejin.cn/user/588993965598407">前端小菜鸟吖</a>
  </div>
</template>

<style scoped>
.copyright {
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  border-top: 1px solid var(--vp-c-gutter);
  padding: 32px 24px;
  background-color: var(--vp-c-bg);
}

.visitor {
  margin-right: 8px;
}

@media (max-width: 414px) {
  .visitor {
    display: none;
  }
}
</style>
