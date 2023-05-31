import axios, { AxiosRequestHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse,InternalAxiosRequestConfig } from 'axios';


export default defineNuxtPlugin(() => {
    const baseURL = "http://localhost:3333" 
    
    const api = axios.create({
		baseURL: baseURL
	});


    const requestInterceptor = async(value: InternalAxiosRequestConfig<any>) => {
		if (value.headers?.NoAuth) {
            return value;
        }

        const tokenCookie = useCookie("token")
        if (!tokenCookie.value) {
            return value
        }
        value.headers = {
			...value.headers,
			Authorization: `Bearer ${tokenCookie.value}`
		} as AxiosRequestHeaders
        
        return value
    }


    const responseHandler = (response: AxiosResponse<string, unknown>) => {
        return response;
    };


    const errorHandler = async(error: any) => {
        const originalRequest = error.config;
        if ([401, 403].includes(error.response.status) && !originalRequest._retry) {
            originalRequest._retry = true;
            try{
                const token = await useNuxtApp().$refreshToken();
                if(!token){
                    return Promise.reject(error);
                }

                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
                
            }catch(e){
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
            axios: api
        },
      };
})