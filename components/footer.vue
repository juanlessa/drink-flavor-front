<template>
	<footer class="footer-container">
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
.footer-container {
	width: 100vw;
	height: 40px;
	margin: 0 auto 0 auto;
	display: flex;
	gap: 1.5rem;
	font-size: 1rem;
	padding: 0.5rem 1.5rem;
}

.footer-item {
	display: flex;
	align-items: center;
	gap: 0.25rem;
}

@media (min-width: 1190px) {
	.footer-container {
		max-width: 1190px;
	}
}
</style>
