<script setup>
  import { ref, defineProps } from 'vue'
  import XLSX from 'xlsx'
  import { ElMessage } from 'element-plus'

  import { getHeaderRow, isExcel } from './utils'

  const props = defineProps({
    beforeUpload: Function,
    onSuccess: Function
  })

  const loading = ref(false)
  const excelUploadInput = ref(null)
  const handleUpload = () => {
    excelUploadInput.value.click()
  }

  const handleChange = e => {
    const files = e.target.files
    const rawFile = files[0]
    if (!rawFile) return
    upload(rawFile)
  }

  const handleDrop = e => {
    if (loading.value) return
    const files = e.dataTransfer.files
    if (files.length !== 1) {
      return ElMessage.error('必须选中一个文件')
    }
    const rawFile = files[0]
    if (!isExcel(rawFile)) {
      return ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
    }
    upload(rawFile)
  }
  const handleDragover = e => {
    e.dataTransfer.dropEffect = 'copy'
  }

  const upload = rawFile => {
    excelUploadInput.value.value = null
    if (!props.beforeUpload) return readerData(rawFile)
    const before = props.beforeUpload(rawFile)
    if (before) {
      readerData(rawFile)
    }
  }

  const readerData = rawFile => {
    loading.value = true
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = e => {
        const data = e.target.result
        const workBook = XLSX.read(data, { type: 'array' })
        const firstSheetName = workBook.SheetNames[0]
        const workSheet = workBook.Sheets[firstSheetName]
        const header = getHeaderRow(workSheet)
        const results = XLSX.utils.sheet_to_json(workSheet)
        generateData({ header, results })
        loading.value = false
        resolve()
      }
      reader.readAsArrayBuffer(rawFile)
    })
  }

  const generateData = excelData => {
    props.onSuccess && props.onSuccess(excelData)
  }
</script>

<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>

    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />

    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <i class="el-icon-upload" />
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
