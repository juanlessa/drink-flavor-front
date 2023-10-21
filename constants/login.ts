import { IAuthenticateUser } from "@/types/user";

export const initEmptyLoginForm = (): IAuthenticateUser => ({
	email: "",
	password: "",
});
