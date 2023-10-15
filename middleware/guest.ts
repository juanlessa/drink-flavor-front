export default defineNuxtRouteMiddleware(async (to) => {
	if (process.server) {
		return;
	}

	const { $checkTokens, $authenticate, $getAuthState } = useNuxtApp();

	const authState = $getAuthState();
	const userHasToken = $checkTokens();

	if (userHasToken && !authState.value.authenticated) {
		await $authenticate();
	}

	if (authState.value.authenticated && to.path === "/login") {
		return navigateTo("/");
	}
});
