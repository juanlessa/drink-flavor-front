<template>
	<SwitchRoot
		:id="props.id"
		:checked="props.value"
		class="w-[42px] h-[25px] focus-within:outline focus-within:outline-black flex bg-gray-400 shadow-sm rounded-full relative data-[state=checked]:bg-light-theme data-[state=checked]:dark:bg-dark-theme cursor-default"
		@update:checked="handleUpdate"
	>
		<SwitchThumb
			class="block w-[21px] h-[21px] my-auto bg-white shadow-sm rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]"
		/>
	</SwitchRoot>
</template>
<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from "radix-vue";

const props = defineProps({
	id: {
		type: String,
		default: "",
	},
	value: {
		type: Boolean,
		default: false,
	},
});
const emit = defineEmits<{
	(e: "update:value", value: boolean): void;
}>();

const handleUpdate = (value: boolean) => {
	emit("update:value", value);
};
</script>
