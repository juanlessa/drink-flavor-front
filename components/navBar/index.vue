<template>
	<NavBarMobileNav :links="links" class="desktop-hidden" />
	<NavBarDesktopNav :links="links" :show-logout="showLogout" class="mobile-hidden" />
</template>
<script setup lang="ts">
import { AuthState } from "@/plugins/auth";
const { $getAuthState } = useNuxtApp();

interface ILink {
	name: string;
	path: string;
}

const showLogout = ref<boolean>(false);
const authState = ref<AuthState>($getAuthState());
const links = ref<ILink[]>();

onMounted(() => {
	links.value = handleUpdateLinks();
});

watch(
	() => $getAuthState(),
	(newValue) => {
		authState.value = newValue;
		links.value = handleUpdateLinks();
	}
);

const handleUpdateLinks = (): ILink[] => {
	let value = [] as ILink[];
	if (authState.value.authenticated) {
		value = [
			{ name: "categories", path: "/categories" },
			{ name: "ingredients", path: "/ingredients" },
			{ name: "drinks", path: "/drinks" },
		];
		showLogout.value = true;
	} else {
		value = [{ name: "login", path: "/login" }];
		showLogout.value = false;
	}
	return value;
};
</script>
