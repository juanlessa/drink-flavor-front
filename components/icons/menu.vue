<template>
	<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" :width="size" :height="size" viewBox="0 0 50 50">
		<path
			:fill="color"
			d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"
		></path>
	</svg>
</template>
<script setup lang="ts">
const props = defineProps({
	size: {
		type: Number,
		default: 128,
	},
	color: {
		type: String,
		default: "#14213D",
	},
});
</script>
