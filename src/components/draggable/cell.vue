<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Popover, InputNumber, Button } from '@/components'

const props = withDefaults(defineProps<{
  id: string
}>(), {})

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

const colSpan = ref<number>(1)
const rowSpan = ref<number>(1)

const cellClasses = computed(() => {
  return {
    'grid-cell': true,
    'position-relative': true,
    'bg-sunset-50': isDraggingOver.value || openPopover.value,
    'has-content': hasContent.value,
    [`grid-col-span-${colSpan.value}`]: true,
    [`grid-row-span-${rowSpan.value}`]: true
  }
})
</script>
<template>
  <div
    :id="id"
    :class="cellClasses">

    <div 
      class="h-100"
      @dragover.prevent
      @dragenter="handleDragEnter"
      @dragleave="isDraggingOver = false"
      @drop="handleDrop"
      @click="openPopover = true">

      <div ref="wrapper"></div>
    </div>

    <Popover title="Edit Cell" v-model:open="openPopover">

      <div class="d-flex flex-column gap-8">
        <InputNumber id="col-span" label="Column Span" v-model="colSpan" :max="12" />
        <InputNumber id="row-span" label="Row Span" v-model="rowSpan" :max="12" />
      </div>

      <template #buttons>
        <Button text="Done" @click="openPopover = false" />
      </template>
    </Popover>
    </div>


</template>

<style lang="scss" scoped>
.grid-cell {
  cursor: pointer;
  &:not(.has-content) {
    border: 1px dotted #bababa;
  }
}
</style>