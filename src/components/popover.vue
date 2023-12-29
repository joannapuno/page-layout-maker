<script setup lang="ts">
import { watch } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  open?: boolean
}>(), {
  open: false
})

const emit = defineEmits<{
  (event: 'update:open', value: boolean):void
}>()

watch(() => props.open, (newVal) => {
  emit('update:open', newVal)
})

</script>

<template>
  <Transition v-if="open">
    <div 
      class="lm-popover">

    <div class="lm-popover-content d-flex flex-column bg-white p-24" 
      v-click-away="() => $emit('update:open', false)">

      <h1 class="text-b-20 mb-24">{{ title }}</h1>
      <slot />
  
      <div v-if="$slots.buttons" class="d-flex gap-8 mt-24">
        <slot name="buttons" />
      </div>
    </div>      

    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.lm-popover {
    position: fixed;
    z-index: 10;

  &-content {
    min-width: 25rem;
    border-radius: 10px;
    box-shadow: 0 0 43px 0 #a165003b

  }
  // top: 0;
  // left: 100%;
}
</style>