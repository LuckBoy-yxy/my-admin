<script setup>
  import TrendChart from './components/TrendChart.vue'
  import TrendData from './components/TrendData.vue'
</script>

<template>
  <el-card class="container">
    <el-row :gutter="32">
      <el-col :span="6">
        <TrendData :data="chartTrendData" />
      </el-col>
      <el-col :span="18">
        <TrendChart :data="chartTrendData" />
      </el-col>
    </el-row>
  </el-card>
</template>

<style lang="scss" scoped>
.container {
  height: 286px;
}
</style>