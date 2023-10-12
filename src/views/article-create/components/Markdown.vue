<script setup>
  import { onMounted, defineProps, defineEmits } from 'vue'
  import { useStore } from 'vuex'
  import MKEditor from '@toast-ui/editor'
  import '@toast-ui/editor/dist/toastui-editor.css'
  import '@toast-ui/editor/dist/i18n/zh-cn'

  import { watchSwitchLang } from '@/utils/i18n'
  import { commitArticle } from './commit'

  const props = defineProps({
    title: {
      type: String,
      required: true
    }
  })
  const emits = defineEmits(['onSuccess'])

  const store = useStore()

  let mkEditor
  let el
  const initEditor = () => {
    mkEditor = new MKEditor({
      el,
      height: '500px',
      previewStyle: 'vertical',
      language: store.getters.language === 'zh' ? 'zh-CN' : 'en' 
    })
  }

  watchSwitchLang(() => {
    if (!el) return

    const htmlStr = mkEditor.getHTML()
    mkEditor.destroy()
    initEditor()
    mkEditor.setHTML(htmlStr)
  })

  const onSubmitClick = async () => {
    await commitArticle({
      title: props.title,
      content: mkEditor.getHTML()
    })

    mkEditor.reset()
    emits('onSuccess')
  }

  onMounted(() => {
    el = document.querySelector('#markdown-box')
    initEditor()
  })
</script>

<template>
  <div class="markdown-container">

    <div id="markdown-box"></div>

    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>