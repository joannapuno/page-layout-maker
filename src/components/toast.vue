<script setup lang="ts">
import { ref, watch } from 'vue';

const props = withDefaults(defineProps<{
  message: string
  open?: boolean
  icon?: string
}>(), {
  open: false,
  icon: ''
})

defineEmits<{
  (event: 'update:open', value: boolean): void
}>()

const isOpen = ref<boolean>(false)

watch(() => props.open, (newVal) => {
  isOpen.value = newVal
  if(!isOpen.value) return

  setTimeout(() => {
    isOpen.value = false
  }, 3000)
})

</script>

<template>
  <Teleport to="body">
    <div class="lm-toast" :class="{show: isOpen}">
      <span v-if="icon" :class="icon"></span>
      <p>{{ message }}</p>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
  .lm-toast {
    width: 30rem;
    background-color: #333333;
    padding: 1.6rem 2rem;
    color: #FFFF;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.8rem;
    border-radius: 5px;
    position: fixed;
    top: 1.6rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    opacity: 0;
    transition: opacity .1s ease;

    &.show {
      opacity: 1;
    }
  }
</style>