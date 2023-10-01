<script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import Fuse from 'fuse.js'

  import { generateRoutes } from './FuseData'
  import { filterRouters } from '@/utils/routes'

  const keyWord = ref('')
  const isShow = ref(false)
  const onShowClick = () => {
    isShow.value = !isShow.value
    if (isShow.value === true) {
      keyWord.value = ''
    }
  }

  const router = useRouter()
  const searchPool = computed(() => {
    const fRoutes = filterRouters(router.getRoutes())
    return generateRoutes(fRoutes)
  })
  const fuse = new Fuse(searchPool.value ,{
    shouldSort: true,
    minMatchCharLength: 1,
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })

  const options = ref([])
  const querySearch = query => {
    if (query !== '') {
      options.value = fuse.search(query)
    } else {
      options.value = []
    }
  }
  const onSelectChange = value => {
    router.push(value.path)
  }
</script>

<template>
  <div class="header-search" :class="{ show: isShow }">
    <SvgIcon
      class-name="search-icon"
      icon="search"
      @click.stop="onShowClick"
    />

    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="keyWord"
      filterable
      default-first-option
      remote
      :remote-method="querySearch"
      placeholder="Search"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in options"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      />
    </el-select>
  </div>
</template>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    overflow: hidden;
    display: inline-block;
    width: 0;
    font-size: 18px;
    vertical-align: middle;
    border-radius: 0;
    background: transparent;
    transition: width 0.2s;

    ::v-deep .el-input__inner {
      padding-left: 0;
      padding-right: 0;
      border: 0;
      border-radius: 0;
      vertical-align: middle;
      border-bottom: 1px solid #d9d9d9;
      box-shadow: none !important;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>