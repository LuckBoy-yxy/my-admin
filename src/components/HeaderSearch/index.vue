<script setup>
  import { ref, computed, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import Fuse from 'fuse.js'

  import { generateRoutes } from './FuseData'
  import { filterRouters } from '@/utils/routes'
  import { watchSwitchLang } from '@/utils/i18n'

  const keyWord = ref('')
  const isShow = ref(false)
  const onShowClick = () => {
    isShow.value = !isShow.value
  }

  const router = useRouter()
  let searchPool = computed(() => {
    const fRoutes = filterRouters(router.getRoutes())
    return generateRoutes(fRoutes)
  })

  let fuse
  const initFuse = searchPool => {
    fuse = new Fuse(searchPool ,{
      shouldSort: true,
      minMatchCharLength: 1,
      threshold: 0.4,
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
  }
  initFuse(searchPool.value)

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

  const headerSearchSelectRef = ref(null)
  const handleClose = () => {
    headerSearchSelectRef.value.blur()
    isShow.value = false
    keyWord.value = ''
    options.value = []
  }

  watch(isShow, value => {
    if (value) {
      headerSearchSelectRef.value.focus()
      document.body.addEventListener('click', handleClose)
    } else {
      document.body.removeEventListener('click', handleClose)
    }
  })

  watchSwitchLang(() => {
    searchPool = computed(() => {
      const fRoutes = filterRouters(router.getRoutes())
      return generateRoutes(fRoutes)
    })
    initFuse(searchPool.value)
  })
</script>

<template>
  <div class="header-search" :class="{ show: isShow }">
    <SvgIcon
      id="guide-search"
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