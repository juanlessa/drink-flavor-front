<template>
	<ComboboxRoot :key="componentKey" :searchTerm="props.search" @update:searchTerm="handleSearch" class="relative">
		<ComboboxHeader
			class="w-full inline-flex px-[0.75rem] py-[0.5rem] items-center rounded-full text-[1rem] gap-[0.5rem] bg-secondary"
		>
			<IconsSearch :size="18" :color="themeState.colors.iconsColor" />

			<ComboboxInput :id="props.id" class="bg-transparent outline-none w-full" @blur="handleBlur" />

			<ComboboxCancel>
				<IconsClose :size="18" :color="themeState.colors.iconsColor" />
			</ComboboxCancel>
			<ComboboxTrigger>
				<IconsBottomArrow :size="22" :color="themeState.colors.iconsColor" />
			</ComboboxTrigger>
		</ComboboxHeader>

		<ComboboxContent
			class="absolute z-10 w-full mt-1 bg-secondary overflow-hidden rounded-lg will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
		>
			<ComboboxViewport class="p-1">
				<ComboboxEmpty class="text-[1rem] font-medium text-center py-2">
					{{ $t("searchSelect.noResult.message") }}
				</ComboboxEmpty>

				<ComboboxGroup>
					<ComboboxItem
						v-for="item in props.items"
						:key="item._id"
						class="cursor-pointer text-[1rem] leading-none text-grass11 flex items-center h-[1.5rem] pr-[2.25rem] pl-[1.15rem] rounded-lg relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-primary data-[highlighted]:text-grass1"
						:value="item.translations[$i18n.locale as LANGUAGES].name"
						@click="handleUpdate(item)"
					>
						<span>
							{{ item.translations[$i18n.locale as LANGUAGES].name }}
						</span>
					</ComboboxItem>
				</ComboboxGroup>
			</ComboboxViewport>
		</ComboboxContent>
	</ComboboxRoot>
</template>
<script setup lang="ts">
import {
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxHeader,
	ComboboxInput,
	ComboboxItem,
	ComboboxItemIndicator,
	ComboboxRoot,
	ComboboxTrigger,
	ComboboxCancel,
	ComboboxViewport,
} from "radix-vue";
import { IItem } from "@/types/item";
import { LANGUAGES } from "@/types/translations";

const { $getTheme } = useNuxtApp();

const themeState = $getTheme();

const componentKey = ref(0);

const clearButton = ref<HTMLButtonElement>();

const props = defineProps({
	search: {
		type: String,
		default: "",
	},
	items: {
		type: Array as PropType<IItem[]>,
		default: [],
	},
	id: {
		type: String,
	},
});

const emit = defineEmits<{
	(e: "update:value", value: string): void;
	(e: "update:search", value: string): void;
	(e: "blur"): void;
}>();

const handleUpdate = (item: IItem) => {
	emit("update:value", item._id);
	handleBlur();
};
const handleSearch = (searchTerm: string) => {
	emit("update:search", searchTerm);
};

const handleBlur = () => {
	emit("blur");
};
</script>
