<script setup>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import Markdown from './components/Markdown.vue'
  import Editor from './components/Editor.vue'

  import { articleDetail } from '@/api/article'

  const title = ref('')
  const activeName = ref('markdown')

  const onSuccess = () => {
    title.value = ''
  }

  const detail = ref({})
  const route = useRoute()
  const articleId = route.params.id
  const getArticleDetail = async () => {
    detail.value = await articleDetail(articleId)
    title.value = detail.value.title
  }
  if (articleId) {
    getArticleDetail()
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
          <markdown
            :title="title"
            :detail="detail"
            @onSuccess="onSuccess"
          ></markdown>
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