export type IAuthenticateUser = {
	email: string;
	password: string;
};

export type IAuthenticateResponse = {
	user: {
		name: string;
		email: string;
	};
	token: {
		token: string;
		expires: string;
	};
	refresh_token: {
		token: string;
		expires: string;
	};
};
export type ITokens = {
	token: {
		token: string;
		expires: Date;
	};
	refresh_token: {
		token: string;
		expires: Date;
	};
};

export type IRefreshTokenResponse = {
	token: string;
	expires: string;
};
