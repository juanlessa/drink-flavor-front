<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		:width="size"
		:height="size"
		viewBox="0 0 96 96"
		xml:space="preserve"
	>
		<path
			d="M12,52h62.344L53.172,73.172c-1.562,1.562-1.562,4.094,0,5.656c1.562,1.562,4.095,1.562,5.657,0l28-28c1.562-1.562,1.562-4.095,0-5.656l-28-28C58.048,16.391,57.024,16,56,16c-1.023,0-2.047,0.391-2.828,1.172c-1.562,1.562-1.562,4.095,0,5.656L74.344,44H12c-2.209,0-4,1.791-4,4S9.791,52,12,52z"
			:fill="color"
		/>
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
