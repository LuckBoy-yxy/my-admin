<script setup>
  import { onMounted, defineProps, defineEmits, watch } from 'vue'
  import { useStore } from 'vuex'
  import E from 'wangeditor'
  import i18next from 'i18next'

  import { commitArticle, editArticle } from './commit'

  const props = defineProps({
    title: {
      required: true,
      type: String
    },
    detail: {
      type: Object,
      default: () => {}
    }
  })
  const emits = defineEmits(['onSuccess'])

  const store = useStore()

  let editor
  let el
  const initEditor = () => {
    editor = new E(el)
    editor.config.zIndex = 1
    editor.config.showMenuTooltips = true
    editor.config.menuTooltipPosition = 'down'
    editor.config.lang = store.getters.language === 'zh' ? 'zh-CN' : 'en'
    editor.i18next = i18next
    editor.create()
  }

  const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: editor.txt.html()
    })
  } else {
    await commitArticle({
      title: props.title,
      content: editor.txt.html()
    })
  }

  editor.txt.html('')
  emits('onSuccess')
}

  onMounted(() => {
    el = document.querySelector('#editor-box')
    initEditor()
  })

  watch(() => props.detail, newVal => {
    if (newVal?.content) {
      editor.txt.html(newVal.content)
    }
  }, {
    immediate: true
  })
</script>

<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>