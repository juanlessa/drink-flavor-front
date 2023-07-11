<template>
	<NuxtPage />
</template>
<script setup lang="ts">
const { $setTheme } = useNuxtApp();

onMounted(() => {
	$setTheme();
});
</script>
