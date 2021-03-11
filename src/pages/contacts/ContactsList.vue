<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasContacts">        
          <contact-item v-for="user in getContacts" 
                         :key="user.id" 
                         :id="user.id"
                         :first-name="user.firstName"
                         :last-name="user.lastName"
                         :email="user.email"
                         :phone-number="user.phoneNumber"
                         :description="user.description">
          </contact-item>
        </ul>
        <h3 v-else>You don't have any contacts yet.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import ContactItem from '../../components/contacts/ContactItem.vue';

export default {
  components: {
    ContactItem
  },
  data() {
    return {
      isLoading: false,
      error: null
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    getContacts() {
      return this.$store.getters['users/contacts'];
    },
    hasContacts() {
      return !this.isLoading && this.$store.getters['contacts/hasContacts'];
    }
  },
  created() {
    this.loadUsers(true);
    this.loadContacts(true);
    this.loadUserContacts(true);
  },
  methods: {
    async loadUsers(refresh = false) {
      this.isLoading = true;
      
      try {
        await this.$store.dispatch('users/loadUsers', {forceRefresh: refresh });
      } catch (error) {
        this.error = error.message || 'Something went wrong while loading members of the app!';
      }

      this.isLoading = false;
    },
    async loadContacts(refresh = false) {
      
      try {
        await this.$store.dispatch('contacts/loadContacts', {forceRefresh: refresh});
      } catch (error) {
        this.error = error.message || 'Something went wrong while loading your contacts!';
      }
    },
    async loadUserContacts(refresh = false) {
      
      try {
        await this.$store.dispatch('users/loadContactUsers', {forceRefresh: refresh});
      } catch (error) {
        this.error = error.message || 'Something went wrong while loading members of the app!';
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

h3 {
  text-align: center;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>