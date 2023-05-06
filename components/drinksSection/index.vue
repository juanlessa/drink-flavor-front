<template>
    <section class="section-container">
        <div class="section-content">
            <DrinkCard />
            <DrinkCard />
            <DrinkCard />
            <DrinkCard />
            <DrinkCard />

        </div>

    </section>
</template>
<style scoped>
.section-container {
    width: 100vw;
}

.section-content {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 17px;
}

@media (min-width: 1190px) {
    .section-content {
        width: 1150px;
        margin: 0 auto;
        flex-direction: row;

    }

}
</style>