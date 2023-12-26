<script setup lang="ts">
import { ref, computed } from 'vue'
import DragItem from '@/components/draggable/drag-item.vue'
import { Button, InputText, InputNumber, InputSelect, Option } from '@/components'

const cols = ref<number>(5)
const rows = ref<number>(5)
const colGap = ref<string>('0')
const rowGap = ref<string>('0')

const gaps = ref<Option[]>([
	0,
  2,
  4,
  8,
  12,
  16,
  20,
  24,
  28,
  32,
  36,
  40,
  44,
  48,
  52,
  56,
  60,
  64,
  68
])

const layoutClasses = computed(() => {
	return {
		'grid-layout': true,
		'w-100': true,
		'h-100': true,
		[`grid-${cols.value}`]: true,
		[`grid-row-${rows.value}`]: true,
		[`column-gap-${colGap.value}`]: true,
		[`row-gap-${rowGap.value}`]: true
	}
})

const cellNum = computed(() => cols.value * rows.value)
</script>

<template>
	<div class="vh-100 grid-2 gap-16">
		<div class="p-24">
			<div class="grid-4 gap-8 mb-24">
				<InputNumber
					id="cols" 
					label="Columns"
					:max="12"
					v-model="cols" />

				<InputNumber
					id="rows" 
					label="Rows"
					:max="12" 
					v-model="rows" />

				<InputSelect
					id="col-gap" 
					label="Column Gap"
					:options="gaps"
					v-model="colGap" />

				<InputSelect
					id="row-gap" 
					label="Row Gap"
					:options="gaps"
					v-model="rowGap" />
			</div>

			<div :class="layoutClasses">
				<div v-for="cell in cellNum" :key="cell" class="grid-cell"></div>
			</div>
		</div>
		
		<div class="bg-white border-gray-300 position-sticky right-0 top-0">
			<h1 class="text-regular-24 py-16 px-24">Components</h1>
			<div class="py-16 px-24">
				<DragItem>
					<Button text="Button" />
				</DragItem>
				
				<DragItem>
					<InputText id="sample" label="Name" />
				</DragItem>
			</div>
		</div>
	</div>
</template>

<style scoped>
.grid-layout {
	max-height: 90rem;
}
.grid-cell {
	border: 1px dotted #bababa;
}
</style>
