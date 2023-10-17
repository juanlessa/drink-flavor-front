import axios, {
	AxiosRequestHeaders,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
	AxiosError,
} from "axios";
import { DFAxiosError, DFAxiosErrorTypes } from "@/types/axios";

declare module "#app" {
	interface NuxtApp {
		$axios: AxiosInstance;
	}
}

export default defineNuxtPlugin(() => {
	const { apiBase } = useRuntimeConfig().public;

	const api = axios.create({
		baseURL: apiBase,
	});

	const requestInterceptor = async (value: InternalAxiosRequestConfig<any>) => {
		if (value.headers?.NoAuth) {
			return value;
		}

		const tokenCookie = useCookie("token");
		if (!tokenCookie.value) {
			return value;
		}
		value.headers = {
			...value.headers,
			Authorization: `Bearer ${tokenCookie.value}`,
		} as AxiosRequestHeaders;

		return value;
	};

	const responseHandler = (response: AxiosResponse<string, unknown>) => {
		return response;
	};

	const errorHandler = async (error: any) => {
		if (!(error instanceof AxiosError)) {
			return Promise.reject(error);
		}
		const axiosError = error as DFAxiosError;

		if (
			axiosError.response &&
			axiosError.response.status === 401 &&
			axiosError.response.data.message === DFAxiosErrorTypes.ERR_MISSING_TOKEN
		) {
			const originalRequest = axiosError.config as InternalAxiosRequestConfig;

			try {
				const newAccessToken = await useNuxtApp().$refreshToken();
				if (!newAccessToken) {
					return Promise.reject(error);
				}

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return axios(originalRequest);
			} catch (e) {
				return Promise.reject(error);
			}
		}

		return Promise.reject(error);
	};

	api.interceptors.request.use((request) => requestInterceptor(request));
	api.interceptors.response.use(
		(response) => responseHandler(response),
		(error) => errorHandler(error)
	);

	return {
		provide: {
			axios: api,
		},
	};
});
