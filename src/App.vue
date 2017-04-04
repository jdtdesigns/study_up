<template>
  <div>
  	<top-bar
      @signin="signIn"
      @logout="logoutUser"></top-bar>
    
    <router-view
      @signin="signIn"></router-view>
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
          this.$store.state.signed_in = true;
          this.$store.state.uid = user.uid;
          this.$store.state.photo = user.photoURL;
          this.$store.state.email = user.email;
          this.$router.app.$emit('uid-set');
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
      this.$store.state.signed_in = false;
      this.$router.push('/');
    }
  },
  components: {
  	TopBar
  },
  created() {
    this.getUserStatus();
    // firebase.auth().signOut();
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

    // firebase.database().ref('/groups').child('not mine').set({
    //   created_by: '-KfrR-THtJmMiYQbDNvf',
    //   members: 1,
    //   name: 'Not Mine',
    //   stack: 'HTML/CSS'
    // });
  }  
}
</script>

<style lang="scss">
  .y-center {
    align-items: center;
  }

  .modal {
    .modal-card-head {
      padding-top: 5px;
      h4.subtitle {
        margin-top: 5px;
      }
      button.delete {
        position: relative;
        top: -5px;
      }
    }
    section {
      padding-bottom: 40px;
      .subtitle.error {
        color: red;
        font-weight: 400;
      }
    }
    hr {
      margin: 10px 0 18px;
    }
    .buttons {
      margin-top: 20px;
    }
  }
</style>
