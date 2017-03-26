<template>
	<gmap-map
				class="map"
        :center="center"
        :zoom="9"
        :options="options"
    >

    	<gmap-marker
    		 v-for="(marker, i) in markers"
    		:key="i"
    		:position="marker.position"
    		:icon="{url: marker.icon}"
    		:clickable="true"
    		@click="showWindow(i)">

    		<gmap-info-window 
    			:opened="marker.show_window"
    			@closeclick="marker.show_window = false">
    			<div class="card">
    				<div class="card-content">
    					<div class="media">
    						<div class="media-left">
    							<figure class="image is-48x48">
    								<img :src="marker.photo" alt="Student Image">
    							</figure>
    						</div>
    						<div class="media-content">
    							<p class="title is-4">{{ marker.name }}</p>
    							<p class="subtitle is-6">{{ marker.email }}</p>
    						</div>
    					</div>
    					<div class="content">
    						<div class="columns">
    							<div class="column is-6">
    								<p class="subtitle is-6 is-marginless">Language:</p>
    								<p class="subtitle is-6 is-marginless">Project:</p>
    							</div>
    							<div class="column is-6">
    								<p class="subtitle is-6 is-marginless">{{ marker.language }}</p>
    								<p class="subtitle is-6 is-marginless">{{ marker.project }}</p>
    							</div>
    						</div>
    						<button class="button is-primary"
    							@click="invite(marker.id, marker.name)">Invite to Group</button>
    					</div>
    				</div>
    			</div>
    		</gmap-info-window>

    	</gmap-marker>

    </gmap-map>
</template>

<script>
	import { map_styles } from '../mapstyles';

	export default {
		data() {
			return {
				center: {lat: 33.778280, lng: -84.395031},
				options: {
					styles: map_styles
				},
				markers: [],
			};
		},
		methods: {
			showWindow(index) {
				this.markers[index].show_window = true;
			},
			getUserLocations() {
				const db = firebase.database().ref('/users');

				db.on('child_added', user => {
					const uid = user.key;
					user = user.val();

					const icon = user.is_online ? 'https://image.ibb.co/kf8KTv/studyup_online.png' :
								'https://image.ibb.co/ijda1F/studyup_offline.png';

					axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${user.address}&key=AIzaSyAAGS_itREZl72734WFAo6ZejDqDXNv_SE`)
					.then(res => {
						this.markers.push({
							position: res.data.results[0].geometry.location,
							icon: icon,
							show_window: false,
							name: user.name,
							email: user.show_email ? user.email : 'Email Not Shown',
							photo: user.photo,
							language: user.language,
							project: user.project,
							id: uid
						});
					});
				});
			},
			invite(id, name) {
				this.$emit('invite', {id: id, name: name});
			}
		},
		created() {
			this.getUserLocations();
		}
	}
</script>

<style lang="scss">
	.map {
	  height: 400px;
	  width: 100%;
	  margin: 0 auto;
	  @media (min-width: 768px) {
	    width: 75%;
	  }

	  .card {
	  	min-width: 230px;
	  }
	}
</style>