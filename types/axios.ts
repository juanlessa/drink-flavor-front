import { AxiosRequestConfig, AxiosResponseHeaders, InternalAxiosRequestConfig, RawAxiosResponseHeaders } from "axios";

export enum DFAxiosErrorTypes {
	ERR_MISSING_TOKEN = "Token is missing",
}

export type DFAxiosError<T = unknown, D = any> = Error & {
	code?: string;
	config?: AxiosRequestConfig<D>;
	request?: any;
	response?: DFAxiosResponse<D>;
};

export type DFAxiosResponse<D = any> = {
	data: {
		status: string;
		message: string;
	};
	status: number;
	statusText: string;
	headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
	config: InternalAxiosRequestConfig<D>;
	request?: any;
};
