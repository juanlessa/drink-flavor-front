<template>
    <div class="page-container">
        <NavBar />
        <main class="main-content">
            <section class="section-container">
                <div class="section-content">
                    <div class="new-drink-group">
                        <button @click="handleNewDrink" class="button-new">new Drink</button>
                    </div>
                    <div class="drinks-group">
                        <div v-for="d in drinks" :key="d.id" class="drink-card">
                            <div @click="handleEditDrink(d)" class="drink-item">
                                <span class="drink-name">{{ d.name }}</span>
                            </div>
                            <div @click="handleDeleteButton(d)" class="drink-delete-box">
                                <img class="drink-delete" src="/delete-icon.svg" height="24" alt="delete drink" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="delete-modal-container">
                <div v-show="isDeleteModalOpen" class="delete-modal-background"></div>
                <div v-show="isDeleteModalOpen" ref="deleteNodal" class="delete-modal-box">
                    <span class="delete-modal-message">Are you sure you want to delete this drink?</span>
                    <div class="button-container">
                        <button @click="handleCancelButton" class="button-cancel">cancel</button>
                        <button @click="handleDeleteDrink" class="button-delete">delete</button>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { IDrinkResponse } from '@/utils/dtos/DrinksDTO'
import toastConfig from '@/utils/toastConfig'
import { AxiosError } from 'axios';
const axios = useNuxtApp().$axios
const deleteNodal = ref<HTMLElement>();
const drinks = ref<IDrinkResponse[]>([])
const isDeleteModalOpen = ref<boolean>(false)
const drinkToDelete = ref<string>("")

onMounted(() => {
    handleLoadDrinks()
})

const handleEditDrink = (d: IDrinkResponse) => {
    useNuxtApp().$router.push(`/drinks/${d.id}/edit`)
}
const handleNewDrink = () => {
    useNuxtApp().$router.push(`/drinks/new`)
}
const handleDeleteButton = (d: IDrinkResponse) => {
    isDeleteModalOpen.value = true
    drinkToDelete.value = d.id as string
}
const handleDeleteDrink = () => {
    let requestBody = {
        data: {
            "id": drinkToDelete.value
        }
    }
    axios.delete("/drinks", requestBody).then(() => {
        isDeleteModalOpen.value = false
        useNuxtApp().$toast.success("SUCCESS", toastConfig);
        handleLoadDrinks()

    })
}
const handleCancelButton = () => {
    isDeleteModalOpen.value = false
    drinkToDelete.value = ""
}
onClickOutside(deleteNodal, handleCancelButton)

const handleLoadDrinks = () => {
    axios.get("/drinks")
        .then((response) => {
            drinks.value = response.data as IDrinkResponse[]

        }).catch((error) => {
            console.error("error ")
        })
}
</script>
<style scoped>
.new-drink-group {
    width: 100%;
    margin-top: 1rem;
}

.button-new {
    margin: auto;
    display: block;
    width: 100%;
    padding: auto;
    height: 2.5rem;
    max-width: 20rem;
    background-color: var(--button-submit);
    border: none;
    border-radius: 1rem;
    color: var(--white);
}

.drinks-group {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.drink-card {
    width: 100%;
    height: 3rem;
    background-color: var(--white);
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
    border-radius: 0.5rem;
    padding: auto 1rem;
    display: flex;
    align-items: center;
    padding: 0;
}

.drink-item {
    height: 100%;
    flex: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding-left: 1rem;
}


.drink-delete-box {
    width: 3rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.delete-modal-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    z-index: 2;
    background-color: black;
    opacity: 0.3;
    padding: auto;
}

.delete-modal-box {
    position: absolute;
    top: 30%;
    left: 8%;
    width: 84%;
    height: 10rem;
    z-index: 2;
    background-color: var(--white);
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
}

.delete-modal-message {
    display: block;
    font-size: 1rem;
    text-align: center;
}

.button-container {

    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.button-cancel {
    width: 8rem;
    padding: auto;
    height: 2.5rem;
    background-color: var(--button-cancel);
    border: none;
    border-radius: 1rem;
}

.button-delete {
    width: 8rem;
    padding: auto;
    height: 2.5rem;

    background-color: var(--button-delete);
    border: none;
    border-radius: 1rem;
    color: var(--white);
}


@media (min-width: 780px) {
    .drink-card {
        max-width: 46vw;
    }

    .delete-modal-box {
        left: 23%;
        width: 54%;
    }

}

@media (min-width: 1190px) {
    .drink-card {
        width: 35.1rem;
    }

    .delete-modal-box {
        left: 35%;
        width: 30%;
        max-width: 35rrem;
    }

}
</style>