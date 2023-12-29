<template>
	<div>
		<div class="relative">
			<div
				v-bind="getRootProps()"
				class="w-full pt-6 px-4 pb-16 flex flex-col items-center gap-2 rounded-lg bg-light-secondary dark:bg-dark-secondary"
			>
				<input v-bind="getInputProps()" />
				<p class="drag-drop-label" v-if="isDragActive">{{ $t("dropZone.drop.message") }}</p>
				<p class="drag-drop-label" v-else>{{ $t("dropZone.drag.message") }}</p>
				<p class="drag-drop-label">{{ $t("dropZone.or.message") }}</p>
			</div>
			<button
				class="py-1 px-5 text-[0.8rem] border-none rounded-xl bg-light-select-file dark:bg-dark-select-file absolute bottom-6 left-1/2 transform -translate-x-1/2"
				@click="open"
			>
				{{ $t("dropZone.selectFile.message") }}
			</button>
		</div>
		<div class="drag-drop-label">
			<p v-if="file">{{ file.name }}</p>
			<IconsClose
				v-if="file"
				:size="14"
				:color="$getThemeColors().iconsColor"
				class="cursor-pointer"
				@click="handleClear"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useDropzone, FileRejectReason } from "vue3-dropzone";

const emit = defineEmits<{
	(e: "file", value: File | undefined): void;
}>();

const file = ref<File>();

const onDrop = (acceptedFiles: File[], rejectReasons: FileRejectReason[]) => {
	if (acceptedFiles.length === 1) {
		file.value = acceptedFiles[0];
		emit("file", file.value);
	}
};

const handleClear = () => {
	file.value = undefined;
	emit("file", file.value);
};

const options = reactive({
	multiple: false,
	onDrop,
	accept: "image/*",
});

const { getRootProps, getInputProps, isDragActive, isFocused, isDragReject, open } = useDropzone(options);
</script>
<style scoped>
.drag-drop-label {
	@apply text-[0.8rem] min-h-[1rem] inline-flex gap-2 items-center;
}
</style>
