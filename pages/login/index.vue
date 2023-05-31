<template>
    <div class="login-page-container">
        <div class="login-content">
            <NuxtLink class="back-button" to="/">
                <span><img src="/left-arrow.svg" width="16" alt=""></span>
                back
            </NuxtLink>
            <img src="/logo.svg" height="120" alt="logo" />
            <div class="input-item">
                <label class="input-label" for="email">email</label>
                <input v-model="email" @blur="handleEmailValidate(($event.target as HTMLInputElement).value)"
                    :class="{ 'text-input': true, 'has-error': isEmailInvalid }" type="email" id="email" name="email" />
                <span v-show="isEmailInvalid" class="error-message">email incorrect</span>
            </div>
            <div class="input-item">
                <label class="input-label" for="password">password</label>
                <input v-model="password" @blur="handlePasswordValidate(($event.target as HTMLInputElement).value)"
                    :class="{ 'text-input': true, 'has-error': isPasswordInvalid }" type="password" id="password"
                    name="password" />
                <span v-show="isPasswordInvalid" class="error-message">password incorrect</span>
            </div>
            <button @click="handleLogin" class="button-submit">login</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { AxiosError } from 'axios';
import { IAuthenticateResponse, ITokens } from "@/utils/dtos/TokensDTO";
import toastConfig from '@/utils/toastConfig'
const { $axios: axios, $storeTokens, $toast, $router } = useNuxtApp()

const email = ref<string>("")
const password = ref<string>("")
const isEmailInvalid = ref<boolean>(false)
const isPasswordInvalid = ref<boolean>(false)

definePageMeta({
    middleware: "auth",
});
onMounted(() => { });


const handleLogin = async () => {
    handleEmailValidate(email.value)
    handlePasswordValidate(password.value)

    if (isEmailInvalid.value || isPasswordInvalid.value) {
        return;
    }

    const requestBody = {
        email: email.value,
        password: password.value,
    }

    try {
        const response = await axios.post<IAuthenticateResponse>("/sessions", requestBody);
        const { token, refresh_token } = response.data;

        const tokens: ITokens = {
            token: {
                token: token.token,
                expires: new Date(token.expires),
            },
            refresh_token: {
                token: refresh_token.token,
                expires: new Date(refresh_token.expires),
            },
        };

        $storeTokens(tokens);
        $toast.success("SUCCESS", toastConfig);
        setTimeout(() => ($router.back()), 750);

    } catch (error) {
        const axiosError = error as AxiosError
        if (axiosError.response?.status === 400) {
            const errorMessage = (axiosError.response.data as { status: string, message: string }).message
            $toast.error(errorMessage, toastConfig);
        }
    }
};


const handleEmailValidate = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const isValid = emailRegex.test(email)
    return isEmailInvalid.value = !isValid
}
const handlePasswordValidate = (password: string) => {
    const isValid = password.length >= 8
    return isPasswordInvalid.value = !isValid
}

</script>
<style scoped>
.login-page-container {
    width: 100vw;
    height: 100vh;
    background-color: var(--white);
    padding: 2rem;
    position: relative;
}

.login-content {
    margin: 10vh auto 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

}

.input-item {
    width: 100%;
    display: flex;
    flex-direction: column;

}

.input-label {
    display: block;
    margin-bottom: 0.5rem;
    margin-left: 0.5rem;
    font-size: 1rem;
}

.text-input {
    font-size: 1rem;
    background-color: var(--light-50);
    border: 0.5px solid var(--light-50);
    border-radius: 0.5rem;
    padding: 0.5rem;
    width: 100%;
}

.has-error {
    border: 0.1rem solid var(--error-color) !important;
}

.error-message {
    color: var(--error-color);
    margin-top: 0.25rem;
    font-size: 0.9rem;
    margin-left: 0.5rem;

}

.back-button {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    margin-left: 1.5rem;
}

.button-submit {
    margin-top: 1rem;
    width: 100%;
    max-width: 12rem;
    padding: auto;
    height: 2.5rem;
    background-color: var(--button-submit);
    border: none;
    border-radius: 1rem;
    color: var(--white);
}


@media (min-width: 780px) {
    .login-page-container {
        background-color: var(--light-50);
    }

    .login-content {
        max-width: 25rem;
        margin: 15vh auto 0 auto;
        background-color: var(--white);
        padding: 3rem 2rem;
        border-radius: 1rem;
        box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.25);


        position: relative;
    }

    .back-button {
        margin-top: 1rem;
        margin-left: 1.5rem;
    }
}
</style>
