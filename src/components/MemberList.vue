<template>
	<div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <div class="column">
          <p class="modal-card-title">Member List</p>
        </div>
        <button class="delete"
        @click="closeModal"
        ></button>
      </header>
      <section class="member-list-modal modal-card-body">
        
        <table class="table">
				  <thead>
				    <tr>
				      <th><abbr title="Name">Member Name</abbr></th>
				      <th>Email</th>
				      <th><abbr title="Stack">Language</abbr></th>
				      <th><abbr title="Members">Project</abbr></th>
				      <th></th>
				    </tr>
				  </thead>
				  <tbody>
				  	<tr
				  	 v-if="!members.length">
				  	 	<td colspan="4" style="text-align: center">You Are The Only Member Of This Group</td>
				  	 </tr>
				    <tr v-for="member in members">
				      <td>{{ member.name }}</td>  
				      <td>{{ member.show_email ? member.email : 'Email Not Shown' }}</td>
				      <td>
								{{ member.language }}
				      </td>
				      <td>
								{{ member.project }}
				      </td>
				    </tr>
				  </tbody>
				</table>

      </section>
    </div>
  </div>
</template>

<script>
	export default {
		props: ['group'],

		data() {
			return {
				members: []
			}
		},

		methods: {
			refresh() {
				clearTimeout(window.refreshGroups);
				window.refreshGroups = setTimeout(() => {
					this.getAllGroups();
				}, 500);
			},

			getMemberList() {
				if ( !this.$store.state.uid ) {
					this.refresh();
					return;
				}

				const user_ref = firebase.database().ref(`/users/${this.$store.state.uid}`),
							users_ref = firebase.database().ref('/users'),
							groups_ref = firebase.database().ref('/groups');

				user_ref.once('value')
				.then(user => {
					user = user.val();
					/*
					* Iterate through current user's groups, then iterate through 
					* all users and match any that are in the group
					*/
					_.map(user.groups, (val, group, i) => {
						users_ref.once('value')
						.then(users => {
							users = users.val();
							_.map(users, user => {
								if ( user.groups && user.groups.hasOwnProperty(group) 
									&& user.name != this.$store.state.name )
									this.members.push(user); 
							});

						});
					});
				});
			},

			closeModal() {
				this.$store.state.show_member_list = false;
			}
		},

		created() {
			this.getMemberList();
		}
	}
</script>

<style lang="scss">
	.modal section.member-list-modal {
		padding-bottom: 25px;
	}
</style>