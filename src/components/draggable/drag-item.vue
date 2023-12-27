<script setup lang="ts">
import { ref, useSlots } from 'vue'
const props = defineProps<{
  id: string
}>()

const slots = useSlots()
const itemEl = ref()

defineExpose({itemEl})

const handleDragStart = (evt: DragEvent) => {
  console.log('start', evt)
  evt.dataTransfer?.setData('id', props.id)
}

</script>
<template>
  <div 
    :id="id"
    class="drag-item border-rounded-5 p-16" 
    :draggable="true" 
    @dragstart="handleDragStart">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '@/scss/utilities/backgrounds' as *;

  .drag-item {
    position: relative;
    &:hover {
      cursor: grab;
      @extend .bg-sunset-50;
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: transparent;
      }
    }
  }
</style>