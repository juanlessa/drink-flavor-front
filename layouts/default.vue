<template>
	<div class="page-container">
		<NavBar />
		<main class="main-content" :style="{ 'background-color': 'var(--' + props.bgColor + ')' }">
			<slot />
		</main>
		<Footer :style="{ 'background-color': 'var(--' + props.bgColor + ')' }" />
	</div>
</template>
<script setup lang="ts">
import { IBgColor } from "@/types/layout";

const props = defineProps({
	bgColor: {
		type: String as PropType<IBgColor>,
		default: IBgColor.secondary,
	},
});
</script>
<style scoped>
.page-container {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

.main-content {
	flex: 1;
	width: 100vw;
	margin: 0.25rem auto 0 auto;
	padding-bottom: 1rem;
}

@media (min-width: 1190px) {
	.main-content {
		max-width: 1190px;
	}
}
</style>
