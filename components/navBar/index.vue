<template>
    <NavBarMobileNav :links="links" class="desktop-hidden" />
    <NavBarDesktopNav :links="links" class="mobile-hidden" />
</template>
<script setup lang="ts">
const links = [
    {
        name: "ingredients",
        path: "/ingredients"
    },
    {
        name: "drinks",
        path: "/drinks"
    }
]
</script>
<style scoped>
.mobile-hidden {
    display: none;
}

@media (min-width: 1190px) {
    .desktop-hidden {
        display: none;
    }

    .mobile-hidden {
        display: block;
    }

}
</style>