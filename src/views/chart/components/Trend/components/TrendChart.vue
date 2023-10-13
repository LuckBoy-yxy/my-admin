<script setup>
  import { ref, onMounted, defineProps } from 'vue'
  import * as echars from 'echarts'

  const props = defineProps({
    data: {
      type: Object,
      required: true
    }
  })

  let myChart
  const target = ref(null)
  onMounted(() => {
    myChart = echars.init(target.value)
    renderChart()
  })

  const renderChart = () => {
    const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    legend: {
      data: ['月累计收益', '日收益曲线'],
      right: 0
    },
    grid: {
      top: 20,
      right: 0,
      bottom: 0,
      left: 0,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.data.monthAmountList.map(item => item.time),
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: function(value) {
        return parseInt(value.max * 1.2)
      },
      axisLabel: {
        formatter: '{value} 万元'
      }
    },

    series: [
      {
        name: '月累计收益',
        type: 'bar',
        barWidth: 35,
        tooltip: {
          valueFormatter: function(value) {
            return value + '万元'
          }
        },
        data: props.data.monthAmountList.map(item => item.amount)
      },
      {
        name: '日收益曲线',
        type: 'line',
        color: '#6EC6D0',
        smooth: true,
        tooltip: {
          valueFormatter: function(value) {
            return value + '万元'
          }
        },

        data: props.data.dailyCurve.map(item => item.amount)
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