<template>
	<PageTemplate bg-color="primary-background">
		<IngredientsForm class="main-content-padding" />
	</PageTemplate>
</template>
<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});
</script>
