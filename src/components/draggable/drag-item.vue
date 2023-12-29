<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  id: string
}>()

const itemEl = ref()

defineExpose({itemEl})

const handleDragStart = (evt: DragEvent) => {
  evt.dataTransfer?.setData('id', props.id)
}

</script>
<template>
  <div 
    :id="id"
    class="drag-item border-rounded-5 px-16 py-24" 
    :draggable="true" 
    @dragstart="handleDragStart">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '@/scss/utilities/backgrounds' as *;

  .drag-item {
    display: grid;
    position: relative;
    background-color: #FFFF;
    width: 100%;
    border-radius: 5px;
    margin-bottom: 1.6rem;
    transform: scale(100%);
    transition: all 0.2s ease-in-out;

    &:hover {
      cursor: grab;
      transform: scale(102%);

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