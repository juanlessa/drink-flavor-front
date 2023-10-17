import { defineNuxtPlugin } from "#app";
import * as vt from "vue-toastification";
import "vue-toastification/dist/index.css";

const toastConfig = {
	timeout: 2508,
	closeOnClick: true,
	pauseOnFocusLoss: true,
	pauseOnHover: true,
	draggable: true,
	draggablePercent: 0.6,
	showCloseButtonOnHover: false,
	hideProgressBar: true,
	closeButton: "button",
	icon: true,
	rtl: false,
} as vt.PluginOptions;

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(vt.default);
	const toast = vt.useToast();
	toast.updateDefaults(toastConfig);

	return {
		provide: {
			toast: toast,
		},
	};
});
