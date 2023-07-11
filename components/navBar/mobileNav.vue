<template>
	<header ref="menuElement" class="header-container">
		<div class="header-content">
			<NuxtLink to="/" class="logo-container">
				<img
					class="img-logo"
					:src="$getTheme() === 'light' ? '/light-logo.png' : '/dark-logo.png'"
					height="40"
					alt="DrunkFlavor"
				/>
				<span>DrunkFlavor</span>
			</NuxtLink>
			<img
				@click="handleToggleMenu"
				:src="isMenuOpen ? '/menu-close-icon.svg' : '/menu-icon.svg'"
				:class="{ 'menu-icon': isMenuOpen, 'menu-close-icon': !isMenuOpen }"
				height="48"
				alt=""
			/>
		</div>
		<div v-show="isMenuOpen" class="menu-modal">
			<div class="link-group">
				<NuxtLink v-for="l in props.links" :key="l.name" class="link-item" :to="l.path">
					{{ l.name }}
				</NuxtLink>
				<div v-show="authSate.authenticated" @click="handleLogout" class="link-item">logout</div>
				<ThemeSwitch />
			</div>
		</div>
	</header>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { AuthState } from "@/plugins/auth";

const { $getAuthState, $signOut } = useNuxtApp();

const menuElement = ref<HTMLElement>();
const isMenuOpen = ref<boolean>(false);
const authSate = ref<AuthState>($getAuthState());

interface ILink {
	name: string;
	path: string;
}
const props = defineProps({
	links: {
		type: Array<ILink>,
		default: [],
	},
});

const handleToggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value;
};

onClickOutside(menuElement, () => (isMenuOpen.value = false));

const handleLogout = () => {
	return $signOut(true);
};
</script>
<style scoped>
.logo-container {
	display: flex;
	align-items: center;
	gap: 0.5rem;

	font-size: 2rem;
	color: var(--primary-color);
}

.header-container {
	height: 5rem;
	width: 100vw;
	background-color: var(--primary-background);
	position: relative;
}

.header-content {
	width: 95%;
	margin: auto auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
}

.menu-modal {
	position: absolute;
	top: 100%;
	left: 0;
	width: 100vw;
	z-index: 1;
	background-color: var(--primary-background);
	box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
}

.img-logo {
	cursor: pointer;
	height: 4rem;
}

.menu-icon {
	height: 4rem;
}

.menu-icon {
	height: 2.25rem;
	padding-right: 0.65rem;
}

.link-item {
	font-size: 1.2rem;
	padding: 0.5rem 0;
	margin: 0.25rem 0;
	cursor: pointer;
}

.link-group {
	display: flex;
	flex-direction: column;
	margin: 1rem 3rem;
}
</style>
