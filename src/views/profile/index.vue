<script setup>
  import { ref } from 'vue'

  import { feature } from '@/api/user'
  import ProjectCard from './components/ProjectCard.vue'
  import Chapter from './components/Chapter.vue'
  import Feature from './components/Feature.vue'
  import Author from './components/Author.vue'

  const activeName = ref('feature')
  const featureData = ref([])
  const getFeatureData = async () => {
    const res = await feature()
    featureData.value = res
    console.log(res)
  }
  getFeatureData()
</script>

<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card
          class="project-card"
          :features="featureData"
        ></project-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.my-container {
  .project-card {
    margin-right: 20px;
  }
}
</style>
