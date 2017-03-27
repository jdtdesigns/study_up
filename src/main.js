import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import { store } from './store';
import * as VueGoogleMaps from 'vue2-google-maps';
import axios from 'axios';
import _ from 'lodash';


Vue.use(VueRouter);
Vue.use(_);
window.axios = axios;

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAAGS_itREZl72734WFAo6ZejDqDXNv_SE'
    // v: 'OPTIONAL VERSION NUMBER',
    // libraries: 'places', //// If you need to use place input 
  }
});


const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
