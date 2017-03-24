import Home from './components/Home.vue';
import Dashboard from './components/Dashboard.vue';
import { store } from './store';

export const routes = [
	{ path: '/', component: Home,
  beforeEnter: (to, from, next) => {
      if ( store.state.signed_in ) 
        next('/dashboard');
      else
        next();
  }},
	{ path: '/dashboard', component: Dashboard }
];