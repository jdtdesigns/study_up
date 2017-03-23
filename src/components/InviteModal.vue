<template>
	
	<form>
		
		<div class="field"
		v-for="group in groups">
		<label class="label">{{ group.name }}</label>
		<button>Send Invite</button>
<!--               <div class="columns">
                <div class="column ">
                </div>
                <div class="column ">
                </div>
              </div>
              <p class="control">
              </p> -->
            </div> 
            
<!--             <div class="field">
              <p class="subtitle error is-6"
                v-if="store.group_error">That name is taken. Please choose another name.</p>
              <p class="subtitle error is-6"
                v-if="store.group_profile_error">You must complete your profile before creating a group.</p>
              </div> -->
              
<!--             <div class="field">
              <label class="label">Group Name</label>
              <p class="control">
                <input class="input" type="text"
                  v-model="group.name" required>
              </p>
            </div>
            
            <div class="field">
              <label class="label">Stack</label>
              <p class="control">
                <input class="input" type="text"
                  v-model="group.stack"
                  placeholder="MEAN, Laravel/Vue, ect." frequired>
              </p>
            </div> -->
            
            
            <div class="buttons field">
            	<button class="button"                                    @click.prevent="closeModal">Close</button>
            </div>
            
          </form>
        </section>
      </div>
    </div>
  </template>

  <script>
  	export default {
  		data() {
  			return {
  				
  			}
  		}	
  	}
  </script>

  <style lang="scss">
  	
  </style>