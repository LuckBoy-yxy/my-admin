<script setup>
  import { ref, onMounted } from 'vue'
  import * as echarts  from 'echarts'
  import { useI18n } from 'vue-i18n'

  import { getChartPie } from '@/api/chart'
  import { watchSwitchLang } from '@/utils/i18n'

  const i18n = useI18n()
  const target = ref(null)
  const chartData = ref([])
  let myChart

  const getChartData = async () => {
  const res = await getChartPie()
    chartData.value = res
    renderChart()
  }
  getChartData()

  onMounted(() => {
    myChart = echarts.init(target.value)
  })

  const renderChart = () => {
    const options = {
      title: {
        text: i18n.t('msg.chart.pieChartTitle')
      },
      tooltip: {
        trigger: 'item',
        formatter: `{b}: {c} ${i18n.t('msg.chart.unit')}`
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            formatter: '{b}: {d}%',
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '22',
              fontWeight: 'bold'
            }
          },
          data: chartData.value
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
      padding: 0
    }"
  >
    <div ref="target" class="container"></div>
  </el-card>
</template>

<style lang="scss" scoped>
.container {
  height: 240px;
}
</style>