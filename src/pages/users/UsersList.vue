<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card v-if ="hasUsers && isLoggedIn">
        <div class="controls">
          <table style="width: 100%">
            <tr>
              <td style="text-align: left">
                <h2> Members of Socialize</h2>
              </td>
              <td style="text-align: right">
               <base-button style="padding: 0.6rem 1.2rem" mode="outline" @click="LoadUsers(true)">Refresh</base-button>
              </td>
            </tr>
          </table>
        </div>
      </base-card>
    </section>   
    <section>
      <base-card>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasUsers">
          <user-item v-for="user in getUsers"
                      :key="user.id"
                      :id="user.id"
                      :first-name="user.firstName"
                      :last-name="user.lastName">
          </user-item>
        </ul>
        <h3 style="text-align: center;" v-else>No members found yet.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>

import BaseButton from '../../components/ui/BaseButton.vue';
import UserItem from '../../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
    BaseButton
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
    getUsers() {
      return this.$store.getters['users/users'];
    },
    hasUsers() {
      return !this.isLoading && this.$store.getters['users/hasUsers'];
    },
  },
  created() {
    this.loadUsers(true); 
  },
  methods: {
    async loadUsers(refresh = false) {
      this.isLoading = true;

      try {
        await this.$store.dispatch('users/loadUsers', {forceRefresh: refresh});
      } catch (error) {
        this.error = error.message || 'Something went wrong while loading members of the app.';
      }
      
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>