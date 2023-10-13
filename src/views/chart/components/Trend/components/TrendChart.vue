<script setup>
  import { ref, onMounted } from 'vue'
  import * as echars from 'echarts'

  let myChart
  const target = ref(null)
  onMounted(() => {
    myChart = echars.init(target.value)
    renderChart()
  })

  const renderChart = () => {
    const options = {
      title: {
        text: 'Echars 入门示例'
      },
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }

    myChart.setOption(options)
  }
</script>

<template>
  <div class="trend-chart-container" ref="target"></div>
</template>

<style lang="scss" scoped>
.trend-chart-container {
  height: 100%;
}
</style>