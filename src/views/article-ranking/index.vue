<script setup>
  import { ref, onActivated, onMounted } from 'vue'
  
  import { getArticleList } from '@/api/article'
  import { watchSwitchLang } from '@/utils/i18n'
  import { dynamicData, selectDynamicLabel, tableColumns } from './dynamic'
  import { tableRef, initSortable } from './sortable'

  const page = ref(1)
  const size = ref(10)
  const total = ref(0)
  const tableData = ref([])
  const getListData = async () => {
    const res = await getArticleList({
      page: page.value,
      size: size.value
    })
    total.value = res.total
    tableData.value = res.list
  }

  getListData()
  watchSwitchLang(getListData)
  onActivated(getListData)

  const handleSizeChange = currentSize => {
    size.value = currentSize
    page.value = 1
    getListData()
  }
  const handleCurrentChange = currentPage => {
    page.value = currentPage
    getListData()
  }

  onMounted(() => {
    initSortable(tableData, getListData)
  })
</script>

<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :label="item.label"
            :key="index"
            >
              {{ item.label }}
            </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>

    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          align="center"
        >
          <template
            #default="{ row }"
            v-if="item.prop === 'publicDate'"
          >
            {{ $filters.relativeTime(row.publicDate) }}
          </template>

          <template
            #default="{ row }"
            v-else-if="item.prop === 'action'"
          >
            <el-button
              type="primary"
              size="mini"
              @click="onShowClick(row)"
            >
              {{ $t('msg.article.show') }}
            </el-button>
            <el-button
              type="danger"
              size="mini"
              @click="onRemoveClick(row)"
            >
              {{ $t('msg.article.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 50, 100, 200]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  ::v-deep .el-table__row {
    cursor: pointer;
  }
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}

::v-deep .sortable-ghost {
  opacity: 0.6;
  color: #fff !important;
  background: #304156 !important;
}
</style>
