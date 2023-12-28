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
  if(!document.getElementById('grid-layout')) return

  // TODO: use ref
  const html = document.getElementById('grid-layout')?.outerHTML
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

	<Modal title="Generated Code" v-model:open="codeModalOpen">
		<div>
      <pre class="language-markup">
        <code ref="codeBlock" class="language-markup">{{ generatedCode }}</code>
      </pre>
		</div>

		<template #buttons>
			<Button text="Cancel" @click="codeModalOpen = false" />
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
}
</style>