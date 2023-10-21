import { LOCAL_STORAGE_KEYS } from "@/types/localStorage";

export const useLocalStorage = () => {
	const getLocalStorageItem = (key: LOCAL_STORAGE_KEYS) => localStorage.getItem(key);
	const setLocalStorageItem = (key: LOCAL_STORAGE_KEYS, value: string) => localStorage.setItem(key, value);
	const removeLocalStorageItem = (key: LOCAL_STORAGE_KEYS) => localStorage.removeItem(key);

	return {
		getLocalStorageItem,
		setLocalStorageItem,
		removeLocalStorageItem,
	};
};
