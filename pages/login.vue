<template>
	<div class="login-page-container">
		<div class="login-content">
			<NuxtLink class="back-button" to="/">
				<IconsLeftArrow :size="14" :color="$getThemeColors().iconsColor" />
				<span> {{ $t("loginPage.back.label") }}</span>
			</NuxtLink>
			<img
				:src="$getTheme() === THEME_MODES.light ? '/light-logo.png' : '/dark-logo.png'"
				height="120"
				alt="logo"
			/>
			<div class="input-item">
				<label class="input-label" for="emailInput">{{ $t("loginPage.email.label") }}</label>
				<input
					v-model="loginFormState.form.email"
					@blur="validateForm"
					:class="{ 'text-input': true, 'has-error': checkFieldError(loginFormState.errors, 'email') }"
					type="email"
					id="emailInput"
				/>
				<span v-show="checkFieldError(loginFormState.errors, 'email')" class="error-message">
					{{ $t("loginPage.email.errorMessage") }}
				</span>
			</div>
			<div class="input-item">
				<label class="input-label" for="passwordInput">{{ $t("loginPage.password.label") }}</label>
				<input
					v-model="loginFormState.form.password"
					@blur="validateForm"
					:class="{ 'text-input': true, 'has-error': checkFieldError(loginFormState.errors, 'password') }"
					type="password"
					id="passwordInput"
					name="password"
				/>
				<span v-show="checkFieldError(loginFormState.errors, 'password')" class="error-message">
					{{ $t("loginPage.password.errorMessage") }}
				</span>
			</div>
			<button @click="handleLogin" class="button-submit">{{ $t("loginPage.loginButton.label") }}</button>
		</div>
	</div>
</template>
<script setup lang="ts">
import { AxiosError } from "axios";
import { THEME_MODES } from "@/types/theme";

const { $login, $toast, $router, $getTheme } = useNuxtApp();
const { getLoginFormState, checkFieldError, validateForm } = useLoginForm();

const loginFormState = getLoginFormState();

definePageMeta({
	middleware: "guest",
});

onMounted(() => {});

const handleLogin = async () => {
	loginFormState.value.displayErrors = true;
	validateForm();

	if (loginFormState.value.errors.length !== 0) {
		return;
	}
	const requestBody = loginFormState.value.form;
	try {
		$login(requestBody);
	} catch (error) {
		const axiosError = error as AxiosError;
		if (axiosError.response?.status === 400) {
			const errorMessage = (
				axiosError.response.data as {
					status: string;
					message: string;
				}
			).message;
			$toast.error(errorMessage);
		}
		return;
	}

	$toast.success("SUCCESS");
	setTimeout(() => $router.back(), 750);
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
	color: var(--error);
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
	display: flex;
	align-items: center;
	gap: 0.5rem;
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
