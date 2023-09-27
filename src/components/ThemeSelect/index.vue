<script setup>
  const handleCommand = color => {

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
      <SvgIcon icon="change-theme" />
    </el-tooltip>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('msg.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>

</style>