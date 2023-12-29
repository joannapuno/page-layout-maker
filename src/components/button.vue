<script lang="ts" setup>
import { computed } from 'vue';

type Variant = 'primary' | 'destructive' | 'ghost'

const props = withDefaults(defineProps<{
  text: string
  variant?: Variant
}>(), {
  variant: 'primary'
})

defineEmits<{
  (event: 'click', value: Event):void
}>()

const wrapperClasses = computed(() => {
  return {
    'border-rounded-5 px-16 py-8': true,
    'bg-sunset-500 text-white': props.variant === 'primary',
    'bg-red-50 text-red-400': props.variant === 'destructive',
    'bg-white border-sunset-500 text-sunset-500': props.variant === 'ghost',
  }
})
</script>

<template>
  <button 
    :class="wrapperClasses" 
    @click="$emit('click', $event)">
    {{ text }}
  </button>
</template>