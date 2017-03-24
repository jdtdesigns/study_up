<template>
	<!-- <div id="map"></div> -->
	<gmap-map style="width: 100%; height: 100%; position: absolute; left:0; top:0"
        :center="{lat: 1.38, lng: 103.8}"
        :zoom="12"
    ></gmap-map>
</template>

<script>
	import { map_styles } from '../mapstyles';

	export default {
		data() {
			return {
				// store: store  
			};
		},
		methods: {
		// 	refresh() {
		// 		setTimeout(() => { this.setupMap(); }, 500);
		// 	},
		// 	setupMap() {

		// 		try { google; }
		// 		catch(e) {
		// 		    if ( e.name == "ReferenceError" ) {
		// 		        this.refresh();
		// 		        return;
		// 		    }
		// 		}

		// 		const map = new google.maps.Map(document.getElementById('map'), {
		// 			center: {lat: 33.778280, lng: -84.395031},
		// 			styles: map_styles,
		// 			zoom: 9
		// 		});
		// 		const geocoder = new google.maps.Geocoder();


		// 		const db = firebase.database().ref('/users');

		// 		db.on('child_added', user => {
		// 			let uid = user.uid, address;
		// 			user = user.val();

		// 			if ( user ) {
		// 				address = user.address;

		// 				geocoder.geocode( { 'address': address}, (results, status) => {
		// 					if (status == 'OK') {

		// 						const icon = user.is_online ?
		// 						'https://image.ibb.co/kf8KTv/studyup_online.png' :
		// 						'https://image.ibb.co/ijda1F/studyup_offline.png';

		// 						const marker = new google.maps.Marker({
		// 							map: map,
		// 							icon: icon,
		// 							scale: 1,
		// 							position: results[0].geometry.location
		// 						});

		// 						const email = user.show_email ? this.$store.state.email : 'Email Not Shown';

		// 						const windowMarkup = 
		// 						`<div class="card">
		// 						<div class="card-content">
		// 							<div class="media">
		// 								<div class="media-left">
		// 									<figure class="image is-48x48">
		// 									<img src="${this.$store.state.photo}" alt="Student Image">
		// 									</figure>
		// 								</div>
		// 								<div class="media-content">
		// 									<p class="title is-4">${user.name}</p>
		// 									<p class="subtitle is-6">${email}</p>
		// 								</div>
		// 							</div>
		// 							<div class="content">
		// 								<div class="columns">
		// 									<div class="column is-6">
		// 										<p class="subtitle is-6 is-marginless">Language:</p>
		// 										<p class="subtitle is-6 is-marginless">Project:</p>
		// 									</div>
		// 									<div class="column is-6">
		// 										<p class="subtitle is-6 is-marginless">${user.language}</p>
		// 										<p class="subtitle is-6 is-marginless">${user.project}</p>
		// 									</div>
		// 								</div>
		// 								<button class="button is-primary"
		// 								onclick="vm.$emit('invite', '${this.$store.state.uid}')">
		// 								Invite to Group</button>
		// 							</div>
		// 						</div>
		// 					</div>`,

		// 					infoWindow = new google.maps.InfoWindow({
		// 						content: windowMarkup
		// 					});


		// 					marker.addListener('click', () => infoWindow.open(map, marker));
		// 				} else {
		// 					alert('Geocode was not successful for the following reason: ' + status);
		// 				}
		// 			});
		// 			}
		// 		});
		// 	}
		// },
		// mounted() {
		// 	this.setupMap();
		}
	}
</script>

<style lang="scss">
	#map {
	  height: 400px;
	  width: 100%;
	  margin: 0 auto;
	  @media (min-width: 768px) {
	    width: 75%;
	  }
	}
</style>