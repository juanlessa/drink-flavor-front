<template>
	<PageTemplate bg-color="primary-background">
		<CategoriesForm class="main-content-padding" :category="category" />
	</PageTemplate>
</template>
<script setup lang="ts">
import { Category } from "@/utils/dtos/Categories";
const { $axios: axios } = useNuxtApp();
const route = useRoute();

const category = ref<Category>();

definePageMeta({
	middleware: "auth",
});

onMounted(async () => {
	const categoryId = route.params.id;

	try {
		const response = await axios.get<Category>(`/categories/${categoryId}`);
		category.value = response.data;
	} catch (error) {
		console.error(error);
	}
});
</script>
