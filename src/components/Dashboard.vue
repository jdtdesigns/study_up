<template>
	<section class="section">
		
		<profile-modal></profile-modal>
		
		<group-modal
			v-if="$store.state.show_group_modal"
			></group-modal>
		
		<invite-modal
			v-if="$store.state.show_invite_modal"
			:invite_data="invite_data"></invite-modal>
		
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
		<gmap @invite="inviteUser"></gmap>
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
				invite_data: {
					id: '',
					name: '',
					groups: []
				}
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
      		this.$store.state.name = user.val().name
      		if ( !user.val().profile_completed ) {
      			this.$store.state.show_modal = true;
      		}
      	});
			},
			inviteUser(info) {
				const groups = firebase.database().ref('/groups');

        groups.orderByChild('leader').equalTo(this.$store.state.uid)
        .once('value')
        .then(data => {
        	this.invite_data.id = info.id;
        	this.invite_data.name = info.name;
          this.invite_data.groups = data.val();

          this.$store.state.show_invite_modal = true;
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
	.logo {
	  font-size: 1.3em;
	}
	.nav-left {
	  padding-left: 4%;
	}

	.nav-right {
	  padding-right: 4%;
	}

	.nav > .container {
	  @media (min-width: 769px) {
	    width: 100%;
	  }
	}

	.hero {
	  margin-top: 45px;
	}

	.form {
	  margin: 0 auto;
	  text-align: center;
	  .signin-btn {
	    width: 230px;
	  }
	}
	button.create-btn {
	  margin-bottom: 15px;
	  .fa {
	    margin-right: 4px;
	  }
	  span:last-child {
	    padding-bottom: 2px;
	  }
	}
</style>