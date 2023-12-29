<script lang="ts" setup>
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  id: string
  colSpan?: number
  rowSpan?: number

}>(), {
  colSpan: 1,
  rowsSpan: 1,
})

const emit = defineEmits<{
  (event: 'click', value: Event):void
}>()

const hasContent = ref(false)
const isDraggingOver = ref(false)
const draggedId = ref<string>()
const wrapper = ref<HTMLElement | null>(null)
const openPopover = ref<boolean>(false)

const copyDragged = () => {
  if(!draggedId.value) return
  
  const original = document.getElementById(draggedId.value)
  if(!original) return

  const copy = original.children[0].cloneNode(true) as HTMLElement
  copy.id = props.id
  wrapper.value?.appendChild(copy)
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

const cellClasses = computed(() => {
  return {
    'grid-cell': true,
    'bg-sunset-50': isDraggingOver.value || openPopover.value,
    [`grid-col-span-${props.colSpan}`]: true,
    [`grid-row-span-${props.rowSpan}`]: true
  }
})
</script>
<template>
  <div 
    :id="id"
    :class="cellClasses"
    ref="wrapper"
    @dragover.prevent
    @dragenter="handleDragEnter"
    @dragleave="isDraggingOver = false"
    @drop="handleDrop"
    @click="$emit('click', $event)">

    <div v-if="!hasContent" class="cell-display flex-center p-24" :id="`${id}--display`">
      <span class="text-r-14 text-gray-400">Drop component(s) here</span>
    </div>
  </div>
</template>

<style lang="scss">
.grid-cell {
  position: relative;
  height: 100%;
  width: 100%;
} 

.cell-display {
  cursor: pointer;
  border: 2px dashed #e6e6e6;
  border-radius: 5px;
  height: 100%;
  width: 100%;
}
</style>