<template>
	<nav class="nav has-shadow">
		<div class="container">
			<div class="nav-left">
				
				<router-link to="/">
					<h2 class="title is-5 nav-item">Study Up</h2>
				</router-link>
				<a class="nav-item is-tab is-hidden-mobile is-active"
				v-if="$store.signed_in">Dashboard</a>
			</div>
			
			<span class="nav-toggle"
				@click="$store.show_nav = !$store.show_nav">
			<span></span>
			<span></span>
			<span></span>
		</span>
		
		
		<div class="nav-right nav-menu"
		:class="{'is-active': $store.show_nav}">
		
		<a href="#" class="nav-item is-tab"
		v-if="!$store.signed_in"
		@click.prevent="signIn">Sign In With Google</a>
		
		<router-link 
		to="/dashboard" 
		class="nav-item is-tab is-hidden-tablet"
		v-if="$store.signed_in">Dashboard</router-link>
		
		<a href="#" class="nav-item is-tab"
		v-if="!$store.show_modal"
		@click.prevent="updateProfile">Profile</a>
		
		<a href="#" class="nav-item is-tab"
		v-if="$store.signed_in"
		@click.prevent="logoutUser">Log out</a>
		
	</div>
</div>
</nav>  
</template>

<script>
	export default {
		data() {
	    return {
	    	
	    }
	  },
	  methods: {
	    signIn() {
	      this.$emit('signin');
	    },
	    logoutUser() {
	      this.$emit('logout');
	    },
	    updateProfile() {
	      this.$router.app.$emit('update-profile');
	    }
	  }	
	}
</script>

<style lang="scss">
	
</style>