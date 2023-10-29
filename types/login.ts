import { IAuthenticateUser } from "@/types/authentication";
import { FieldError } from "@/types/forms";

export type LoginFormState = {
	form: IAuthenticateUser;
	errors: FieldError[];
	displayErrors: boolean;
};
