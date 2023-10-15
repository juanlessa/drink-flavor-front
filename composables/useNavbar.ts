import { useI18n } from "vue-i18n";
import { NavState } from "@/types/navbar";
import { ROUTES } from "@/types/appRoutes";

const initState = (): NavState => ({ links: [] });

export const useNavbar = () => {
	const { t } = useI18n();
	const { $getAuthState } = useNuxtApp();
	const authState = $getAuthState();

	const navbarState = useState<NavState>("navbar", initState);

	const getNavbarState = () => navbarState;

	const loadRoutes = () => {
		if (authState.value.authenticated) {
			navbarState.value.links = [
				{ i18nKey: "navbar.categories", path: ROUTES.categories },
				{ i18nKey: "navbar.ingredients", path: ROUTES.ingredients },
				{ i18nKey: "navbar.drinks", path: ROUTES.drinks },
			];
		} else {
			navbarState.value.links = [{ i18nKey: "navbar.login", path: ROUTES.login }];
		}
	};

	watch(
		() => authState.value.authenticated,
		() => loadRoutes()
	);

	return {
		getNavbarState,
		loadRoutes,
	};
};
