<script setup lang="ts">
import { ref } from 'vue'
import { 
  DragItem,
  Button,
  InputText,
  Form
} from '@/components'

const collapse = ref<boolean>(false)
</script>

<template>
  <div class="components-panel vh-100 position-sticky right-0 top-0" :class="{collapsed: collapse}">
    <div class="components-panel-content py-16 px-24">

      <div class="d-flex align-items-center gap-8 pb-16 text-white">
        <span class="fa-solid fa-cube"></span>
        <h2 class="text-m-16">Available Components</h2>
      </div>
      
      <DragItem id="sample-1">
        <Form id="sample-form" label="Sample Form">
          <InputText label="Label" id="sample-input-text--1" />
          <InputText label="Label" id="sample-input-text--2" />
        </Form>
      </DragItem>

      <DragItem id="sample-2">
        <Form id="sample-form">
          <InputText label="Label" id="sample-input-text--3" />
          <InputText label="Label" id="sample-input-text--4" />
          <InputText label="Label" id="sample-input-text--5" />
        </Form>
      </DragItem>

      <DragItem id="sample-3">
        <Button text="Button" variant="primary" />
      </DragItem>
      <DragItem id="sample-4">
        <Button text="Button" variant="destructive" />
      </DragItem>
    </div>

    <!-- TODO: For collapsing -->
    <!-- <div class="components-panel-bottom px-24 py-16">
      <button class="lm-button-icon" @click="collapse = !collapse">
        <span class="fa-solid fa-circle-chevron-left"></span>
      </button>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
  .components-panel {
    width: 40rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    transition: width 0.2s ease-in;

    &.collapsed {
      width: 10rem;
    }

    &-content {
      overflow-y: scroll;
    }

    &-bottom {
      border-top: 1px solid #DDDD;
    }
  }
</style>