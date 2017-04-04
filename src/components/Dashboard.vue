<template>
	<section class="section">
		
		<profile-modal></profile-modal>
		
		<group-modal
			v-if="$store.state.show_group_modal"
			></group-modal>

		<member-list 
			v-if="$store.state.show_member_list"
			:group="group"></member-list>
		
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
					<router-link
						to="/dashboard"
						tag="li"
						active-class="is-active" exact><a>Map View</a></router-link>
					<router-link 
						to="/dashboard/groups"
						tag="li"
						:class="{'is-active': $route.name == 'groups'}"><a>All Groups</a></router-link>
					<router-link 
						:to="userLink"
						tag="li"
						:class="{'is-active': $route.name == 'user-groups'}"><a>My Groups</a></router-link>
					<router-link
						to="/dashboard/invites"
						tag="li"
						active-class="is-active"><a>Invites</a></router-link>
				</ul>
			</div>

			<router-view 
				@invite="inviteUser"
				@showMemberList="showMemberList"></router-view>
		</div>
	</section>
</template>

<script>
	import ProfileModal from './ProfileModal.vue';
	import InviteModal from './InviteModal.vue';
	import GroupModal from './GroupModal.vue';
	import MemberList from './MemberList.vue';

	export default {
		data() {
			return {
				invite_data: {
					id: '',
					name: '',
					groups: []
				},
				group: {}
			}
		},
		computed: {
			userLink() {
				return {
					name: 'user-groups',
					query: { user: this.$store.state.uid },
					has_invites: false
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

        groups.orderByChild('created_by').equalTo(this.$store.state.uid)
        .once('value')
        .then(data => {
        	info.button.classList.remove('is-loading');

        	this.invite_data.id = info.id;
        	this.invite_data.name = info.name;
          this.invite_data.auth_groups = data.val();

          this.$store.state.show_invite_modal = true;
        });
			},

			showMemberList(group) {
				this.group = group;
				this.$store.state.show_member_list = true;
			},

		},
		components: {
			ProfileModal,
			GroupModal,
			InviteModal,
			MemberList
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