<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		:width="size"
		:height="size"
		viewBox="0 0 42 42"
	>
		<path
			d="M39.04,7.604l-2.398-1.93c-1.182-0.95-1.869-0.939-2.881,0.311L16.332,27.494l-8.111-6.739
	c-1.119-0.94-1.819-0.89-2.739,0.26l-1.851,2.41c-0.939,1.182-0.819,1.853,0.291,2.78l11.56,9.562c1.19,1,1.86,0.897,2.78-0.222
	l21.079-25.061C40.331,9.294,40.271,8.583,39.04,7.604z"
			:fill="color"
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
