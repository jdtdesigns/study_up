<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <div class="column">
          <p class="modal-card-title">Create Group</p>
        </div>
        <button class="delete"
        @click="closeModal"
        ></button>
      </header>
      <section class="modal-card-body">
        
        <form>
          <div class="field">
            <p class="subtitle error is-6"
            v-if="$store.state.group_error">That name is taken. Please choose another name.</p>
            <p class="subtitle error is-6"
            v-if="$store.state.group_profile_error">You must complete your profile before creating a group.</p>
          </div>
          
          <div class="field">
            <label class="label">Group Name</label>
            <p class="control">
              <input class="input" type="text"
              v-model="group.name" required>
            </p>
          </div>
          
          <div class="field">
            <label class="label">Stack</label>
            <p class="control">
              <input class="input" type="text"
              v-model="group.stack"
              placeholder="MEAN, Laravel/Vue, ect." frequired>
            </p>
          </div>
          
          
          <div class="buttons field">
            <button class="button is-success"
            @click="addGroup">Create</button>
            <button class="button"                                   
             @click.prevent="closeModal">Cancel</button>
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
        group: {
          stack: '',
          name: ''
        }
      };
    },
    methods: {
      addGroup(e) {
        
        if ( !this.group.name || !this.group.stack )
          return;
        
        e.preventDefault();
        
        
        
        const db = firebase.database(),
              groups = db.ref('/groups'),
              group_name = this.group.name.toLowerCase(),
              user = db.ref(`/users/${this.$store.state.uid}`);
        
        
        user.once('value')
        .then(data => {
          if ( data.val().profile_completed ) {
            this.group.leader = this.$store.state.uid;
            groups.child(group_name).set(this.group).then(() => {
              user.child(`/groups/${group_name}`).set(true);
              this.group.name = '';
              this.group.stack = '';
              this.closeModal();            
            })
            .catch(err => this.$store.state.group_error = true);
          } else {
            this.$store.state.group_profile_error = true;
          }
        });
        
        
        
      },
      closeModal() {
        this.$store.state.show_group_modal = false;
        this.$store.state.group_error = false;
        this.$store.state.group_profile_error = false;
      }
    } 
  }
</script>

<style lang="scss">
  
</style>