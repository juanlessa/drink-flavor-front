<template>
	<div class="min-h-screen flex flex-col">
		<NavBar />
		<main
			class="flex-1 w-screen mx-auto my-1/4 pb-4 md:max-w-1190 md:mx-auto bg-light-secondary dark:bg-dark-secondary"
		>
			<slot />
		</main>
		<Footer class="bg-light-secondary dark:bg-dark-secondary" />
	</div>
</template>
<script setup lang="ts">
import { IBgColor } from "@/types/layout";

const props = defineProps({
	bgColor: {
		type: String,
		default: "primary",
	},
});
</script>
<style scoped></style>
