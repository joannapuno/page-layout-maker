<script setup lang="ts">
  import { computed } from 'vue'

  const props = withDefaults(defineProps<{
    columns?: number
    rows?: number
    colGap?: number
    rowGap?: number
  }>(), {
    columns: 1,
    rows: 1,
    colGap: 0,
    rowGap: 0
  })

  const layoutClasses = computed(() => {
    return {
      'w-100': true,
      'h-100': true,
      [`grid-${props.columns}`]: true,
      [`grid-row-${props.rows}`]: true,
      [`column-gap-${props.colGap}`]: true,
      [`row-gap-${props.rowGap}`]: true
    }
  })
</script>

<template>
  <div :class="layoutClasses">
    <slot />
  </div>
</template>