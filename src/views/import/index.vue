<script setup>
  import UploadExcel from '@/components/UploadExcel'

  const onSuccess = excelData => {
    console.log(excelData)
  }
</script>

<template>
  <UploadExcel
    :onSuccess="onSuccess"
  />
</template>

<style lang="scss" scoped>

</style>
