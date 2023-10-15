<template>
	<NavBarMobileNav :links="navbarState.links" class="desktop-hidden" />
	<NavBarDesktopNav :links="navbarState.links" class="mobile-hidden" />
</template>
<script setup lang="ts">
const { loadRoutes, getNavbarState } = useNavbar();

const navbarState = getNavbarState();

onMounted(() => {
	loadRoutes();
});
</script>
