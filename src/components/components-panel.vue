<script setup lang="ts">
import { ref } from 'vue'
import { 
  DragItem,
  Button,
  InputText
} from '@/components'

const collapse = ref<boolean>(false)
</script>

<template>
  <div class="components-panel vh-100 bg-white position-sticky right-0 top-0" :class="{collapsed: collapse}">
    <div class="components-panel-content py-16 px-24">
      <DragItem id="sample-1">
        <Button text="Button" />
      </DragItem>
      
      <DragItem id="sample-2">
        <InputText id="sample" label="Name" />
      </DragItem>
    </div>

    <!-- TODO: For collpsing -->
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
    border-right: 1px solid #DDDD;
    background-color: #ffe5b938;
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