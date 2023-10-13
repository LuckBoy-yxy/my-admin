<script setup>
  import { ref } from 'vue'

  const currentDate = ref(new Date())
</script>

<template>
  <el-card
    class="container"
    :body-style="{
      padding: 0
    }"
  >
    <el-calendar class="calendar" v-model="currentDate">
      <template #dateCell="{ data }">
        <p :class="[data.isSelected ? 'is-selected' : '']">
          {{
            data.day
              .split('-')
              .slice(2)
              .join('')
          }}
          <br />
        </p>
      </template>
    </el-calendar>
  </el-card>
</template>

<style lang="scss" scoped>
.container {
  height: 443px;
  .calendar {
    ::v-deep .el-calendar__body {
      padding: 0 12px 12px;
      font-size: 14px;
    }
    ::v-deep .el-calendar-day {
      height: 54px !important;
      padding: 0 !important;
      p {
        height: 100%;
        padding: 8px;
      }

      .amount {
        font-size: 12px;
      }

      .profit {
        background-color: #f3fff3;
        span {
          color: #649840;
        }
      }

      .loss {
        background-color: #ffe7e7;
        span {
          color: #b65d59;
        }
      }

      .is-selected {
        background-color: #d6f2ff;
      }
    }
  }
}
</style>