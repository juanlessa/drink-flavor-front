<template>
    <div>
        <div v-bind="getRootProps()" class="drop-area">
            <input v-bind="getInputProps()">
            <p class="drag-drop-label" v-if="isDragActive">Drop the file here</p>
            <p class="drag-drop-label" v-else>Drag and drop the file here</p>
            <p class="drag-drop-label">OR</p>
            <button class="select-file-button" @click="open">select file</button>
        </div>
        <div v-if="file">
            <p class="drag-drop-label">{{ file.name }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useDropzone } from 'vue3-dropzone'
import type { FileRejectReason } from 'vue3-dropzone'

const emit = defineEmits<{
    (e: 'file', value: File): void
}>()

const file = ref<File>()

function onDrop(acceptedFiles: File[], rejectReasons: FileRejectReason[]) {
    console.log('acceptedFiles', acceptedFiles)
    console.log('rejectReasons', rejectReasons)
    if (acceptedFiles.length === 1) {
        file.value = acceptedFiles[0]
        emit('file', file.value)
    }
}

const options = reactive({
    multiple: false,
    onDrop,
    accept: 'image/*',
})

const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragReject,
    open
} = useDropzone(options)

</script>
<style scoped>
.drop-area {
    width: 100%;
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    background-color: var(--light-50);
    border-radius: 0.5rem;
}

.drag-drop-label {
    font-size: 0.8rem;
}

.select-file-button {
    padding: 0.5rem 1.25rem;
    font-size: 0.8rem;
    background-color: #81D8D0;
    border: none;
    border-radius: 1rem;
}
</style>