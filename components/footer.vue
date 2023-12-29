<template>
	<footer class="w-[100vw] h-10 my-0 mx-auto py-2 px-6 flex gap-6 text-base max-w-screen-desktop">
		<NuxtLink class="footer-item" to="https://www.linkedin.com/in/juanlessa">
			<IconsCopyright :size="16" :color="$getThemeColors().iconsColor" />
			<span>{{ $t("footer.author") }}</span></NuxtLink
		>

		<NuxtLink class="footer-item" to="https://github.com/juanlessa/drunk-flavor-front">
			<IconsGithub :size="16" :color="$getThemeColors().iconsColor" />
			<span>{{ $t("footer.githubProject") }}</span>
		</NuxtLink>
	</footer>
</template>
<script setup lang="ts"></script>
<style scoped>
.footer-item {
	@apply flex items-center gap-1;
}
</style>
