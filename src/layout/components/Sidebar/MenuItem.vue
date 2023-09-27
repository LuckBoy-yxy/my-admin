<script setup>
  import {  defineProps } from 'vue'
  import { generateTitle } from '@/utils/i18n'

  const props = defineProps({
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  })
</script>
  
<template>
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <SvgIcon v-else :icon="icon" />

  <span>{{ generateTitle(title) }}</span>
</template>

<style lang="scss" scoped>

</style>