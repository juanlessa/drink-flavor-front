<template>
	<header ref="menuElement" class="header-container">
		<div class="header-content">
			<NuxtLink to="/" class="logo-container">
				<img
					class="img-logo"
					:src="themeState.themeMode === THEME_MODES.light ? '/light-logo.png' : '/dark-logo.png'"
					height="40"
					alt="DrunkFlavor"
				/>
				<span>DrunkFlavor</span>
			</NuxtLink>

			<div class="link-group">
				<LanguageSwitcher />
				<ThemeSwitcher />
				<NuxtLink v-for="l in props.links" :key="l.path" class="link-item" :to="l.path">
					{{ $t(l.i18nKey) }}
				</NuxtLink>
				<div v-show="authSate.authenticated" @click="handleLogout" class="link-item">logout</div>
			</div>
		</div>
	</header>
</template>
<script setup lang="ts">
import { ILink } from "@/types/navbar";
import { THEME_MODES } from "@/types/theme";

const { $signOut, $getAuthState, $getTheme } = useNuxtApp();

const authSate = $getAuthState();
const themeState = $getTheme();

const props = defineProps({
	links: {
		type: Array<ILink>,
		default: [],
	},
});

const handleLogout = () => {
	$signOut(true);
};
</script>
<style scoped>
.header-container {
	height: 5rem;
	width: 100vw;
	background-color: var(--primary-background);
}
.logo-container {
	display: flex;
	align-items: center;
	gap: 0.5rem;

	font-size: 2rem;
	color: var(--primary-color);
}
.header-content {
	width: 1190px;
	margin: auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
}

.img-logo {
	cursor: pointer;
	height: 4rem;
}

.link-group {
	padding-right: 3rem;
	display: flex;
	align-items: center;
	gap: 2rem;
}

.link-item {
	font-size: 1.2rem;
	display: block;
	cursor: pointer;
}
</style>
