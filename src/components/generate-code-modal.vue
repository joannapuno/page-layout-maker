<script setup lang="ts">
import { ref, nextTick } from 'vue'
  import { 
	FloatingButton,
  Button,
	Modal,
  Toast } from '@/components'

import Prism from 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/themes/prism.css'
import * as prettier from "prettier"
import parserHtml from 'prettier/plugins/html'

const generatedCode = ref<string>('')
const codeBlock = ref<HTMLElement | null>(null)
const codeModalOpen = ref<boolean>(false)
const showToast = ref<boolean>(false)

const formatCode = async () => {
	try {
		generatedCode.value = await prettier.format(generatedCode.value, { 
			semi: false, 
			parser: "html", 
			plugins:[parserHtml] 
		});
	} catch(err) {
		console.error(err)
	} finally {
		nextTick(() => {
			if(codeBlock.value)
			Prism.highlightElement(codeBlock.value)
		})
	}
}

const openModal = () => {
	const gridLayout = document.getElementById('grid-layout')
	
  if(!gridLayout) return
	const c_gridLayout = gridLayout?.cloneNode(true) as HTMLElement

	//Remove unnecessary attrs
	c_gridLayout.classList.remove('grid-layout', 'w-100', 'h-100')
	c_gridLayout.removeAttribute('id')

	if(c_gridLayout.querySelectorAll('.grid-cell').length) {
		c_gridLayout.querySelectorAll('.grid-cell').forEach(el => {
			el.classList.remove('grid-cell')
			el.removeAttribute('id')
		})
	}

	//Remove unnecessary els
	if(c_gridLayout.querySelectorAll('.cell-display').length) {
		c_gridLayout.querySelectorAll('.cell-display').forEach(el => el.remove())
	}
	if(c_gridLayout.querySelectorAll('.lm-popover').length) {
		c_gridLayout.querySelectorAll('.lm-popover').forEach(el => el.remove())
	}

  // TODO: use ref
  const html = c_gridLayout.outerHTML
	
  generatedCode.value = html ?? ''
  codeModalOpen.value = true
  formatCode()
}

const copyCode = async () => {
	if(!navigator.clipboard) return
	try {
		await navigator.clipboard.writeText(generatedCode.value)
    showToast.value = true
	} catch (err) {
		console.error('Failed to copy', err)
	}
}
</script>
<template>
  <FloatingButton 
    text="Get code"
    icon="fa-solid fa-code" 
    @click="openModal" />

	<Modal title="Generated Code" title-icon="fa-solid fa-code" v-model:open="codeModalOpen">
		<pre class="language-markup d-grid border-rounded-5">
			<code ref="codeBlock" class="language-markup">{{ generatedCode }}</code>
		</pre>

		<template #buttons>
			<Button text="Cancel" @click="codeModalOpen = false" variant="ghost" />
			<Button text="Copy" @click="copyCode" />
		</template>
	</Modal>

  <Toast 
    v-model:open="showToast"
    message="Copied to clipboard!"
    icon="fa-solid fa-circle-check" />
</template>

<style>
code[class*="language-"], 
pre[class*="language-"] {
  tab-size: 0;
  white-space: pre-wrap;
	margin: 0;
}
</style>