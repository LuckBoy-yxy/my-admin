<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import zhCn from 'element-plus/es/locale/lang/zh-cn'
  import en from 'element-plus/lib/locale/lang/en'

  import { generateNewStyle, writeNewStyle } from '@/utils/theme'
  import { watchSwitchLang } from '@/utils/i18n'
  
  const store = useStore()
  generateNewStyle(store.getters.mainColor).then(newStyleText => {
    writeNewStyle(newStyleText)
  })

  watchSwitchLang(() => {
    if (store.getters.token) {
      store.dispatch('user/getUserInfo')
    }
  })

  const locale = computed(() => {
    return store.getters.language === 'en' ? en : zhCn
  })
</script>

<style>

</style>
