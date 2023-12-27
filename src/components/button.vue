<script lang="ts" setup>
const props = withDefaults(defineProps<{
  text: string
}>(), {

})

defineEmits<{
  (event: 'click', value: Event):void
}>()
</script>

<template>
  <button 
    class="bg-sunset-500 text-white border-rounded-5 px-16 py-8" 
    @click="$emit('click', $event)">
    {{ text }}
  </button>
</template>