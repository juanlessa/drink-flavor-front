<template>
	<div>
		<div
			v-show="drink.cover"
			class="h-[30vh] w-full bg-center bg-no-repeat"
			:style="{ 'background-image': 'url(' + (drink.cover ? drink.cover : '') + ')' }"
		></div>
		<div class="main-content-padding">
			<h1 class="w-full py-6 px-0 text-[2.75rem] text-center">
				{{ drink.translations[$i18n.locale as LANGUAGES].name }}
			</h1>
			<div class="w-full flex flex-col desktop:flex-row desktop:gap-4">
				<div class="desktop:flex-[1_1_0%]">
					<h2 class="drink-recipe-title">{{ $t("drinkDetailPage.ingredients") }}</h2>
					<ul class="ingredient-items-group">
						<li class="text-xl" v-for="ing in drink.ingredients" :key="ing.ingredient._id">
							{{
								`${ing.quantity} ${
									ing.quantity === 1
										? ing.ingredient.translations[$i18n.locale as LANGUAGES].unit
										: ing.ingredient.translations[$i18n.locale as LANGUAGES].unit_plural
								} ${t("drinkDetailPage.ingredients.ofPreposition")} ${
									ing.ingredient.translations[$i18n.locale as LANGUAGES].name
								}`
							}}
						</li>
					</ul>
				</div>
				<div class="desktop:flex-[2_2_0%]">
					<h2 class="drink-recipe-title">{{ $t("drinkDetailPage.instructions") }}</h2>
					<p class="text-lg">{{ drink.translations[$i18n.locale as LANGUAGES].method }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { IDrink } from "@/types/drink";
import { LANGUAGES } from "@/types/translations";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
	drink: {
		type: Object as PropType<IDrink>,
		default: {},
	},
});
</script>
<style scoped>
.drink-recipe-title {
	@apply my-4 mx-0 text-[2rem] text-center;
}
</style>
