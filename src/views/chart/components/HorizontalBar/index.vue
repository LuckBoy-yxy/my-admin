<script setup>
  import { ref, onMounted } from 'vue'
  import * as echars from 'echarts'
  import { useI18n } from 'vue-i18n'

  import { getChartTimeAmount } from '@/api/chart'
  import { watchSwitchLang } from '@/utils/i18n'

  const data = ref([])
  const getData = async date => {
    const { result } = await getChartTimeAmount(date)
    data.value = result
    renderChart()
  }
  getData()

  const target = ref(null)
  let myChart
  onMounted(() => {
    myChart = echars.init(target.value)
  })

  const i18n = useI18n()
  const renderChart = () => {
    const options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: [
          `${i18n.t('msg.chart.income')}（${i18n.t('msg.chart.unit')}）`,
          `${i18n.t('msg.chart.expend')}（${i18n.t('msg.chart.unit')}）`,
          `${i18n.t('msg.chart.balance')}（${i18n.t('msg.chart.unit')}）`
        ],
        right: 0
      },
      grid: {
        top: 28,
        right: 0,
        bottom: 0,
        left: 0,
        containLabel: true
      },
      xAxis: [
        {
          type: 'value'
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: {
            show: false
          },
          data: data.value.map(item => item.timeStr),
          inverse: true
        }
      ],
      series: [
        {
          name: `${i18n.t('msg.chart.income')}（${i18n.t('msg.chart.unit')}）`,
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'right'
          },
          color: '#6DC473',
          emphasis: {
            focus: 'series'
          },
          data: data.value.map(item => item.income)
        },
        {
          name: `${i18n.t('msg.chart.expend')}（${i18n.t('msg.chart.unit')}）`,
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'right'
          },
          color: '#E47470',
          emphasis: {
            focus: 'series'
          },
          data: data.value.map(item => item.expense)
        },
        {
          name: `${i18n.t('msg.chart.balance')}（${i18n.t('msg.chart.unit')}）`,
          type: 'bar',
          label: {
            show: true,
            position: 'inside'
          },
          color: '#83C0DF',
          emphasis: {
            focus: 'series'
          },
          data: data.value.map(item => item.balance)
        }
      ]
    }
    myChart.setOption(options)
  }

  watchSwitchLang(renderChart)
</script>

<template>
  <el-card
    :body-style="{
      paddingTop: '12px'
    }"
  >
    <div class="container" ref="target"></div>
  </el-card>
</template>

<style lang="scss" scoped>
.container {
  height: 410px;
}
</style>