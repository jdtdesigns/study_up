<template>
	<div class="modal invite is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <div class="column">
          <p class="modal-card-title">Invite {{ invite_data.name }} to your groups</p>
        </div>
        <button class="delete"
        @click="closeModal"
        ></button>
      </header>
      <section class="modal-card-body">

        <form>
          <div class="y-center columns"
            v-for="group in invite_data.groups">
            <div class="column is-5 is-offset-1">
              <h2 class="title is-5"><strong>{{ group.name }}</strong></h2>
            </div>
            <div class="y-center column is-3">
              <button class="button is-primary"
                @click.prevent="sendInvite(group.name)">Send Invite</button>
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

       }
     },
     methods: {
       sendInvite(group) {
          const user_ref = firebase.database().ref(`users/${this.invite_data.id}`);
          user_ref.child('/invites')
          .child(group.toLowerCase()).set({
            leader: this.$store.state.name
          });

       },
        closeModal() {
          this.$store.state.show_invite_modal = false;
        }
      },
      created() {
        console.log(this.invite_data, 'blah');
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
      // margin-top: 5px;
    }
  </style>