<script setup>
  import { ref, onMounted } from 'vue'
  import * as echarts from 'echarts'
  import 'echarts-wordcloud'
  import { useI18n } from 'vue-i18n'

  import { getChartWordCloud } from '@/api/chart'
  import { watchSwitchLang } from '@/utils/i18n'
  import { randomRGB } from '@/utils/color'

  const i18n = useI18n()

  let myChart
  const target = ref(null)
  const wordCloudData = ref([])
  const getWordCloudData = async () => {
    const res = await getChartWordCloud()
    wordCloudData.value = res
    renderChart()
  }
  getWordCloudData()

  onMounted(() => {
    myChart = echarts.init(target.value)
  })

  const renderChart = () => {
    const option = {
      title: {
        text: i18n.t('msg.chart.cloudChartTitle')
      },
      series: [
        {
          type: 'wordCloud',
          sizeRange: [4, 80],
          rotationRange: [0, 0],
          gridSize: 0,
          layoutAnimation: true,
          textStyle: {
            color: randomRGB
          },
          emphasis: {
            textStyle: {
              fontWeight: 'bold',
              color: '#000'
            }
          },
          data: wordCloudData.value
        }
      ]
    }

    myChart.setOption(option)
  }

  watchSwitchLang(renderChart)
</script>

<template>
  <el-card
    :body-style="{
      padding: 0
    }"
  >
    <div class="container" ref="target"></div>
  </el-card>
</template>

<style lang="scss" scoped>
.container {
  height: 240px;
}
</style>