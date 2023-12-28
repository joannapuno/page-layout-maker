<script setup lang="ts">
  export interface Option {
    text?: string
    value: string | number
  }


  withDefaults(defineProps<{
    label: string
    id: string
    modelValue?: string | number
    options?: Option[]
  }>(), {
    modelValue: undefined
  })

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string | number): void
  }>()

  const handleInput = (evt: Event) => {
    const target = evt.target as HTMLSelectElement
    emit('update:modelValue', target.value)
  }
</script>
<template>
  <div class="d-flex flex-column gap-4">
    <label :for="id" class="text-r-14 text-gray-500">{{ label }}</label>
    <select 
      :id="id" 
      v-bind="$attrs"
      :value="modelValue"
      @input="handleInput" 
      class="border-gray-400 border-rounded-5 px-4 py-8">

      <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.text ?? option }}
      </option>

    </select>
  </div>
</template>