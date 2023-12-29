<script setup lang="ts">
import { ref, computed, reactive, onMounted, nextTick } from 'vue'
import { 
	Cell,
	Button,  
	InputNumber, 
	InputSelect, 
	Option,
	Popover,
	Layout,
	ComponentsPanel,
	GenerateCodeModal } from '@/components'

interface Cell {
	colSpan?: number
	rowSpan?:number
}

const cols = ref<number>(12)
const rows = ref<number>(2)
const colGap = ref<number>(8)
const rowGap = ref<number>(8)
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
const openCellEdit = ref<boolean>(false)
const selectedCell = ref<number>(0)


// Todo
// const displayGrid = computed(() => cols.value * rows.value)

const cells = ref<Cell[]>([])
const addCell = () => {
	let newCell: Cell = {
		colSpan: 1,
		rowSpan: 1
	}
	cells.value?.push(newCell)
}

const editCell = (cell: number) => {
	openCellEdit.value = true
	selectedCell.value = cell
}

const removeCell = () => {
	openCellEdit.value = false
	cells.value = cells.value.filter((_, index) => index !== selectedCell.value)
	selectedCell.value = 0
}

const addDefaultLayout = () => {
	const defaultCells: Cell[] = [
		{ colSpan: 12 },
		{ colSpan: 6 },
		{ colSpan: 6 },
	]

	cells.value = [...defaultCells]
}

onMounted(() => {
	addDefaultLayout()
})

</script>

<template>
	<div class="container gap-16">
		<ComponentsPanel />

		<div class="d-flex flex-column gap-24 p-16">
			<div class="align-items-end bg-white border-rounded-5 gap-8 grid-5 position-sticky top-0 z1 p-24">
				<Button text="Add Cell" @click="addCell" />

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

			<div class="bg-white border-rounded-5 h-100 position-relative p-24">
				<Layout 
					id="grid-layout"
					:columns="cols"
					:rows="rows"
					:col-gap="colGap"
					:row-gap="rowGap">
					<Cell 
						v-for="(cell, index) in cells" 
						:key="index"
						:id="`cell-${index}`"
						:col-span="cell.colSpan ?? 1"
						:row-span="cell.rowSpan ?? 1"
						@click="editCell(index)" />
				</Layout>
			</div>
		</div>
	</div>

	<GenerateCodeModal />
	<Teleport v-if="openCellEdit && selectedCell != null" :to="`#cell-${selectedCell}`">
		<Popover :title="`Edit Cell # ${selectedCell}`" v-model:open="openCellEdit">
			<div class="d-flex flex-column gap-8">
				<InputNumber id="col-span" label="Column Span" v-model="cells[selectedCell].colSpan" :max="12" />
				<InputNumber id="row-span" label="Row Span" v-model="cells[selectedCell].rowSpan" :max="12" />
				<Button text="Remove Cell" variant="destructive" @click.stop="removeCell" />
			</div>
			<!-- <template #buttons>
				<Button text="Done" @click="openCellEdit = false" />
			</template> -->
		</Popover>
	</Teleport>





<!-- For displaying grid lines -->
					<!-- <Layout 
						class="display"
						:columns="cols"
						:rows="rows"
						:col-gap="colGap"
						:row-gap="rowGap">
						<Cell 
							v-for="cell in displayGrid" 
							:key="cell"
							:id="`cell-${cell}`"></Cell>
					</Layout> -->

</template>

<style lang="scss">
.container {
	display: grid;
	grid-template-columns: auto 1fr;
}

.display {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: -1;
	background: transparent;
}
</style>
