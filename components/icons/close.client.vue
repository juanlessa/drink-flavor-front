<template>
	<svg :width="size" :height="size" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M15.9688 15.9688L57.0312 57.0312"
			:stroke="color"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M15.9688 57.0312L57.0312 15.9688"
			:stroke="color"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</template>
<script setup lang="ts">
const props = defineProps({
	size: {
		type: Number,
		default: 42,
	},
	color: {
		type: String,
		default: "#14213D",
	},
});
</script>
