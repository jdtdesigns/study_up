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
        <div class="y-center columns"
          v-if="!invite_data.auth_groups">
          <div class="column is-12">
            <h3 class="has-text-centered">You Haven't Created Any Groups Yet</h3>
          </div>
        </div>

        <div class="y-center columns"
        v-for="group in filtered_groups">
          <div class="column is-5 is-offset-1">
            <h2 class="title is-5"
              :class="{'invited': group[1]}"><strong>{{ group[0] }}</strong></h2>
          </div>
          <div class="y-center column is-3">
            <button class="invite-btn button is-primary"
            @click.prevent="sendInvite(group[0])"
            :class="{'is-disabled': group[1]}">{{ group[1] ? 'Invited' : 'Send Invite' }}</button>
          </div>
        </div>

        <hr>
        <div class="buttons field">
          <button class="invite-close-btn button is-dark"
          @click.prevent="closeModal">Close</button>
        </div>
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
      const invited_user = firebase.database().ref(`users/${this.invite_data.id}`);

      invited_user.child('/invites')
      .child(group.toLowerCase()).set({
        leader: this.$store.state.name
      });
      _.map(this.filtered_groups, filtered => {
        if ( filtered[0] == group )
          filtered[1] = 1;
      });
    },

    getUserGroups() {
      const selected_invites = firebase.database().ref(`/users/${this.invite_data.id}/invites`),
            auth_groups = this.invite_data.auth_groups;

      selected_invites.once('value')
      .then(invite_groups => {
        invite_groups = invite_groups.val();
        /*
        * Lists all groups the current auth user has created.
        * Check if current user has already invited the map clicked user
        * and set button to disabled if true.
        * If false, show invite button.
        */
        _.map(auth_groups, (val, group, i) => {
          if ( invite_groups && invite_groups.hasOwnProperty(group) )
            this.filtered_groups.push([val.name, 1]);
          else
            this.filtered_groups.push([val.name, 0]);
        });      
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
      .title.invited {
        color: #aaa;
      }
    }
    .invite-btn {
      min-width: 110px;
    }
  }
  .invite-close-btn {
    width: 90px;
  }
</style>