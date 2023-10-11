<script setup>
  import { ref, onActivated } from 'vue'
  
  import { getArticleList } from '@/api/article'
  import { watchSwitchLang } from '@/utils/i18n'

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
</script>

<template>
  <div class="article-ranking-container">
    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          :label="$t('msg.article.ranking')"
          prop="ranking"
          width="50"
          align="center"
        ></el-table-column>

        <el-table-column
          :label="$t('msg.article.title')"
          prop="title"
          align="center"
        ></el-table-column>

        <el-table-column
          :label="$t('msg.article.author')"
          prop="author"
          width="100"
          align="center"
        ></el-table-column>

        <el-table-column
          :label="$t('msg.article.publicDate')"
          align="center"
        >
          <template #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('msg.article.desc')"
          prop="desc"
          align="center"
        ></el-table-column>

        <el-table-column
          :label="$t('msg.article.action')"
          align="center"
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
</style>
