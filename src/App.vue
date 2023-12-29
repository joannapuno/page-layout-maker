<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { LayoutMaker, DesktopOnly } from '@/views'

const isSmallScreen = ref<boolean>(false)
const media = ref<MediaQueryList | undefined>()

const handleMedia = () => {
	if(!media.value) return
	isSmallScreen.value = media.value.matches
}

onMounted(() => {
	media.value = window.matchMedia("(max-width: 990px)")
	handleMedia()
	media.value.addEventListener('change', handleMedia)
})
onUnmounted(() => media.value?.removeEventListener('change', handleMedia))
</script> 

<template>
	<DesktopOnly v-if="isSmallScreen" />
	<LayoutMaker v-else />
</template>