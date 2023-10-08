<script setup>
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { ElMessage } from 'element-plus'

  import UploadExcel from '@/components/UploadExcel'

  import { userBatchImport } from '@/api/userManager'
  import { USER_RELATIONS, formatDate } from './utils'

  const i18n = useI18n()
  const router = useRouter()
  const onSuccess = async ({ header, results }) => {
    const updateData = generateData(results)
    await userBatchImport(updateData)
    ElMessage.success({
      message: results.length + i18n.t('msg.excel.importSuccess'),
      type: 'success'
    })
    router.push('/user/manage')
  }

  const generateData = results => {
    const arr = []
    results.forEach(item => {
      const info = {}
      Object.keys(item).forEach(key => {
        if (USER_RELATIONS[key] === 'openTime') {
          info[USER_RELATIONS[key]] = formatDate(item[key])
          return
        }
        info[USER_RELATIONS[key]] = item[key]
      })
      arr.push(info)
    })
    return arr
  }
</script>

<template>
  <UploadExcel
    :onSuccess="onSuccess"
  />
</template>

<style lang="scss" scoped>

</style>
