<script setup>
  import { defineProps, defineEmits, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  import { watchSwitchLang } from '@/utils/i18n'
  import { getUserManageAllList } from '@/api/userManager'

  defineProps({
    modelValue: {
      type: Boolean,
      required: true
    }
  })
  const emits = defineEmits(['update:modelValue'])

  const i18n = useI18n()
  const loading = ref(false)
  const excelName = ref(i18n.t('msg.excel.defaultName'))
  watchSwitchLang(() => {
    excelName.value = i18n.t('msg.excel.defaultName')
  })

  const onConfirm = async () => {
    loading.value = true
    const allUser = (await getUserManageAllList()).list
    console.log(allUser)
    closed()
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