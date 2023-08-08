<template>
	<footer class="footer-container">
		<NuxtLink class="owner-link" to="https://www.linkedin.com/in/juanlessa/?originalSubdomain=pt">
			© Juan Lessa
		</NuxtLink>
	</footer>
</template>
<style scoped>
.footer-container {
	width: 100vw;
	height: 40px;
	margin: 1rem auto 0 auto;
	display: flex;
	font-size: 1rem;
	padding: 0.5rem 1.5rem;
}

@media (min-width: 1190px) {
	.footer-container {
		max-width: 1190px;
	}
}
</style>
