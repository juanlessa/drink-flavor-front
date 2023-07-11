<template>
	<div ref="searchContainer" class="search-container">
		<div class="search-input-group">
			<img class="search-image" src="/search-icon.svg" height="14" alt="search icon" />
			<input :value="keyword" @input="handleInput($event)" class="search-text-input" type="text" name="" />
			<img @click="handleSearchClear" src="/close-icon.svg" height="16" alt="search icon" />
		</div>
		<div v-show="mutableOptions.length" class="options-container">
			<ul class="options-content">
				<li class="search-item" @click="handleOptionSelect(opt)" v-for="opt in mutableOptions" :key="opt.id">
					{{ opt.name }}
				</li>
			</ul>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

interface IOptions {
	id: string;
	name: string;
}
const searchContainer = ref<HTMLElement>();

const keyword = ref<string>("");
const originalOptions = ref<IOptions[]>([]);
const mutableOptions = ref<IOptions[]>([]);

const props = defineProps({
	value: {
		type: String,
		default: "",
	},
	options: {
		type: Array<IOptions>,
		default: [],
	},
	searchMinLength: {
		type: Number,
		default: 3,
	},
	alreadySelected: {
		type: Array<String>,
		default: [],
	},
});
const emit = defineEmits<{
	(e: "input", value: string): void;
	(e: "shouldSearch", value: string): void;
	(e: "select", value: IOptions): void;
}>();

onMounted(() => {
	keyword.value = props.value;
	if (props.options.length) {
		handleCloneOptions();
	}
});

watch(
	() => props.value,
	(newValue) => {
		keyword.value = newValue;
	}
);
watch(
	() => props.options,
	(newValue) => {
		handleCloneOptions();
	}
);

const handleInput = (event: Event) => {
	const newValue = (event.target as HTMLInputElement).value;
	emit("input", newValue);
	keyword.value = newValue;
	if (newValue.length >= props.searchMinLength) {
		if (originalOptions.value.length === 0) {
			emit("shouldSearch", newValue);
		} else {
			handleSearchInternally();
		}
	} else {
		handleResetOptions();
	}
};
const handleOptionSelect = (opt: IOptions) => {
	emit("select", opt);
	keyword.value = "";
	emit("input", opt.id);
	handleResetOptions();
};
const handleCloneOptions = () => {
	originalOptions.value = props.options.map((opt) => ({ id: opt.id, name: opt.name } as IOptions));
	mutableOptions.value = props.options.filter((opt) => {
		if (!props.alreadySelected.includes(opt.id)) {
			return { id: opt.id, name: opt.name } as IOptions;
		}
	});
};
const handleResetOptions = () => {
	originalOptions.value = [];
	mutableOptions.value = [];
};

const handleSearchClear = () => {
	keyword.value = "";
	emit("select", {} as IOptions);
	emit("input", "");
	handleResetOptions();
};
const handleSearchInternally = () => {
	const search = keyword.value;
	mutableOptions.value = originalOptions.value.filter((opt) => {
		return opt.name.toLowerCase().search(search.toLowerCase()) >= 0 && !props.alreadySelected.includes(opt.id);
	});
};
</script>
<style scoped>
.search-container {
	position: relative;
}

.search-input-group {
	display: flex;
	align-items: center;
	background-color: var(--secondary-background);
	border-radius: 1.5rem;
	padding: 0 0.75rem;
}

.search-text-input {
	flex: 1;
	border: none;
	background-color: var(--secondary-background);
	padding: 0.5rem;
}

.search-text-input:focus {
	outline: none;
}

.options-content {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.options-container {
	padding: 1rem 1rem 1rem 1rem;
	position: absolute;
	top: 100%;
	left: 1rem;
	max-height: 6rem;
	width: 89%;
	border-radius: 0 0 0.25rem 0.25rem;
	box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
	background-color: var(--primary-background);

	overflow-y: scroll;
}

.search-image {
	opacity: 0.7;
}

.search-item {
	font-size: 0.8rem;
	cursor: pointer;
}
</style>
