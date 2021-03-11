<template>
  <base-spinner  v-if="isLoading"></base-spinner>
  <li>
    <h3>{{ message }}</h3>
    <div class="actions">
      <base-requestbutton @click="acceptRequest">Accept</base-requestbutton>
      <base-requestbutton @click="refuseRequest">Refuse</base-requestbutton>
    </div>
  </li>
</template>

<script>
export default {
  props: ['message', 'contactId'],
  data() {
    return {
      isLoading: false
    }
  },
  async created() {
    await this.loadRequests(true);
  },
  methods: {
    async loadRequests(refresh = false) {
      this.isLoading = true;

      try {
        await this.$store.dispatch('requests/fetchRequests', {forceRefresh: refresh});  
      } catch (error) {
        this.error = error.message || 'Something failed!';
      }

      this.isLoading = false;
    },
    async acceptRequest() {

      await this.$store.dispatch('contacts/addContact', {
        userId: this.$store.getters['users/singleUser'].id,
        contactId: this.contactId
      });
      
      await this.$store.dispatch('contacts/addContact', {
        userId:    this.contactId,
        contactId: this.$store.getters['users/singleUser'].id
      });
      
      await this.$store.dispatch('requests/removeRequest', {
       contactId: this.contactId
      });

      this.loadRequests(true);
    },
    async refuseRequest() {

      await this.$store.dispatch('requests/removeRequest', { 
          contactId: this.contactId
      });

      this.loadRequests(true);   
    }
  }
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>