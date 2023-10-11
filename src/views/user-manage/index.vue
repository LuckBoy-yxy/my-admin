<script setup>
  import { ref, watch, onActivated } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { useI18n } from 'vue-i18n'

  import ExportToExcel from './components/Export2Excel.vue'
  import RolesDialog from './components/roles.vue'

  import { getUserManageList, deleteUser } from '@/api/userManager'
  import { watchSwitchLang } from '@/utils/i18n'

  const i18n = useI18n()
  const tableData = ref([])
  const page = ref(1)
  const size = ref(2)
  const total = ref(0)
  const getListData = async() => {
    const res = await getUserManageList({
      page: page.value,
      size: size.value
    })
    tableData.value = res.list
    total.value = res.total
  }

  getListData()
  watchSwitchLang(getListData)

  const handleSizeChange = currentSize => {
    size.value = currentSize
    page.value = 1
    getListData()
  }
  const handleCurrentChange = currentPage => {
    page.value = currentPage
    getListData()
  }

  const router = useRouter()
  const exportToExcelVisible = ref(false)
  const onImportExcelClick = () => {
    router.push('/user/import')
  }
  const onToExcelClick = () => {
    exportToExcelVisible.value = true
  }

  const onShowClick = id => {
    router.push(`/user/info/${id}`)
  }

  const onRemoveClick = data => {
    ElMessageBox.confirm(
      i18n.t('msg.excel.dialogTitle1') +
      data.username +
      i18n.t('msg.excel.dialogTitle2'),
      {
        type: 'warning'
      }
    ).then(async () => {
      await deleteUser(data._id)
      ElMessage.success(i18n.t('msg.excel.removeSuccess'))
      getListData()
    })
  }

  const roleDialogVisible = ref(false)
  const selectUserId = ref('')
  const onShowRoleClick = raw => {
    selectUserId.value = raw._id
    roleDialogVisible.value = true
  }
  watch(roleDialogVisible, newVal => {
    if (!newVal) selectUserId.value = ''
  })

  onActivated(getListData)
</script>

<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button
          type="primary"
          v-permission="['importUser']"
          @click="onImportExcelClick"
        >
          {{ $t('msg.excel.importExcel') }}
        </el-button>
        <el-button type="success" @click="onToExcelClick">
          {{ $t('msg.excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>

    <el-card>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          label="#"
          type="index"
        ></el-table-column>

        <el-table-column
          :label="$t('msg.excel.name')"
          prop="username"
        ></el-table-column>

        <el-table-column
          :label="$t('msg.excel.mobile')"
          prop="mobile"
        ></el-table-column>

        <el-table-column
          :label="$t('msg.excel.avatar')"
          align="center"
        >
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>

        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag
                v-for="item in row.role"
                :key="item.id"
                size="mini"
              >
                {{ item.title }}
              </el-tag>
            </div>

            <div v-else>
              <el-tag size="mini">
                {{ $t('msg.excel.defaultRole') }}
              </el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('msg.excel.openTime')"
        >
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="260"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="mini"
              @click="onShowClick(row._id)"
            >
              {{ $t('msg.excel.show') }}
            </el-button>

            <el-button
              type="info"
              size="mini"
              v-permission="['distributeRole']"
              @click="onShowRoleClick(row)"
            >
              {{ $t('msg.excel.showRole') }}
            </el-button>

            <el-button
              type="danger"
              size="mini"
              v-permission="['removeUser']"
              @click="onRemoveClick(row)"
            >
              {{ $t('msg.excel.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <ExportToExcel v-model="exportToExcelVisible" />

    <RolesDialog
      v-model="roleDialogVisible"
      :userId="selectUserId"
    />
  </div>
</template>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
  }
}
</style>
