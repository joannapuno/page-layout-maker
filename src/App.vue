<script setup lang="ts">
import { ref, computed, onMounted, nextTick, onUpdated, Ref } from 'vue'



import { 
	Cell,
	Button,  
	InputNumber, 
	InputSelect, 
	Option,
	Modal,
	Layout,
	ComponentsPanel,
	GenerateCodeModal } from '@/components'

const cellNum = ref<number>(1)
const cols = ref<number>(12)
const rows = ref<number>(1)
const colGap = ref<number>(0)
const rowGap = ref<number>(0)
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

// Todo
// const displayGrid = computed(() => cols.value * rows.value)

</script>

<template>
	<div class="container gap-16">
		<ComponentsPanel />

		<div class="p-24">
			<div class="grid-5 gap-8 mb-24">
				<InputNumber
					id="cell-num" 
					label="# of Cells"
					:max="12"
					v-model="cellNum" />
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

			<Layout 
				id="grid-layout"
				:columns="cols"
				:rows="rows"
				:col-gap="colGap"
				:row-gap="rowGap">
				<Cell 
					v-for="cell in cellNum" 
					:key="cell"
					:id="`cell-${cell}`"></Cell>
			</Layout>
		</div>
	</div>


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

	    <!-- TODO -->
    <!-- <Popover title="Edit Cell" v-model:open="openPopover">
      <div class="d-flex flex-column gap-8">
        <InputNumber id="col-span" label="Column Span" v-model="colSpan" :max="12" />
        <InputNumber id="row-span" label="Row Span" v-model="rowSpan" :max="12" />
      </div>

      <template #buttons>
        <Button text="Done" @click="openPopover = false" />
      </template>
    </Popover> -->

	<GenerateCodeModal />
</template>

<style lang="scss">
.container {
	display: grid;
	grid-template-columns: auto 1fr;
}
.grid-layout {
	max-height: 90rem;
	position: relative;
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
