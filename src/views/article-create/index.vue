<script setup>
  import { ref } from 'vue'

  import Markdown from './components/Markdown.vue'
  import Editor from './components/Editor.vue'

  const title = ref('')
  const activeName = ref('markdown')

  const onSuccess = () => {
    title.value = ''
  }
</script>

<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
        maxlength="20"
        clearable
      ></el-input>

      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <markdown :title="title" @onSuccess="onSuccess"></markdown>
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <editor></editor>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>