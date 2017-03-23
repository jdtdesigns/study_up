<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <div class="column">
        <p class="modal-card-title">Create Group</p>
      </div>
      <button class="delete"
      @click="closeModal"
      ></button>
    </header>
    <section class="modal-card-body">
      
      <form>
        <div class="field">
          <p class="subtitle error is-6"
          v-if="store.group_error">That name is taken. Please choose another name.</p>
          <p class="subtitle error is-6"
          v-if="store.group_profile_error">You must complete your profile before creating a group.</p>
        </div>
        
        <div class="field">
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
        </div>
        
        
        <div class="buttons field">
          <button class="button is-success"
          @click="addGroup">Submit</button>
          <button class="button"                                    @click.prevent="closeModal">Cancel</button>
        </div>
        
      </form>
    </section>
  </div>
</div>