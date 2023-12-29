<template>
	<div class="min-h-screen flex flex-col">
		<NavBar />
		<main
			class="flex-1 w-screen mx-auto pb-4 desktop:max-w-[1190px]"
			:class="{ 'bg-light-primary': props.bgPrimary, 'dark:bg-dark-primary': props.bgPrimary }"
		>
			<slot />
		</main>
		<Footer :class="{ 'bg-light-primary': props.bgPrimary, 'dark:bg-dark-primary': props.bgPrimary }" />
	</div>
</template>
<script setup lang="ts">
const props = defineProps({
	bgPrimary: {
		type: Boolean,
		default: false,
	},
});
</script>
