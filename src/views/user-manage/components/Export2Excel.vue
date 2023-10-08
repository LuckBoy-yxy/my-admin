<script setup>
  import { defineProps, defineEmits, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  import { watchSwitchLang } from '@/utils/i18n'
  import { getUserManageAllList } from '@/api/userManager'
  import { USER_RELATIONS } from './Export2ExcelConstants'
  import { dateFilter } from '@/filter'

  defineProps({
    modelValue: {
      type: Boolean,
      required: true
    }
  })
  const emits = defineEmits(['update:modelValue'])

  const i18n = useI18n()
  const loading = ref(false)
  let exportDefaultName = i18n.t('msg.excel.defaultName')
  const excelName = ref('')
  excelName.value = exportDefaultName
  watchSwitchLang(() => {
    exportDefaultName = i18n.t('msg.excel.defaultName')
    excelName.value = exportDefaultName
  })

  const onConfirm = async () => {
    loading.value = true
    const allUser = (await getUserManageAllList()).list
    const excel = await import('@/utils/Export2Excel')
    const data = formatJson(USER_RELATIONS, allUser)

    excel.export_json_to_excel({
      header: Object.keys(USER_RELATIONS),
      data,
      filename: excelName.value || exportDefaultName,
      autoWidth: true,
      bookType: 'xlsx'
    })

    closed()
  }
  const formatJson = (headers, rows) => {
    return rows.map(item => {
      return Object.keys(headers).map(key => {
        if (headers[key] === 'role') {
          const roles = item[headers[key]]
          return JSON.stringify(roles.map(role => role.title))
        }

        if (headers[key] === 'openTime') {
          return dateFilter(item[headers[key]])
        }

        return item[headers[key]]
      })
    })
  }

  const closed = () => {
    loading.value = false
    emits('update:modelValue', false)
  }
</script>

<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button
          :loading="loading"
          type="primary"
          @click="onConfirm"
        >
          {{ $t('msg.excel.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>