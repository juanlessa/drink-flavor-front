<template>
    <header class="header-container">
        <div class="header-content">
            <NuxtLink to="/">
                <img class="img-logo" src="/logo.png" height="75" alt="DrunkFlavor">
            </NuxtLink>
        </div>
    </header>
</template>
<style scoped>
.header-container {
    height: 10vh;
    max-height: 5.5rem;
    width: 100vw;
    background-color: var(--white);
}

.header-content {
    width: 95%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 100%;

}

.img-logo {
    cursor: pointer;
}




@media (min-width: 1190px) {
    .header-content {
        width: 1048px;
    }

}
</style>