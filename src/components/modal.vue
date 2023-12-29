<script setup lang="ts">
  import { ref } from 'vue'

  const props = withDefaults(defineProps<{
    title: string
    open?: boolean
  }>(), {
    open: false
  })

  defineEmits<{
    (event: 'update:open', value: boolean):void
  }>()

</script>
<template>
  <Teleport to="body">
    <Transition v-if="open">
      <div class="lm-modal">
          <div class="lm-modal-content bg-white border-rounded-10" v-click-away=" () => $emit('update:open', false)">
            <div class="d-grid gap-24 overflow-y-auto p-24">
              <div class="lm-modal-title">
                <h1 class="text-b-20">{{ title }}</h1>
              </div>
              <slot />
            </div>
            <div class="bg-white grid-2 gap-8 position-sticky bottom-0 p-24">
              <slot name="buttons" />
            </div>
          </div>
        </div>
    </Transition>
  </Teleport>
</template>
<style lang="scss" scoped>
.lm-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f59e0b26;
  backdrop-filter: blur(2px);

  &-content {
    display: flex;
    flex-direction: column;
    width: 90rem;
    max-height: 80%;
    box-shadow: 0 0 43px 0 #a165003b;
  }
}
</style>