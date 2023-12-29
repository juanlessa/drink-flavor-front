<template>
	<SelectRoot v-model="$i18n.locale">
		<SelectTrigger
			class="inline-flex items-center justify-between rounded pl-[0.5rem] text-base leading-none h-[1.5rem] gap-[0.25rem] text-grass11 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green9 outline-none"
		>
			<SelectValue />
			<IconsBottomArrow :size="22" :color="$getThemeColors().iconsColor" />
		</SelectTrigger>

		<SelectPortal>
			<SelectContent
				class="min-w-[4.5rem] bg-light-primary dark:bg-dark-primary rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[10]"
				position="popper"
				:sideOffset="-25"
				align="end"
			>
				<SelectViewport class="p-[0.25rem]">
					<SelectGroup>
						<SelectItem
							v-for="(option, index) in languages"
							:key="index"
							class="leading-none text-grass11 rounded-md flex items-center h-[1.5rem] pl-[1.5rem] pr-[0.5rem] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-secondary data-[highlighted]:text-green1"
							:value="option"
						>
							<SelectItemIndicator
								class="absolute left-0 w-[25px] inline-flex items-center justify-center"
							>
								<IconsChecked :size="10" :color="$getThemeColors().iconsColor" />
							</SelectItemIndicator>
							<SelectItemText>
								{{ option.toLocaleUpperCase() }}
							</SelectItemText>
						</SelectItem>
					</SelectGroup>
				</SelectViewport>
			</SelectContent>
		</SelectPortal>
	</SelectRoot>
</template>
<script setup lang="ts">
import {
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectItemIndicator,
	SelectItemText,
	SelectPortal,
	SelectRoot,
	SelectTrigger,
	SelectValue,
	SelectViewport,
} from "radix-vue";

import { useI18n } from "vue-i18n";
import { LANGUAGES } from "@/types/translations";
import { LOCAL_STORAGE_KEYS } from "@/types/localStorage";

const { locale } = useI18n();
const { setLocalStorageItem } = useLocalStorage();

const languages = Object.values(LANGUAGES);

watch(locale, (newLocale) => {
	setLocalStorageItem(LOCAL_STORAGE_KEYS.locale, newLocale);
});
</script>
