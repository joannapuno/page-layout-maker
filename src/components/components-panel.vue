<script setup lang="ts">
import { 
  DragItem,
  Button,
  InputText
} from '@/components'
</script>

<template>
  <div class="components-panel vh-100 bg-white border-gray-300 position-sticky right-0 top-0">
    <h1 class="text-regular-24 py-16 px-24">Components</h1>
    <div class="d-grid gap-8 py-16 px-24">
      <DragItem id="sample-1">
        <Button text="Button" />
      </DragItem>
      
      <DragItem id="sample-2">
        <InputText id="sample" label="Name" />
      </DragItem>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .components-panel {
    width: 40rem;
    justify-self: end;
  }
</style>