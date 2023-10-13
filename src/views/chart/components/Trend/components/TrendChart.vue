<script setup>
  import { ref, onMounted, defineProps } from 'vue'
  import * as echars from 'echarts'
  import { useI18n } from 'vue-i18n'

  import { watchSwitchLang } from '@/utils/i18n'

  const props = defineProps({
    data: {
      type: Object,
      required: true
    }
  })

  const i18n = useI18n()

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
      data: [i18n.t('msg.chart.monthIncome'), i18n.t('msg.chart.dayIncome')],
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
        formatter: `{value} ${i18n.t('msg.chart.unit')}`
      }
    },

    series: [
      {
        name: i18n.t('msg.chart.monthIncome'),
        type: 'bar',
        barWidth: 35,
        tooltip: {
          valueFormatter: function(value) {
            return value + i18n.t('msg.chart.unit')
          }
        },
        data: props.data.monthAmountList.map(item => item.amount)
      },
      {
        name: i18n.t('msg.chart.dayIncome'),
        type: 'line',
        color: '#6EC6D0',
        smooth: true,
        tooltip: {
          valueFormatter: function(value) {
            return value + i18n.t('msg.chart.unit')
          }
        },

        data: props.data.dailyCurve.map(item => item.amount)
      }
    ]
  }

    myChart.setOption(options)
  }

  watchSwitchLang(renderChart)
</script>

<template>
  <div class="trend-chart-container" ref="target"></div>
</template>

<style lang="scss" scoped>
.trend-chart-container {
  height: 100%;
}
</style>