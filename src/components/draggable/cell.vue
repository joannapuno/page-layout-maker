<script lang="ts" setup>
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  id: string
}>(), {})

const hasContent = ref(false)
const isDraggingOver = ref(false)
const draggedId = ref<string>()
const wrapper = ref<HTMLElement | null>(null)
const copiedElement = ref<HTMLElement | null>(null)

const copyDragged = () => {
  if(!draggedId.value) return
  
  const original = document.getElementById(draggedId.value)
  if(!original) return

  const copy = original.children[0].cloneNode(true) as HTMLElement
  copy.id = props.id
  // copiedElement.value = copy

  wrapper.value?.appendChild(copy)
  // wrapper.value?.innerHTML = copy
}

const handleDragEnter = (evt: Event) =>{
  isDraggingOver.value = true
  evt.preventDefault()
}

const handleDrop = (evt: DragEvent) => {
  draggedId.value = evt.dataTransfer?.getData('id')
  isDraggingOver.value = false
  hasContent.value = true
  copyDragged()
}
</script>
<template>
  <div 
    class="grid-cell"
    :class="{'bg-sunset-50': isDraggingOver, 'has-content': hasContent}" 
    @dragover.prevent
    @dragenter="handleDragEnter"
    @dragleave="isDraggingOver = false"
    @drop="handleDrop">
    <div ref="wrapper"></div>
  </div>
</template>

<style lang="scss" scoped>
.grid-cell {
  &:not(.has-content) {
    border: 1px dotted #bababa;
  }
}
</style>