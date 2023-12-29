<template>
	<div class="w-full flex flex-wrap items-center justify-center gap-4">
		<div
			v-for="i in props.items"
			:key="i._id"
			class="w-full max-w-[40rem] h-12 rounded-[1rem] flex items-center bg-light-primary dark:bg-dark-primary shadow-light-card dark:shadow-dark-card"
		>
			<div @click="handleItemClick(i)" class="h-full pl-4 flex items-center flex-1 cursor-pointer">
				{{ i.translations[$i18n.locale as LANGUAGES].name }}
			</div>
			<div @click="handleDeleteButton(i)" class="w-12 h-full flex items-center justify-center cursor-pointer">
				<IconsGarbage :size="24" :color="$getThemeColors().iconsColor" alt="delete" />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { IItem } from "@/types/item";
import { LANGUAGES } from "@/types/translations";

const props = defineProps({
	items: {
		type: Array as PropType<IItem[]>,
		default: [],
	},
});

const emit = defineEmits<{
	(e: "itemClick", value: IItem): void;
	(e: "delete", value: IItem): void;
}>();

const handleItemClick = (item: IItem): void => {
	emit("itemClick", item);
};

const handleDeleteButton = (item: IItem): void => {
	emit("delete", item);
};
</script>
