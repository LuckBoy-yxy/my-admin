<script setup>
  import { defineProps, computed } from 'vue'
  import { isExternal as external } from '../../utils/validate'

  const props = defineProps({
    icon: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  })

  const isExternal = computed(() => external(props.icon))

  const styleExternalIcon = computed(() => ({
    mask: `url(${props.icon}) no-repeat 50% 50%`,
  	'-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
  }))

  const iconName = computed(() => `#icon-${props.icon}`)
</script>

<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    :class="className"
  />
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>