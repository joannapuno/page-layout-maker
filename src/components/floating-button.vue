<script setup lang="ts">
import { ref, computed } from 'vue'
const props = withDefaults(defineProps<{
  text: string
  icon?: string
}>(), {
  text: '',
  icon: '',
  circle: false
})

const emit = defineEmits<{
  (event: 'click', value: Event):void
}>()

const expand = ref<boolean>(false)
</script>

<template>
  <button 
    class="lm-fb bg-sunset-700 flex-center gap-8 text-white p-12"
    @click="$emit('click', $event)"
    @mouseover="expand = true"
    @mouseleave="expand = false">
    <span :class="icon" :aria-label="text"></span>
    <span v-show="expand" class="text-r-16">{{ text }}</span>
  </button>
</template>

<style lang="scss" scoped>
  .lm-fb {
    position: fixed;
    bottom: 2.5rem;
    left: 2.5rem;
    cursor: pointer;
    border-radius: 50px;

    svg {
      height: 2.5rem;
      width: 2.5rem;
    }
  }
</style>