<script setup>
  import { defineProps, onMounted, ref, watch } from 'vue'
  import { TableSheet } from '@antv/s2'
  import { useI18n } from 'vue-i18n'

  import { watchSwitchLang } from '@/utils/i18n'

  const props = defineProps({
    data: {
      type: Array,
      required: true
    }
  })

  const i18n = useI18n()
  const target = ref(null)
  let s2
  onMounted(() => {
    const s2Options = {
      width: target.value.clientWidth,
      height: target.value.clientHeight,
      showSeriesNumber: true,
      conditions: {
        background: [
          {
            field: 'balance',
            mapping(fieldValue) {
              return {
                fill: fieldValue > 0 ? '#f3fff3' : '#ffe7e7'
              }
            }
          }
        ]
      }
    }

    s2 = new TableSheet(target.value, {}, s2Options)
  })

  const renderChart = () => {
    const s2DataCfg = {
      fields: {
        columns: [
          'province',
          'city',
          'coverage',
          'receivable',
          'actual',
          'balance'
        ]
      },
      meta: [
        {
          field: 'province',
          name: i18n.t('msg.chart.sheetProvince')
        },
        {
          field: 'city',
          name: i18n.t('msg.chart.sheetCity')
        },
        {
          field: 'coverage',
          name: i18n.t('msg.chart.sheetCoverage')
        },
        {
          field: 'receivable',
          name: i18n.t('msg.chart.sheetReceivable')
        },
        {
          field: 'actual',
          name: i18n.t('msg.chart.sheetActual')
        },
        {
          field: 'balance',
          name: i18n.t('msg.chart.sheetBalance')
        }
      ],
      data: props.data
    }

    s2.setDataCfg(s2DataCfg)
    s2.render(true)
  }

  watch(() => props.data, () => {
    renderChart()
  })
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
  height: 782px;
}
</style>