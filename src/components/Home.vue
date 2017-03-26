<template>
	<section class="hero is-medium is-primary">
		<div class="hero-body has-text-centered">
			<div class="container ">
				<h1 class="title is-2">Find Your Study Group Now!</h1>
				<button class="signin-btn button is-medium is-primary is-inverted is-outlined"
				@click="signIn">Sign In With Google</button>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
	    signIn() {
	      this.$router.app.$emit('signIn');
	    }
	  }
	}
</script>

<style lang="scss">
	.signin-btn {
    width: 230px;
  }
</style>