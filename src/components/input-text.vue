<script lang="ts" setup>
defineOptions({ inheritAttrs: false })

withDefaults(defineProps<{
  label: string
  id: string
  modelValue?: string
}>(), {
  modelValue: ''
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const handleInput = (evt: Event) => {
  const target = evt.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

</script>

<template>
  <div class="d-flex flex-column gap-4">
    <label :for="id" class="text-r-14 text-gray-500">{{ label }}</label>
    <input 
      :id="id" 
      type="text" 
      v-bind="$attrs" 
      :value="modelValue"
      @input="handleInput" 
      class="border-gray-400 border-rounded-5 px-4 py-8" />
  </div>
</template>