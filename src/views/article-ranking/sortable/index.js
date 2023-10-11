import { ref } from 'vue'
import Sortable from 'sortablejs'

export const tableRef = ref(null)

export const initSortable = (tableData, cb) => {
  const el = tableRef.value.$el.querySelectorAll(
    '.el-table__body-wrapper > table > tbody'
  )[0]
  
  Sortable.create(el, {
    ghostClass: 'sortable-ghost',
    onEnd(event) {}
  })
}