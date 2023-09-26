<script setup>
  import { computed, defineProps } from 'vue'
  import { useStore } from 'vuex'
  import { useI18n } from 'vue-i18n'
  import { ElMessage } from 'element-plus'

  const props = defineProps({
    effect: {
      type: String,
      default: 'dark',
      validator: function(value) {
        return ['dark', 'light'].includes(value) === true
      }
    }
  })

  const store = useStore()
  const i18n = useI18n()
  const language = computed(() => {
    return store.getters.language
  })
  const handleSetLanguage = lang => {
    i18n.locale.value = lang
    store.commit('i18n/toggleLang', lang)
    ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
  }
</script>

<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <el-tooltip :content="$t('msg.navBar.lang')" :effect="effect">
      <SvgIcon icon="language" />
    </el-tooltip>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          :disabled="language === 'zh'"
          command="zh"
        >中文</el-dropdown-item>

        <el-dropdown-item
          :disabled="language === 'en'"
          command="en"
        >English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>

</style>