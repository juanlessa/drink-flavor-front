<template>
	<footer class="footer-container">
		<div class="footer-content">
			<p>
				Project made by
				<NuxtLink class="owner-link" to="https://www.linkedin.com/in/juanlessa/?originalSubdomain=pt"
					>Juan Lessa
				</NuxtLink>
			</p>
		</div>
	</footer>
</template>
<style scoped>
.footer-container {
	height: 5vh;
	max-height: 5rem;
	width: 100vw;
}

.footer-content {
	width: 95%;
	margin: 0 auto;

	display: flex;
	font-size: 1rem;
}

@media (min-width: 1190px) {
	.footer-content {
		width: 1190px;
	}
}
</style>
