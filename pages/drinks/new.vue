<template>
	<PageTemplate bg-color="primary-background">
		<DrinksForm class="main-content-padding" />
	</PageTemplate>
</template>
<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});
</script>
