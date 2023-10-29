import { FieldError } from "@/types/forms";
import { useI18n } from "vue-i18n";
import { initEmptyLoginForm } from "@/constants/login";
import { LoginFormState } from "@/types/login";
import { authenticateUserValidator } from "@/validations/user";

const initState = (): LoginFormState => ({
	form: initEmptyLoginForm(),
	errors: [],
	displayErrors: false,
});

export const useLoginForm = () => {
	const { t } = useI18n();

	const loginFormState = useState<LoginFormState>("loginForm", initState);

	const getLoginFormState = () => loginFormState;

	const resetLoginFormState = () => {
		loginFormState.value = initState();
	};

	const checkFieldError = (errors: Array<FieldError>, field: string): string => {
		const error = errors.find((err) => err.field === field);
		return error === undefined ? "" : t(error.message);
	};

	const validateForm = () => {
		if (!loginFormState.value.displayErrors) {
			return;
		}
		const data = loginFormState.value.form;
		const errors = authenticateUserValidator(data);

		loginFormState.value.errors = errors;
	};

	return {
		getLoginFormState,
		resetLoginFormState,
		validateForm,
		checkFieldError,
	};
};
