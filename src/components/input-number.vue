<script setup lang="ts">
  withDefaults(defineProps<{
    label: string
    id: string
    modelValue?: number
  }>(), {
    modelValue: undefined
  })

  const emit = defineEmits<{
    (event: 'update:modelValue', value: number): void
  }>()

  const handleInput = (evt: Event) => {
    const target = evt.target as HTMLInputElement
    emit('update:modelValue', +target.value)
  }
</script>
<template>
  <div class="d-flex flex-column gap-4">
    <label :for="id" class="text-r-14 text-gray-500">{{ label }}</label>
    <input 
      :id="id" 
      type="number" 
      v-bind="$attrs"
      :value.number="modelValue"
      @input.number="handleInput" 
      class="border-gray-400 border-rounded-5 px-4 py-8" />
  </div>
</template>