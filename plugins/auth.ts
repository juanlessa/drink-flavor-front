import  { IAuthenticateResponse, ITokens, IRefreshTokenResponse } from '@/utils/dtos/TokensDTO'

export type AuthState = {
	user: {
		email: string;
	};
	forceUpdate: boolean;
	authenticated: boolean;
};

const initState = (): AuthState => ({
	user: {
		email: '',
	},
	forceUpdate: false,
	authenticated: false
});

export default defineNuxtPlugin(() => {

    const state = useState<AuthState>('auth', initState);

    const getAuthState = () => state.value;


    const storeTokens = ({token, refresh_token}: ITokens) => {
        // store refresh token
        const refreshTokenCookie = useCookie(
            "refresh_token", 
            {
                expires: refresh_token.expires,
                maxAge: (refresh_token.expires.getTime() - new Date().getDate())/1000
            }
        )
        refreshTokenCookie.value = refresh_token.token
        
        // store token
        const tokenCookie = useCookie(
            "token", 
            {
                expires: token.expires,
                maxAge: (token.expires.getTime() - new Date().getTime())/1000
            }
        )
        tokenCookie.value = token.token        
    }

    const signOut = () =>{
        const refreshTokenCookie = useCookie("refresh_token")
        refreshTokenCookie.value = null

        const tokenCookie = useCookie("refresh_token")
        tokenCookie.value = null
    }  

    const refreshToken = async()=>{
        const refreshTokenCookie = useCookie("refresh_token")
        if(!refreshTokenCookie.value){
            return;
        }
        const { $axios: axios } = useNuxtApp()
        try {
            const { data } = await axios.post<IRefreshTokenResponse>(
                '/refresh-token',
                { "token": refreshTokenCookie.value }, 
                { 
                    headers: { NoAuth: true }
                }
            )
            const token = data.token
            const expires = new Date(data.expires)
            const tokenCookie = useCookie(
                "token", 
                {
                    expires: expires,
                    maxAge: (expires.getTime() - new Date().getTime())/1000
                }
            )
            tokenCookie.value = token
 
            return token
            
        } catch(error){
            console.error('refresh token request error');
            console.error(error)
            return
        }
    }

    return {
        provide: {
            getAuthState,
            storeTokens,
            signOut,
            refreshToken
        },
      };
})