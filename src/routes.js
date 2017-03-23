import Home from './components/Home.vue';
import Dashboard from './components/Dashboard.vue';

export const routes = [
	{ path: '/', component: Home,
  beforeEnter: (to, from, next) => {
      if ( store.signed_in ) 
        next('/dashboard');
      else
        next();
  }},
	{ path: '/dashboard', component: Dashboard,
  beforeEnter: (to, from, next) => {
    const db = firebase.database().ref(`/users/${store.uid}`);
    
    db.once('value')
    .then(user => {
      if ( !user.val().profile_completed )
        store.show_modal = true;
      next();
    });
    
	}}
];