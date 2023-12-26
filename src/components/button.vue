<script lang="ts" setup>
const props = withDefaults(defineProps<{
  text: string
}>(), {

})
</script>

<template>
  <button class="bg-sunset-500 text-white border-rounded-5 px-16 py-8">
    {{ text }}
  </button>
</template>

<style lang="scss" scoped>

</style>