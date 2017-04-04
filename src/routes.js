import Home from './components/Home.vue';
import Dashboard from './components/Dashboard.vue';
import GMap from './components/GMap.vue';
import GroupList from './components/GroupList.vue';
import { store } from './store';

export const routes = [
	{ path: '/', component: Home,
  beforeEnter: (to, from, next) => {
      if ( store.state.signed_in ) 
        next('/dashboard');
      else
        next();
  }},
	{ path: '/dashboard', component: Dashboard,
		children: [
			{ path: '', component: GMap },
			{ 
				path: 'groups', 
				name: 'groups', 
				component: GroupList 
			},
			{ 
				path: 'mygroups', 
				name: 'user-groups', 
				component: GroupList 
			},
			{ 
				path: 'invites', 
				name: 'invites', 
				component: GroupList 
			}
		] }
];