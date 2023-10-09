<script setup>
  import { ref } from 'vue'

  import { roleList } from '@/api/role'
  import { watchSwitchLang } from '@/utils/i18n'

  const allRoles = ref([])
  const getRoleList = async () => {
    allRoles.value = await roleList()
  }

  getRoleList()
  watchSwitchLang(getRoleList)
</script>

<template>
  <div class="">
    <el-card>
      <el-table
        border
        :data="allRoles"
        style="width: 100%"
      >
        <el-table-column
          :label="$t('msg.role.index')"
          type="index"
          width="120"
        ></el-table-column>

        <el-table-column
          :label="$t('msg.role.name')"
          prop="title"
        ></el-table-column>

        <el-table-column
          :label="$t('msg.role.desc')"
          prop="describe"
        ></el-table-column>

        <el-table-column
          :label="$t('msg.role.action')"
          width="260"
        >
          <el-button
            type="primary" size="mini"
          >
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>

</style>
