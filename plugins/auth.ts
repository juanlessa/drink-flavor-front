import { IAuthenticateResponse, ITokens, IRefreshTokenResponse } from "~/utils/dtos/Tokens";
import { IUser } from "~/utils/dtos/Users";

export type AuthState = {
	user: {
		email: string;
		name: string;
	};
	authenticated: boolean;
};

declare module "#app" {
	interface NuxtApp {
		$getAuthState: () => AuthState;
		$storeTokens: (data: ITokens) => void;
		$checkTokens: () => boolean;
		$login: (data: IAuthenticateResponse) => void;
		$authenticate: () => Promise<boolean>;
		$signOut: (manual?: boolean) => void;
		$refreshToken: () => Promise<string>;
	}
}

const initState = (): AuthState => {
	return {
		user: {
			email: "",
			name: "",
		},
		authenticated: false,
	};
};

export default defineNuxtPlugin(() => {
	const authState = useState<AuthState>("auth", initState);

	const getAuthState = () => authState.value;
	const resetAuthState = () => (authState.value = initState());

	const storeTokens = ({ token, refresh_token }: ITokens) => {
		// store refresh token
		if (refresh_token.token) {
			const refreshTokenCookie = useCookie("refresh_token", {
				expires: refresh_token.expires,
				maxAge: (refresh_token.expires.getTime() - new Date().getDate()) / 1000,
			});
			refreshTokenCookie.value = refresh_token.token;
		}

		// store token
		if (token.token) {
			const tokenCookie = useCookie("token", {
				expires: token.expires,
				maxAge: (token.expires.getTime() - new Date().getTime()) / 1000,
			});
			tokenCookie.value = token.token;
		}
	};

	const checkTokens = () => {
		const tokenCookie = useCookie("token");
		const refreshTokenCookie = useCookie("refresh_token");

		if (!tokenCookie.value && !refreshTokenCookie.value) {
			return false;
		}
		return true;
	};

	const login = (data: IAuthenticateResponse) => {
		const tokens: ITokens = {
			token: {
				token: data.token.token,
				expires: new Date(data.token.expires),
			},
			refresh_token: {
				token: data.refresh_token.token,
				expires: new Date(data.refresh_token.expires),
			},
		};

		storeTokens(tokens);
		authState.value.authenticated = true;
		authState.value.user.email = data.user.email;
		authState.value.user.name = data.user.name;
	};

	const authenticate = async () => {
		try {
			const { $axios: axios } = useNuxtApp();
			const { data } = await axios.get<IUser>("/users/profile");

			authState.value.authenticated = true;
			authState.value.user.email = data.email;
			authState.value.user.name = data.name;

			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	};

	const signOut = (manual = false) => {
		const refreshTokenCookie = useCookie("refresh_token");
		refreshTokenCookie.value = undefined;

		const tokenCookie = useCookie("token");
		tokenCookie.value = undefined;

		resetAuthState();

		if (manual) {
			return navigateTo("/");
		}

		return navigateTo("/login");
	};

	const refreshToken = async () => {
		const refreshTokenCookie = useCookie("refresh_token");
		if (!refreshTokenCookie.value) {
			return "";
		}
		const { $axios: axios } = useNuxtApp();
		try {
			const { data } = await axios.post<IRefreshTokenResponse>(
				"/refresh-token",
				{ token: refreshTokenCookie.value },
				{ headers: { NoAuth: true } }
			);
			const newAccessToken = data.token;
			const newAccessTokenExpires = new Date(data.expires);

			storeTokens({
				refresh_token: { token: "", expires: {} as Date },
				token: { token: newAccessToken, expires: newAccessTokenExpires },
			});

			return newAccessToken;
		} catch (error) {
			console.error("refresh token request error");
			console.error(error);

			signOut();
			return "";
		}
	};

	return {
		provide: {
			getAuthState,
			storeTokens,
			signOut,
			login,
			refreshToken,
			authenticate,
			checkTokens,
		},
	};
});
