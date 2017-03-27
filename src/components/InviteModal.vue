<template>
	<div class="modal invite is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <div class="column">
          <p class="modal-card-title">Invite {{ invite_data.name }} To Your Groups</p>
        </div>
        <button class="delete"
        @click="closeModal"
        ></button>
      </header>
      <section class="modal-card-body">

        <form>
          <div class="y-center columns"
          v-for="group in filtered_groups">
          <div class="column is-5 is-offset-1">
            <h2 class="title is-5"><strong>{{ group[0] }}</strong></h2>
          </div>
          <div class="y-center column is-3">
            <button class="button is-primary"
            @click.prevent="sendInvite(group.name)">{{ group[1] ? 'Invited' : 'Send Invite' }}</button>
          </div>
        </div>

        <hr>
        <div class="buttons field">
          <button class="invite-close-btn button is-dark"
          @click.prevent="closeModal">Close</button>
        </div>

      </form>
    </section>
  </div>
</div>
</template>

<script>
export default {
  props: ['invite_data'],
  data() {
     return {
        filtered_groups: []
     }
  },
  methods: {
    sendInvite(group) {
      const user_ref = firebase.database().ref(`users/${this.invite_data.id}`);

      user_ref.child('/invites')
      .child(group.toLowerCase()).set({
        leader: this.$store.state.name
      })

    },
    getUserGroups() {
      const invited_ref = firebase.database().ref(`/users/${this.invite_data.id}/invites`);

      invited_ref.once('value')
      .then(groups => {
        groups = Array.from(Object.keys(groups.val())).sort();
        this.invite_data.groups = Array.from(Object.keys(this.invite_data.groups)).sort();

        groups.map(group => {
          const index = this.invite_data.groups.indexOf(group);
          if ( index !== -1 ) 
            this.filtered_groups.push([group, 1]);
          else
            this.filtered_groups.push([group, 0]);
        });


        // console.log(invite_groups);
      });
    },
    closeModal() {
      this.$store.state.show_invite_modal = false;
    }
  },
  created() {
    this.getUserGroups();
  }
}
</script>

<style lang="scss">
  .modal.invite {
    .modal-card {
      width: 500px;
    }
    .modal-card-body {
      padding-bottom: 20px;
    }
  }
  .invite-close-btn {
    width: 90px;
  }
</style>