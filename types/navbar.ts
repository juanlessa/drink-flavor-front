import { ROUTES } from "./appRoutes";

export type ILink = {
	i18nKey: string;
	path: ROUTES;
};

export type NavState = {
	links: ILink[];
};
