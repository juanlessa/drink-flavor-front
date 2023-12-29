<template>
	<div
		class="w-[100vw] h-[100vh] p-8 relative bg-light-primary dark:bg-dark-primary tablet:bg-light-secondary tablet:dark:bg-dark-secondary"
	>
		<div class="login-content">
			<NuxtLink
				class="absolute top-0 left-0 text-base mt-6 ml-6 flex items-center gap-2 tablet:mt-4 tablet:ml-6"
				to="/"
			>
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
			<button
				class="mt-4 w-full max-w-[12rem] h-10 border-none rounded-2xl bg-light-theme dark:bg-dark-theme text-txt-light dark:text-txt-dark"
				@click="handleLogin"
			>
				{{ $t("loginPage.loginButton.label") }}
			</button>
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
.login-content {
	@apply mt-[10vh] mx-auto w-full flex flex-col items-center gap-4;
	@apply tablet:relative tablet:max-w-[25rem] tablet:mt-[15rem] tablet:py-12 tablet:px-8 tablet:rounded-2xl tablet:bg-light-primary tablet:dark:bg-dark-primary tablet:shadow-light-card tablet:dark:shadow-dark-card;
}
.input-item {
	@apply w-full flex flex-col;
}

.input-label {
	@apply block mb-2 ml-2 text-base;
}

.text-input {
	@apply w-full p-2 text-base rounded-lg border-solid border-[1px] border-light-secondary dark:border-dark-secondary;
}

.error-message {
	@apply mt-[0.125rem] ml-2 text-[0.9rem] text-light-error dark:text-dark-error;
}
</style>
