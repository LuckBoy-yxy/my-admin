<script setup>
  import { ref, onMounted } from 'vue'
  import * as echarts from 'echarts'
  import 'echarts/extension/bmap/bmap.js'
  import { useI18n } from 'vue-i18n'

  import { getChartMap } from '@/api/chart'
  import { watchSwitchLang } from '@/utils/i18n'

  const i18n = useI18n()
  const chartData = ref({})
  const getChartData = async () => {
    const res = await getChartMap()
    chartData.value = res
    renderBMap()
  }
  getChartData()

  const convertData = (data) => {
    const res = []
    data.forEach(item => {
      const geoCoord = chartData.value.geoCoordMap[item.name]
      if (geoCoord.length) {
        res.push({
          name: item.name,
          value: [...geoCoord, item.value]
        })
      }
    })

    return res
  }

  let myChart
  const target = ref(null)
  onMounted(() => {
    myChart = echarts.init(target.value)
  })

  const renderBMap = () => {
    const options = {
      tooltip: {
        trigger: 'item'
      },
      bmap: {
        center: [109.114129, 36.550339],
        zoom: 5,
        roam: true
      },
      series: [
        {
          name: `营收（${i18n.t('msg.chart.unit')}）`,
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: convertData(chartData.value.data),
          symbolSize: function (val) {
            return val[2] / 10
          },
          encode: {
            value: 2
          },
          emphasis: {
            label: {
              show: true
            }
          },
          color: '#15803d'
        },
        {
          name: `营收 TOP 5（${i18n.t('msg.chart.unit')}）`,
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          data: convertData(
            chartData.value.data
              .sort(function (a, b) {
                return b.value - a.value
              })
              .slice(0, 6)
          ),
          symbolSize: function (val) {
            return val[2] / 10
          },
          encode: {
            value: 2
          },
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            formatter: '{b}',
            position: 'right',
            show: true
          },
          zlevel: 2,
          color: '#166534'
        }
      ]
    }
    myChart.setOption(options)
  }

  watchSwitchLang(renderBMap)
</script>

<template>
  <el-card
    class="container"
  >
    <div class="title">{{ $t('msg.chart.bmapChartTitle') }}</div>
    <div ref="target" class="box"></div>
  </el-card>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  .title {
    position: absolute;
    top: 28px;
    margin-left: 50%;
    transform: translateX(-50%);
    color: #333;
    font-size: 22px;
    font-weight: bold;
    z-index: 9;
  }
  .box {
    height: 462px;
  }
}
</style>