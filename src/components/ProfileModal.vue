<template>
  <div class="modal"
  :class="{'is-active': $store.state.show_modal}">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <div class="column">
        <p class="modal-card-title">{{ $store.state.update_profile ? 'Update' : 'Complete' }} Your Profile</p>
        <h4 class="subtitle is-6"
        v-if="!$store.state.update_profile"><em>*Must be completed to Join Groups</em></h4>
      </div>
      <button class="delete"
      @click="$store.state.show_modal = false"
      ></button>
    </header>
    <section class="modal-card-body">
      
      <form>
        <div class="field">
          <p class="subtitle error is-6"
          v-if="$store.state.update_error">There was an error updating your profile. Please check your information.</p>
        </div>
        <div class="field">
          <label class="label">Display Name</label>
          <p class="control">
            <input class="input" type="text"
            v-model="profile.name" required>
          </p>
        </div>

        <div class="field">
          <label class="label">Address</label>
          <p class="control">
            <input class="input" type="text" 
            v-model="profile.address" 
            placeholder="Street Address, City" required>
          </p>
        </div>

        <div class="field">
          <label class="label">Current Project</label>
          <p class="control">
            <input class="input" type="text" 
            v-model="profile.project" required>
          </p>
        </div>

        <div class="field">
          <label class="label">Programming Language</label>
          <p class="control">
            <input class="input" type="text" 
            v-model="profile.language" required>
          </p>
        </div>

        <div class="field">
          <label class="label">School Name</label>
          <p class="control">
            <input class="input" type="text" 
            v-model="profile.school" required>
          </p>
        </div>
        
        <div class="field">
          <label class="label">Show Email:</label>
          <p class="control">
            <label class="radio">
              <input type="radio" value="true"
              v-model="profile.show_email">
              Yes
            </label>
            <label class="radio">
              <input type="radio" value="false" 
              v-model="profile.show_email">
              No
            </label>
          </p>
        </div>
        
        <div class="buttons field">
          <button class="button is-success"
          @click="updateProfile">Save changes</button>
          <button class="button" @click.prevent="$store.state.show_modal = false">Cancel</button>
        </div>
      </form>
    </section>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        profile: {
          name: '',
          address: '',
          project: '',
          language: '',
          school: '',
          profile_completed: true,
          show_email: true,
          email: this.$store.state.email,
          photo: this.$store.state.photo
        }
      };
    },
    methods: {
      updateProfile(e) {
        
        if ( !this.profile.name || !this.profile.address ||
           !this.profile.project || !this.profile.language ||
           !this.profile.school) return;
        
        e.preventDefault();
        
        
        const user = firebase.database().ref(`/users/${this.$store.state.uid}`);
        
        user.set(this.profile)
          .then(() => {
            this.$store.state.update_error = false;
            this.profile = {
              name: '',
              address: '',
              project: '',
              language: '',
              school: '',
              profile_completed: true,
              is_online: true
            };
            this.$store.state.show_modal = false;
            this.$store.state.update_profile = false;
          })
          .catch(err => this.$store.state.update_error = true);
      },
      showProfile() {
        const db = firebase.database().ref(`/users/${this.$store.state.uid}`);
        
        db.once('value').then(user => {
          user = user.val();
          this.profile = user;
          this.$store.state.update_profile = true;
          this.$store.state.show_modal = true;
        });
      }
    },
    created() {
      this.$router.app.$on('update-profile', this.showProfile);
    }
  }
</script>

<style lang="scss">
  
</style>