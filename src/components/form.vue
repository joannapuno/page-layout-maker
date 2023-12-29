<script setup lang="ts">
withDefaults(defineProps<{
  id: string
  label?: string
}>(), {})
defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div>
    <div v-if="label" class="lm-form-label mb-20">
      <label :for="id" class="label-r-14">{{ label }}</label>
    </div>

    <form :id="id" v-bind="$attrs">
      <div class="d-grid gap-8">
        <slot />
      </div>
    </form>
  </div>
</template>