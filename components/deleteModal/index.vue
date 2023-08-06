<template>
	<div>
		<div v-show="props.showModal" class="delete-modal-background"></div>
		<div v-show="props.showModal" ref="deleteNodalBox" class="delete-modal-box">
			<div class="delete-modal-message">{{ props.modalText }}</div>
			<div class="buttons-container">
				<button @click="handleCancelButton" class="action-button cancel-button-color modal-button">
					cancel
				</button>
				<button @click="handleDeleteButton" class="action-button delete-button-color modal-button">
					delete
				</button>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const deleteNodalBox = ref<HTMLElement>();

const props = defineProps({
	showModal: {
		type: Boolean,
		default: false,
	},
	modalText: {
		type: String,
		default: "",
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
.delete-modal-background {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100%;
	z-index: 2;
	background-color: black;
	opacity: 0.3;
}

.delete-modal-box {
	position: absolute;
	top: 30%;
	left: 8%;
	width: 84%;
	height: 10rem;
	z-index: 2;
	background-color: var(--primary-background);
	border-radius: 1rem;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	align-items: center;
	justify-content: center;
	padding: 1.5rem;
}

.delete-modal-message {
	font-size: 1rem;
	text-align: center;
}

.buttons-container {
	display: flex;
	gap: 0.5rem;
	align-items: center;
	justify-content: center;
}
.modal-button {
	width: 8rem;
}

@media (min-width: 780px) {
	.delete-modal-box {
		left: 23%;
		width: 54%;
	}
}

@media (min-width: 1190px) {
	.delete-modal-box {
		left: 35%;
		width: 30%;
		max-width: 35rrem;
	}
}
</style>
