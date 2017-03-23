<template>
	<section class="section">
		
		<modal></modal>
		
		<group-modal
		v-if="show_group_modal"
		></group-modal>
		
		<invite-modal
		v-if="show_invite_modal"
		></invite-modal>
		
		<div class="container">
			<button class="create-btn button is-primary"
			@click="show_group_modal = true">
			<span class="icon">
				<i class="fa fa-users"></i>
			</span>
			<span>Create Group</span>
		</button>
		<div class="tabs">
			<ul>
				<li class="is-active"><a>Map View</a></li>
				<li><a>My Groups</a></li>
			</ul>
		</div>
		<gmap></gmap>
	</div>
</section>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		}	
	}
</script>

<style lang="scss">
	
</style>