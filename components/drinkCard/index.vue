<template>
    <div class="card-container">

        <img class="card-image" src="sex-on-beach.png" />
        <div class="card-content">
            <h2 class="card-title">Sex on the beach</h2>
            <div class="card-ingredients">
                <div class="ingredient">
                    <div class="ingredient-circle" :style="{ 'background-color': '#E077F1' }">
                    </div>
                    <div class="ingredient-name">
                        Vodka
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.card-container {
    background-color: var(--white);
    height: 136px;
    width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;

    padding: 8px;

    display: flex;
    gap: 12px;

}

.card-image {
    border-radius: 4px;
}

.card-content {
    width: 100%;
}

.card-title {
    width: 100%;
    text-align: center;

    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 31px;

}

.ingredient {
    display: flex;
    gap: 4px;
}

.ingredient-circle {
    width: 15px;
    height: 15px;
    border-radius: 50%;
}

.ingredient-name {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
}

@media (min-width: 768px) {
    .card-container {
        width: 44vw;
    }

}

@media (min-width: 1190px) {
    .card-container {
        width: 356px;
    }

}
</style>