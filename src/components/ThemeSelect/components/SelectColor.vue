<script setup>
  import { defineEmits, defineProps, ref } from 'vue'
  import { useStore } from 'vuex'

  import { generateNewStyle, writeNewStyle } from '@/utils/theme'

  const emits = defineEmits(['update:modelValue'])
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: false
    }
  })
  const store = useStore()

  const mColor = ref(store.getters.mainColor)
  const predefineColors = [
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577'
  ]

  const confirm = async () => {
    const newStyleText = await generateNewStyle(mColor.value)
    writeNewStyle(newStyleText)
    store.commit('theme/setMainColor', mColor.value)
    handleClose()
  }
  const handleClose = () => {
    emits('update:modelValue', false)
  }
</script>

<template>
  <el-dialog
    title="提示"
    width="30%"
    :modelValue="modelValue"
    @close="handleClose"
  >

    <div class="center">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker
        v-model="mColor"
        :predefine="predefineColors"
      ></el-color-picker>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="confirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.center {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>