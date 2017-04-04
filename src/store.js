import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);
export const store = new Vuex.Store({
	state: {
		signed_in: false,
	  show_nav: false,
	  show_modal: false,
	  show_group_modal: false,
	  show_member_list: false,
	  group_error: false,
	  group_profile_error: false,
	  update_error: false,
	  update_profile: false,
	  uid: '',
	  photo: '',
	  email: '',
	  show_invite_modal: false,
	  invited_user: {}
	}
});