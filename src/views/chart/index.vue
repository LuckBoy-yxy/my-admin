<script setup>
  import trendVue from './components/Trend'
  import horizontalBarVue from './components/HorizontalBar'
  import calendarVue from './components/Calendar'
  import pieVue from './components/Pie'
  import wordCloudVue from './components/WordCloud'
  import bMapVue from './components/BMap'
  import tableSheetVue from './components/TableSheet'
</script>

<template>
  <div class="chart-container">
    <trend-vue></trend-vue>

    <el-row class="mt-20" :gutter="20">
      <el-col :span="16">
        <horizontal-bar-vue></horizontal-bar-vue>
      </el-col>
      <el-col :span="8">
        <calendar-vue></calendar-vue>
      </el-col>
    </el-row>

    <el-row class="mt-20" :gutter="20">
      <el-col :span="6">
        <div class="chart-map-left">
          <pie-vue></pie-vue>
          
          <word-cloud-vue class="mt-20"></word-cloud-vue>
        </div>
      </el-col>

      <el-col :span="18">
        <b-map-vue></b-map-vue>
      </el-col>
    </el-row>

    <table-sheet-vue class="mt-20"></table-sheet-vue>
  </div>
</template>

<style lang="scss" scoped>
.mt-20 {
  margin-top: 20px;
}
</style>