<script setup>
  import { ref } from 'vue'

  import S2 from './components/S2.vue'
  import SheetLabelVue from './components/SheetLabel.vue'

  import { getChartRegions, getChartSheet } from '@/api/chart'
  import { watchSwitchLang } from '@/utils/i18n'

  const regionsData = ref([])
  const getChartRegionsData = async () => {
    const { regions } = await getChartRegions()
    regionsData.value = regions
    getChartSheetData({ regionId: regionsData.value[0].id })
  }

  getChartRegionsData()
  watchSwitchLang(getChartRegionsData())

  const currentRegionsIndex = ref(0)
  const onChangeRegion = index => {
    currentRegionsIndex.value = index
  }

  const sheetData = ref([])
  const getChartSheetData = async id => {
    const res = await getChartSheet(id)
    sheetData.value = res
  }
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <S2 v-if="sheetData" :data="sheetData" />
    </el-col>
    <el-col :span="6">
      <SheetLabelVue
        class="mb-20"
        v-for="(item, index) in regionsData"
        :key="item.id"
        :data="item"
        :isSelected="currentRegionsIndex === index"
        @click="onChangeRegion(index)"
      />
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 20px;
}
</style>