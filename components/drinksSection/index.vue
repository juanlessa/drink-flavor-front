<template>
    <section class="section-container">
        <div class="section-content">
            <DrinkCard v-for="d in drinks" :key="d.id" :drink-name="d.name" :drink-ingredients="d.ingredients" />

        </div>

    </section>
</template>
<script setup lang="ts">
const drinks = [
    {
        id: "1",
        name: "Sex on the beach",
        ingredients: [
            {

                name: "vodka",
                quantity: 60,
                unity: "ml",
                category: "vodka",
                isAlcoholic: true
            },
            {
                name: "Peach liquor",
                quantity: 45,
                unity: "ml",
                category: "liquor",
                isAlcoholic: true
            },
            {
                name: "Orange juice",
                quantity: 150,
                unity: "ml",
                category: "juice",
                isAlcoholic: false
            }
        ],
        method: "bla bla bla",
    },
    {
        id: "2",
        name: "Strawberry caipirinhaaa",
        ingredients: [
            {
                name: "Cachaça",
                quantity: 60,
                unity: "ml",
                category: "cachaça",
                isAlcoholic: true,
                colorTheme: "#FC4040"
            },
            {
                name: "Strawberry",
                quantity: 3,
                unity: "unity",
                category: "fruit",
                isAlcoholic: false,
                colorTheme: "#346aaa"
            },
            {
                name: "Lime juice",
                quantity: 30,
                unity: "ml",
                category: "juice",
                isAlcoholic: false,
                colorTheme: "#9CFF94"
            },
            {
                name: "Simple syrup",
                quantity: 30,
                unity: "ml",
                category: "syrup",
                isAlcoholic: false,
                colorTheme: "#14213D"
            }
        ],
        method: "bla bla bla",
    },
    {
        id: "3",
        name: "Mojito",
        ingredients: [
            {
                name: "Rum",
                quantity: 60,
                unity: "ml",
                category: "rum",
                isAlcoholic: true
            },
            {
                name: "Mint",
                quantity: 8,
                unity: "lift",
                category: "lift",
                isAlcoholic: false,
                colorTheme: "#9CFF94"
            },
            {
                name: "Lime juice",
                quantity: 30,
                unity: "ml",
                category: "juice",
                isAlcoholic: false,
                colorTheme: "#9CFF94"
            },
            {
                name: "Simple syrup",
                quantity: 30,
                unity: "ml",
                category: "syrup",
                isAlcoholic: false,
                colorTheme: "#14213D"
            }
        ],
        method: "bla bla bla",
    }
];

</script>
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