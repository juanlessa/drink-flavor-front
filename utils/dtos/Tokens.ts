interface IAuthenticateResponse {
    "user": {
		"name": string,
		"email": string,
	},
    token: {
        token: string,
        expires: string,
    },
    refresh_token: {
        token: string,
        expires: string,
    }
}

interface ITokens{
    token: {
        token: string,
        expires: Date,
    },
    refresh_token: {
        token: string,
        expires: Date,
    }
}

interface IRefreshTokenResponse {
        "token": string,
        "expires": string 
}

export {IAuthenticateResponse, ITokens, IRefreshTokenResponse }