<script setup>
  import { ref, defineProps } from 'vue'
  
  import { userDetail } from '@/api/userManager'
  import { watchSwitchLang } from '@/utils/i18n'

  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  })

  const detailData = ref({})
  const getUserDetail = async () => {
    detailData.value = await await userDetail(props.id)
  }
  getUserDetail()
  watchSwitchLang(getUserDetail)
</script>

<template>
  <div class="">用户详情</div>
</template>

<style lang="scss" scoped>

</style>
