<template>
	<div
		@click="goToDrinkDetailPage"
		class="bg-light-primary dark:bg-dark-primary h-[8.5rem] w-full tablet:max-w-[44vw] desktop:max-w-[23.25rem] flex gap-3 p-2 rounded-lg cursor-pointer shadow-light-card dark:shadow-dark-card"
	>
		<img class="h-[7.5rem] w-[7rem] rounded" :src="drink.thumbnail || '/default-drink-thumb.png'" />
		<div class="w-full">
			<h2 class="w-full h-16 flex items-center justify-center text-center text-[1.5rem]">
				<div>{{ props.drink.translations[$i18n.locale as LANGUAGES].name }}</div>
			</h2>
			<div class="mt-3 flex flex-wrap gap-y-[0.3rem] gap-x-[0.75rem]">
				<div v-for="cat in categories" :key="cat._id" class="text-base">
					{{ cat.translations[$i18n.locale as LANGUAGES].name }}
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { IDrink } from "@/types/drink";
import { ICategory } from "@/types/category";
import { LANGUAGES } from "@/types/translations";
import { ROUTES } from "@/types/appRoutes";

const { $router } = useNuxtApp();

const props = defineProps({
	drink: {
		type: Object as PropType<IDrink>,
		default: {},
	},
});

const categories = ref<ICategory[]>([...new Set(props.drink.ingredients.map((ing) => ing.ingredient.category))]);

const goToDrinkDetailPage = () => {
	$router.push(`${ROUTES.drinks}/${props.drink._id}`);
};
</script>
