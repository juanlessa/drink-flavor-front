<template>
	<svg :width="size" :height="size" viewBox="0 0 98 137" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M75.6 44.8V117.8C75.6 121.2 72.8 124 69.4 124H21.3C17.9 124 15.1 121.2 15.1 117.8V44.8H75.6ZM59.9 52.9001V115.7H63.5V52.9001H59.9ZM43.6 52.9001V115.7H47.2V52.9001H43.6ZM27.3 52.9001V115.7H30.9V52.9001H27.3ZM31.3 27.9V22.7001C31.3 19.4001 33.9 16.8 37.2 16.8H53.6C56.9 16.8 59.5 19.4001 59.5 22.7001V27.9H77.6C81 27.9 83.8 30.7 83.8 34.1V38.4001H7V34C7 30.6 9.8 27.8 13.2 27.8H31.3V27.9ZM37.2 20.8C36.2 20.8 35.4 21.6 35.4 22.6V27.8H55.5V22.6C55.5 21.6 54.7 20.8 53.7 20.8H37.2Z"
			:fill="color"
		/>
	</svg>
</template>
<script setup lang="ts">
const props = defineProps({
	size: {
		type: Number,
		default: 50,
	},
	color: {
		type: String,
		default: "#14213D",
	},
});
</script>
