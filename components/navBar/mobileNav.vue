<template>
    <header ref="menuElement" class="header-container">
        <div class="header-content">
            <NuxtLink to="/">
                <img class="img-logo" src="/logo.png" alt="DrunkFlavor">
            </NuxtLink>
            <img @click="handleToggleMenu" :src="isMenuOpen ? '/menu-close-icon.svg' : '/menu-icon.svg'"
                :class="{ 'menu-icon': isMenuOpen, 'menu-close-icon': !isMenuOpen }" height="48" alt="" />
        </div>
        <div v-show="isMenuOpen" class="menu-modal">
            <div class="link-group">
                <NuxtLink v-for="l in props.links" :key="l.name" class="link-item" :to="l.path">
                    {{ l.name }}
                </NuxtLink>
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const menuElement = ref<HTMLElement>();
const isMenuOpen = ref<boolean>(false)

interface ILink {
    name: string,
    path: string
}
const props = defineProps({
    links: {
        type: Array<ILink>,
        default: [],
    },

});



const handleToggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

onClickOutside(menuElement, () => isMenuOpen.value = false)

</script>
<style scoped>
.header-container {
    height: 5rem;
    width: 100vw;
    background-color: var(--white);
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
    height: 100px;
    z-index: 1;
    background-color: var(--white);
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
}

.link-group {
    display: flex;
    flex-direction: column;
    margin: 1rem 3rem;
}
</style>