import Vuex from 'vuex';

export const store = new Vuex.Store({
	state: {
		signed_in: false,
	  show_nav: false,
	  show_modal: false,
	  show_group_modal: false,
	  group_error: false,
	  group_profile_error: false,
	  update_error: false,
	  update_profile: true,
	  uid: '',
	  photo: '',
	  email: '',
	  show_invite_modal: false,
	  invited_user: {}
	}
});