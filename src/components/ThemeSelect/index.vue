<script setup>
  import { ref } from 'vue'

  import SelectColor from './components/SelectColor.vue'

  const selectColorVisible = ref(false)
  const handleCommand = color => {
    selectColorVisible.value = true
  }
</script>

<template>
  <el-dropdown
    v-bind="$attrs"
    class="theme"
    trigger="click"
    @command="handleCommand"
  >
    <el-tooltip :content="$t('msg.navBar.themeChange')">
      <SvgIcon id="guide-theme" icon="change-theme" />
    </el-tooltip>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('msg.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <div>
    <SelectColor v-model="selectColorVisible" />
  </div>
</template>

<style lang="scss" scoped>

</style>