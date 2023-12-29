<template>
	<div>
		<div v-show="props.showModal" class="absolute top-0 left-0 w-[100vw] h-full z-[2] bg-black opacity-30"></div>
		<div
			v-show="props.showModal"
			ref="deleteNodalBox"
			class="absolute top-[30%] left-1/2 transform -translate-x-1/2 w-[84%] tablet:w-[54%] desktop:w-[30%] desktop:max-w-[35rem] h-40 z-[2] rounded-2xl flex flex-col gap-6 items-center justify-center p-6 bg-light-primary dark:bg-dark-primary"
		>
			<p class="text-base text-center">
				{{ `${$t("deleteModal.message")} ${props.deleteItem.translations[$i18n.locale as LANGUAGES].name}` }}
			</p>
			<div class="flex gap-2 items-center justify-center">
				<button @click="handleCancelButton" class="action-button cancel-button-color modal-button">
					{{ $t("deleteModal.cancelButton.message") }}
				</button>
				<button @click="handleDeleteButton" class="action-button delete-button-color modal-button">
					{{ $t("deleteModal.deleteButton.message") }}
				</button>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { IItem } from "@/types/item";
import { LANGUAGES } from "@/types/translations";

const deleteNodalBox = ref<HTMLElement>();

const props = defineProps({
	showModal: {
		type: Boolean,
		default: false,
	},
	deleteItem: {
		type: Object as PropType<IItem>,
		default: {},
	},
});

const emit = defineEmits<{
	(e: "cancelClick", value: string): void;
	(e: "deleteClick", value: string): void;
}>();

const handleCancelButton = () => {
	emit("cancelClick", "cancel");
};

const handleDeleteButton = () => {
	emit("deleteClick", "delete");
};

onClickOutside(deleteNodalBox, handleCancelButton);
</script>
<style scoped>
.modal-button {
	@apply w-32;
}
</style>
