<script setup>
  import { ref, reactive } from 'vue'
  import { useRoute } from 'vue-router'

  import ContextMenu from './components/ContextMenu.vue'

  const route = useRoute()
  const isActive = tag => {
    return tag.path === route.path
  }

  const onClickClose = () => {

  }

  const visible = ref(false)
  const menuStyle = reactive({
    top: 0,
    left: 0
  })
  const selectIndex = ref(0)
  const openMenu = (e, index) => {
    const { x, y } = e
    visible.value = true
    menuStyle.left = x + 'px'
    menuStyle.top = y + 'px'
    selectIndex.value = index
  }
</script>

<template>
  <div class="tags-view-container">
    <RouterLink
      v-for="(tag, index) in $store.getters.tagsViewList"
      :key="tag.fullPath"
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
      :to="{ path: tag.fullPath }"
      :style="{
        backgroundColor: isActive(tag) ? $store.getters.cssVariable.menuBg : '',
        borderColor: isActive(tag) ? $store.getters.cssVariable.menuBg : ''
      }"
      @contextmenu.prevent="openMenu($event, index)"
    >
      {{ tag.title }}
      <i
        v-show="!isActive(tag)"
        class="el-icon-close"
        @click.prevent.stop="onClickClose(index)"
      ></i>
    </RouterLink>

    <ContextMenu
      v-show="visible"
      :style="menuStyle"
      :index="selectIndex"
    />
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }

    .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>