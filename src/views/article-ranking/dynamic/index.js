import { ref, watch } from 'vue'

import getDynamicData from './DynamicData'
import { watchSwitchLang } from '@/utils/i18n'

export const dynamicData = ref(getDynamicData())

watchSwitchLang(() => {
  dynamicData.value = getDynamicData()
  initSelectDynamicLabel()
})

export const selectDynamicLabel = ref([])
const initSelectDynamicLabel = () => {
  selectDynamicLabel.value = dynamicData.value.map(item => item.label)
}
initSelectDynamicLabel()

export const tableColumns = ref([])
watch(selectDynamicLabel, newVal => {
  tableColumns.value = []
  dynamicData.value.forEach(item => {
    if (newVal.includes(item.label)) {
      tableColumns.value.push(item)
    }
  })
}, {
  immediate: true
})