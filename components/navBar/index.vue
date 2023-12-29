<template>
	<NavBarMobileNav class="desktop-hidden" :links="navbarState.links" />
	<NavBarDesktopNav class="mobile-hidden" :links="navbarState.links" />
</template>
<script setup lang="ts">
const { loadRoutes, getNavbarState } = useNavbar();
const navbarState = getNavbarState();

onMounted(() => {
	loadRoutes();
});
</script>
