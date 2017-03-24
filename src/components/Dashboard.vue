<template>
	<section class="section">
		
		<profile-modal></profile-modal>
		
		<group-modal
		v-if="$store.state.show_group_modal"
		></group-modal>
		
		<invite-modal
		v-if="$store.state.show_invite_modal"
		></invite-modal>
		
		<div class="container">
			<button class="create-btn button is-primary"
			@click="$store.state.show_group_modal = true">
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
	import ProfileModal from './ProfileModal.vue';
	import InviteModal from './InviteModal.vue';
	import GroupModal from './GroupModal.vue';
	import GMap from './GMap.vue';

	export default {
		data() {
			return {
				
			}
		},
		methods: {
			setupUserStatusTracker() {
				const db = firebase.database().ref(`/users/${this.$store.state.uid}`);
				db.update({is_online: true});

				db.onDisconnect().update({is_online: false});

			},
			checkProfileStatus() {
      	const db = firebase.database().ref(`/users/${this.$store.state.uid}`);

      	db.once('value')
      	.then(user => {
      		console.log(user.val(), ' user');
      		if ( !user.val().profile_completed ) {
      			this.$store.state.show_modal = true;
      			console.log('blah');
      		}
      	});
			}
		},
		components: {
			ProfileModal,
			gmap: GMap,
			GroupModal,
			InviteModal
		},
		created() {			
			this.$router.app.$on('uid-set', () => {
				this.setupUserStatusTracker();
				this.checkProfileStatus();
			});
		}	
	}
</script>

<style lang="scss">
	
</style>