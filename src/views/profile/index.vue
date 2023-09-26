<script setup>
  import {} from 'vue'
</script>

<template>
  <div class="">
    {{ $t('msg.login.title') }}
    
    <el-pagination
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"
    />
  </div>
</template>

<style lang="scss" scoped>

</style>
