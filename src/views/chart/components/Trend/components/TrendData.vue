<script setup>
  import { defineProps, ref, onMounted } from 'vue'
  import { CountUp } from 'countup.js'

  const props = defineProps({
    data: {
      type: Object,
      required: true
    }
  })

  const titleAmountTarget = ref(null)
  const tadayAddedTarget = ref(null)
  const tadayExpendTarget = ref(null)
  const tadayBalanceTarget = ref(null)
  const options = {
    decimalPlaces: 2,
    duration: 1.5
  }

  onMounted(() => {
    new CountUp(titleAmountTarget.value, props.data.allAmount, options).start()
    new CountUp(tadayAddedTarget.value, props.data.tadayAdded, options).start()
    new CountUp(tadayExpendTarget.value, props.data.tadaySub, options).start()
    new CountUp(tadayBalanceTarget.value, props.data.tadayAmount, options).start()
  })
</script>

<template>
  <div class="trend-data-container">
    <div class="title">
      <div class="title-name">{{ $t('msg.chart.trendDataTitle') }}</div>
      <div class="title-amount">
        &yen;
        <span ref="titleAmountTarget">{{ data.allAmount }}</span>
      </div>
    </div>

    <div class="item">
      <div class="item-name item-name-border-1">
        {{ $t('msg.chart.trendDataTadayAdded') }}
      </div>
      <div class="item-amount">
        <span class="item-amount-number" ref="tadayAddedTarget">{{ data.tadayAdded }}</span>
        {{ $t('msg.chart.unit') }}
      </div>
    </div>

    <div class="item">
      <div class="item-name item-name-border-2">
        {{ $t('msg.chart.trendDataTadayExpend') }}
      </div>
      <div class="item-amount">
        <span class="item-amount-number" ref="tadayExpendTarget">{{ data.tadaySub }}</span>
        {{ $t('msg.chart.unit') }}
      </div>
    </div>

    <div class="item">
      <div class="item-name item-name-border-3">
        {{ $t('msg.chart.trendDataTadayBalance') }}
      </div>
      <div class="item-amount">
        <span class="item-amount-number" ref="tadayBalanceTarget">{{ data.tadayAmount }}</span>
        {{ $t('msg.chart.unit') }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.trend-data-container {
  .title {
    padding: 12px 20px;
    background: linear-gradient(to right, #0ea5e9, #6366f1);
    border-radius: 5px;
    color: white;
    .title-name {
      font-size: 12px;
      font-weight: bold;
    }
    .title-amount {
      font-size: 24px;
      margin-top: 4px;
    }
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #c9c9c9;
    padding: 16px 0;
    color: #666;
    .item-name {
      font-size: 12px;
      padding: 4px 0 4px 8px;
    }
    .item-amount {
      font-size: 12px;
      .item-amount-number {
        color: #333;
        font-weight: bold;
        font-size: 20px;
      }
    }

    .item-name-border-1 {
      border-left: 6px solid #409eff;
    }
    .item-name-border-2 {
      border-left: 6px solid #e6a23c;
    }
    .item-name-border-3 {
      border-left: 6px solid #67c23a;
    }
  }
}
</style>