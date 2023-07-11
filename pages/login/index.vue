<template>
	<div class="login-page-container">
		<div class="login-content">
			<NuxtLink class="back-button" to="/">
				<span><img src="/left-arrow.svg" width="16" alt="" /></span>
				back
			</NuxtLink>
			<img :src="$getTheme() === 'light' ? '/light-logo.png' : '/dark-logo.png'" height="120" alt="logo" />
			<div class="input-item">
				<label class="input-label" for="emailInput">email</label>
				<input
					v-model="emailInputValue"
					@blur="handleEmailValidate(($event.target as HTMLInputElement).value)"
					:class="{ 'text-input': true, 'has-error': isEmailInvalid }"
					type="email"
					id="emailInput"
				/>
				<span v-show="isEmailInvalid" class="error-message">email incorrect</span>
			</div>
			<div class="input-item">
				<label class="input-label" for="passwordInput">password</label>
				<input
					v-model="passwordInputValue"
					@blur="handlePasswordValidate(($event.target as HTMLInputElement).value)"
					:class="{ 'text-input': true, 'has-error': isPasswordInvalid }"
					type="password"
					id="passwordInput"
					name="password"
				/>
				<span v-show="isPasswordInvalid" class="error-message">password incorrect</span>
			</div>
			<button @click="handleLogin" class="button-submit">login</button>
		</div>
	</div>
</template>
<script setup lang="ts">
import { AxiosError } from "axios";
import { IAuthenticateResponse, ITokens } from "~/utils/dtos/Tokens";
import toastConfig from "@/utils/toastConfig";
const { $axios: axios, $login, $toast, $router } = useNuxtApp();

const emailInputValue = ref<string>("");
const passwordInputValue = ref<string>("");
const isEmailInvalid = ref<boolean>(false);
const isPasswordInvalid = ref<boolean>(false);

definePageMeta({
	middleware: "guest",
});

onMounted(() => {});

const handleLogin = async () => {
	handleEmailValidate(emailInputValue.value);
	handlePasswordValidate(passwordInputValue.value);

	if (isEmailInvalid.value || isPasswordInvalid.value) {
		return;
	}

	const requestBody = {
		email: emailInputValue.value,
		password: passwordInputValue.value,
	};

	try {
		const response = await axios.post<IAuthenticateResponse>("/sessions", requestBody, {
			headers: { NoAuth: true },
		});

		$login(response.data);

		$toast.success("SUCCESS", toastConfig);
		setTimeout(() => $router.back(), 750);
	} catch (error) {
		const axiosError = error as AxiosError;
		if (axiosError.response?.status === 400) {
			const errorMessage = (
				axiosError.response.data as {
					status: string;
					message: string;
				}
			).message;
			$toast.error(errorMessage, toastConfig);
		}
	}
};

const handleEmailValidate = (emailValue: string) => {
	const emailRegex = /\S+@\S+\.\S+/;
	const isValid = emailRegex.test(emailValue);
	return (isEmailInvalid.value = !isValid);
};
const handlePasswordValidate = (passwordValue: string) => {
	const isValid = passwordValue.length >= 8;
	return (isPasswordInvalid.value = !isValid);
};
</script>
<style scoped>
.login-page-container {
	width: 100vw;
	height: 100vh;
	background-color: var(--primary-background);
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
	background-color: var(--secondary-background);
	border: 0.5px solid var(--secondary-background);
	border-radius: 0.5rem;
	padding: 0.5rem;
	width: 100%;
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
	background-color: var(--primary-color);
	border: none;
	border-radius: 1rem;
	color: var(--secondary-text);
}

@media (min-width: 780px) {
	.login-page-container {
		background-color: var(--secondary-background);
	}

	.login-content {
		max-width: 25rem;
		margin: 15vh auto 0 auto;
		background-color: var(--primary-background);
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
