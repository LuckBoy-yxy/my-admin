<script setup>
  import { ref } from 'vue'

  import TrendChart from './components/TrendChart.vue'
  import TrendData from './components/TrendData.vue'

  import { getChartTrend } from '@/api/chart.js'

  const chartTrendData = ref({})
  const getChartTrendData = async () => {
    const res = await getChartTrend()
    chartTrendData.value = res
  }
  getChartTrendData()
</script>

<template>
  <el-card class="container">
    <el-row :gutter="32" v-if="chartTrendData.allAmount">
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