<script setup>
  import { ref } from 'vue'

  import { getChartCalendar } from '@/api/chart'

  const calendarListData = ref([])
  const getCalendarListData = async () => {
    const { result } = await getChartCalendar()
    calendarListData.value = result
  }
  getCalendarListData()

  const dateAmountObj = ref({})
  const getTadayAmount = date => {
    if (dateAmountObj.value[date]) {
      return dateAmountObj.value[date]
    }

    const tadayData = calendarListData.value.find(item => item.date === date)
    if (!tadayData) {
      return 0
    }

    const tadayAmount = tadayData.amount
    dateAmountObj.value[date] = tadayAmount
    return tadayAmount
  }

  const calendarItemBgClass = date => {
    if (getTadayAmount(date) > 0) {
      return 'profit'
    } else if (getTadayAmount(date) < 0) {
      return 'loss'
    }

    return ''
  }
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
        <p :class="[
            data.isSelected ? 'is-selected' : '',
            calendarItemBgClass(data.day)
          ]">
          {{ data.day.split('-').slice(2).join('') }}
          <br />
          <span class="amount" v-if="getTadayAmount(data.day)">
            {{ getTadayAmount(data.day) }}
          </span>
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