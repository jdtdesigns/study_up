<template>
  <div>
  	<top-bar
      @signin="signIn"
      @logout="logoutUser"></top-bar>
    
    <router-view></router-view>
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue';

export default {
	methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      
      firebase.auth().signInWithPopup(provider).then(result => {
        const token = result.credential.accessToken;
        const user = result.user;
        
        this.getUserData(user.uid).then(data => {
          if ( !data.val() ) {
            const db = firebase.database().ref(`/users/${user.uid}`);
            
            
            db.set({
              profile_completed: false
            });
          }
        });
        
      }).catch(error => {
        console.log(error.message);        
      });
    },
    getUserStatus() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.$store.signed_in = true;
          this.$store.uid = user.uid;
          this.$store.photo = user.photoURL;
          this.$store.email = user.email;
          this.$router.push('/dashboard');
        } else {
          this.$router.push('/');
        }
      });
    },
    getUserData(id) {
      return firebase.database().ref(`/users/${id}`).once('value');
    },    
    logoutUser() {
      firebase.auth().signOut();
      this.$store.signed_in = false;
      this.$router.push('/');
    },
    inviteUser(id) {
      const db = firebase.database().ref(`/users/${id}`);
      
      db.once('value')
      .then(user => {
        // this.invited_user = user.val();
        this.show_invite_modal = true;
      });
    }
  },
  components: {
  	TopBar
  },
  created() {
    this.getUserStatus();
    // this.$router.app.$on('signIn', this.signIn);
    // this.$on('invite', this.inviteUser);
//     firebase.database().ref('/users').push({
//             name: 'Carol',
//             address: '1390 Yates Ave.',
//             project: 'Study Up',
//             language: 'PHP',
//             school: 'GTU',
//             profile_completed: true
//           });
//     window.onunload = () => {
//       console.log('worked');
//     };
  }  
}
</script>

<style lang="scss">

</style>
