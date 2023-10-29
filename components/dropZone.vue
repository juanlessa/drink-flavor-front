<template>
	<div>
		<div class="relative">
			<div v-bind="getRootProps()" class="drop-area">
				<input v-bind="getInputProps()" />
				<p class="drag-drop-label" v-if="isDragActive">{{ $t("dropZone.drop.message") }}</p>
				<p class="drag-drop-label" v-else>{{ $t("dropZone.drag.message") }}</p>
				<p class="drag-drop-label">{{ $t("dropZone.or.message") }}</p>
			</div>
			<button class="select-file-button absolute bottom-6 left-1/2 transform -translate-x-1/2" @click="open">
				{{ $t("dropZone.selectFile.message") }}
			</button>
		</div>
		<div class="drag-drop-label">
			<p v-if="file">{{ file.name }}</p>
			<IconsClose v-if="file" :size="14" class="cursor-pointer" @click="handleClear" />
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
.drop-area {
	width: 100%;
	padding: 1.5rem 1rem 4rem 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	background-color: var(--secondary-background);
	border-radius: 0.5rem;
}

.drag-drop-label {
	font-size: 0.8rem;
	min-height: 1rem;
	display: inline-flex;
	gap: 0.5rem;
	align-items: center;
}

.select-file-button {
	padding: 0.5rem 1.25rem;
	font-size: 0.8rem;
	background-color: #81d8d0;
	border: none;
	border-radius: 1rem;
}
</style>
