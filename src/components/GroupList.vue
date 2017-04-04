<template>
	<table class="table">
	  <thead>
	    <tr>
	      <th><abbr title="Name">Group Name</abbr></th>
	      <th v-if="!user">Created By</th>
	      <th><abbr title="Stack">Stack</abbr></th>
	      <th><abbr title="Members">Members</abbr></th>
	      <th></th>
	    </tr>
	  </thead>
	  <tbody>
			<tr v-if="!groups.length">
				<td
					colspan="4"
					style="text-align: center; padding: 40px 0"
	    		v-if="!user && $route.name == 'groups'">No Groups Have Been Created</td>
    		<td
    			colspan="4"
    			style="text-align: center; padding: 40px 0"
    			v-if="!user && $route.name == 'invites'">You Haven't Been Invited To Any Groups</td>
				<td
					colspan="4"
					style="text-align: center; padding: 40px 0"
	    		v-if="user">You haven't Created or Joined a Group yet</td>
			</tr>

	    <tr v-for="group in sortedGroups">
	      <td>{{ group.name }}</td>
	      <td v-if="!user">{{ group.created_by }}</td>      
	      <td>{{ group.stack }}</td>
	      <td>
					<span v-if="!group.joined">{{ group.members }}</span>
	      	<button 
	      		class="member-btn button is-small"
	      		v-if="group.joined"
	      		title="Click to show member list"
	      		@click="showMemberList(group)">{{ group.members }}</button>
	      </td>
	      <td>
	      	<button
	      		class="request-btn button is-primary"
	      		:class="{'is-disabled': 
	      			group.created_by == $store.state.name || group.joined}"
	      		v-if="!user"
	      		@click="joinGroup(group)">
	      			{{ group.created_by == $store.state.name ? 'Your Group' 
	      				: group.joined ? 'Joined' 
	      				:  'Join Group'}}
	      		</button>
	      	<button
	      		class="request-btn button is-danger"
	      		v-if="user && group.created_by == $store.state.uid"
	      		@click="deleteGroup(group.name)">Delete Group</button>
	      	<button
	      		class="request-btn button is-warning"
	      		v-if="user && group.created_by != $store.state.uid"
	      		@click="leaveGroup(group.name)">Leave Group</button>
	      </td>
	    </tr>
	  </tbody>
	</table>
</template>

<script>
	export default {
		data() {
			return {
				groups: [],
				user: false
			}
		},
		computed: {
			sortedGroups() {
				return !this.user ? _.sortBy(this.groups, ['leader']) :
				this.groups;
			}
		},
		watch: {
	    '$route': 'getAllGroups'
	  },
		methods: {
			refresh() {
				clearTimeout(window.refreshGroups);
				window.refreshGroups = setTimeout(() => {
					this.getAllGroups();
				}, 500);
			},

			getAllGroups() {

				if ( !this.$store.state.uid ) {
					this.refresh();
					return;
				}

				this.groups = [];
				const groups = firebase.database().ref('/groups'),
							users = firebase.database().ref('/users'),
							user_ref = users.child(this.$store.state.uid);

				if ( this.$route.name == 'user-groups' ) {
					user_ref.once('value')
					.then(user => {
						_.map(user.val().groups, (val, group_name, i) => {
							groups.child(group_name).once('value')
							.then(group => {
								group = group.val();
								group.joined = true;
								this.groups.push(group);
							});
						});
					});
					this.user = true;

				}

				if ( this.$route.name == 'groups' ) {
					groups.on('child_added', group => {
						users.child(group.val().created_by).once('value')
						.then(created_by => {
							if ( created_by ) {
								group = group.val();
								group.created_by = created_by.val().name;

								user_ref.child('/groups').once('value')
								.then(user_groups => {
									group.joined = user_groups.val() ? 
										user_groups.val().hasOwnProperty(group.name.toLowerCase()) : false;
									if ( !_.find(this.groups, group) )
										this.groups.push(group);
								});
							}
						});
					});
					this.user = false;
				}

				if ( this.$route.name == 'invites' ) {
					user_ref.once('value')
					.then(user => {
						user = user.val();
						groups.once('value')
						.then(group_list => {
							if ( user.invites ) {
								_.map(user.invites, (val, invite, i) => {
									let group = group_list.val()[invite];
									group.created_by = val.leader;

									this.groups.push(group);
								});
							}
						});
					});
					this.user = false;
				}
			},

			joinGroup(group) {
				const user_ref = firebase.database().ref(`/users/${this.$store.state.uid}`),
							group_ref = firebase.database().ref(`groups/${group.name.toLowerCase()}`);

				user_ref.child('groups').child(group.name.toLowerCase()).once('value')
				.then(data => {

					if ( !data.val() ) {
						user_ref.child('/groups').child(group.name.toLowerCase()).set(true);
						group_ref.once('value')
						.then(data => {
							let members = data.val().members;

							members++;
							group_ref.child('members').set(members);

							
							const joined_group = _.find(this.groups, {'name': group.name});

							if ( joined_group ) {
								joined_group.joined = true;
								joined_group.members++;
							}


							user_ref.child('invites').child(group.name.toLowerCase()).remove()
							.then(() => {
								if ( this.$route.name == 'invites' ) {
									this.groups.splice(this.groups.indexOf(joined_group), 1);
								}
							});
						});
					}

				});			
			},

			deleteGroup(name) {
				const group_ref = firebase.database().ref(`/groups/${name.toLowerCase()}`),
							user_group_ref = 
							firebase.database().ref(`/users/${this.$store.state.uid}/groups/${name.toLowerCase()}`);

				group_ref.remove();
				user_group_ref.remove();

				_.map(this.groups, (group, i) => {
					if ( group.name == name )
						this.groups.splice(i, 1);
				})
			},

			leaveGroup(group) {
				const group_ref = firebase.database().ref(`/users/${this.$store.state.uid}/groups/${group.toLowerCase()}`),
							main_group = firebase.database().ref(`/groups/${group.toLowerCase()}`);

				main_group.once('value')
				.then(data => {
					let member_amount = data.val().members;

					member_amount--;
					main_group.child('members').set(member_amount);
				});		

				group_ref.remove();
				const index = _.indexOf(this.groups, _.find(this.groups, {name: group}));
				this.groups.splice(index, 1);
			},

			showMemberList(group) {
				this.$emit('showMemberList', group);
			}
		},
		created() {
			this.getAllGroups();
		}
	}
</script>

<style lang="scss">
	table {
		.request-btn {
			min-width: 155px;
		}
		.member-btn {
			width: 45px;
		}
	}
</style>