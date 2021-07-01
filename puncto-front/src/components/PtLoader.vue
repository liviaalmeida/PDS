<template>
	<div class="pt-loader">
		<PtIcon name="watch"
		class="pt-loader-icon" />
	</div>
</template>

<style lang="scss">
.pt-loader {
	background-color: rgba($pt-coal, .7);
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100vw;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999;

	&-icon {
		animation: grow .5s ease-out 0s infinite alternate;
		height: 130px;
		width: 130px;

		path {
			fill: $pt-sapphire;
		}
	}
}

@keyframes grow {
	0% { transform: scale(0); }
	80% { transform: scale(1); }
	90% { transform: scale(1.2, 0.8); }
	100% { transform: scale(0.9, 1.1); }
}
</style>
