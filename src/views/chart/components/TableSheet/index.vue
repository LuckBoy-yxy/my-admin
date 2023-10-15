<script setup>
  import S2 from './components/S2.vue'
  import SheetLabelVue from './components/SheetLabel.vue'
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <S2 />
    </el-col>
    <el-col :span="6">
      <SheetLabelVue v-for="item in 6" :key="item" class="mb-20" />
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 20px;
}
</style>