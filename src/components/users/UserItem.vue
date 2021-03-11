<template>
  <li>
    <div class="form-control">
      <table>
        <tr>
          <th>
            <h3>{{ fullName }}</h3>
            <div v-for="cont in getContacts" :key="cont.id">
              <h4 v-if="isLoggedIn && cont.id===getId">(Contact)</h4>
            </div>
            <div v-for="req in getRequests" :key="req.id" :id="req.id">
               <h4 v-if="isLoggedIn && req.id===getId">sent you a request </h4>
               <h4 v-else-if="isLoggedIn && req.id===getUserId">Request Sent</h4>
            </div>
          </th>
          <td v-if="isLoggedIn">
            <div v-if="hasContacts && !hasRequests">
              <div v-for="cont in getContacts" :key="cont.id">
                <div v-if="cont.id===getId">
                  <base-button  @click="goToContacts">View Contacts</base-button>
                </div>
                <div v-else >
                  <div  v-for="user in getMyUsers" :key="user.id">
                    <div v-if="user.id===getId">
                      <base-button @click="submitRequest">Add Contact</base-button>
                    </div>
                  </div>  
                </div>  
              </div>
            </div>  
            <div v-else-if="hasContacts && hasRequests">
              <div v-for="cont in getContacts" :key="cont.id">
                <base-button v-if="cont.id === getId" @click="goToContacts">View Contacts</base-button>
                <div v-else v-for="req in getRequests" :key="req.id">
                  <base-button v-if="req.id===getId" @click="goToRequests">Go to Requests</base-button>
                  <h3 v-else-if="req.id===getUserId"></h3>
                  <div v-else >
                    <div  v-for="user in getMyUsers" :key="user.id">
                      <div v-if="user.id===getId">
                        <base-button @click="submitRequest">Add Contact</base-button>
                      </div>
                    </div>  
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="!hasContacts && hasRequests">
              <div v-for="req in getRequests" :key="req.id">
                <base-button v-if="req.id===getId" @click="goToRequests">Go to Requests</base-button>
                <h3 v-else-if="req.id===getUserId"></h3>
                <base-button v-else  @click="submitRequest">Add Contact</base-button>
              </div>
            </div>
            <div v-else-if="!hasContacts && !hasRequests">
              <base-button mode="outline" @click="submitRequest">Add Contact </base-button>
            </div>
          </td>
        </tr>
      </table>  
    </div> 
  </li>
</template>

<script>
import BaseButton from '../ui/BaseButton.vue';
export default {
  components: { BaseButton },
  data(){
    return {
      myUsersList: [],
      message: '',
      name: '',
      surname:'', 
      requestSent: false,
    };
  },
  props: ['id', 'firstName', 'lastName'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    getId() {
      return this.id;
    },
    getUserId() {
      return this.$store.getters['users/singleUser'].id;
    },
    getMyUsers() {
      return this.myUsersList;
    },
    getContacts() {
      return this.$store.getters['users/contacts'];
    },
    hasContacts() {
      return this.$store.getters['users/hasContacts'];
    },
    getRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    }
  },
  created() {
    this.loadUsers(true);
    this.loadContacts(true);
    this.loadUserContacts(true);
    this.loadRequests(true);
    this.loadmyUsers();
  },
  methods: {
    async loadUsers(refresh = false) {

      try {
        await this.$store.dispatch('users/loadUsers', {forceRefresh: refresh});
      } catch (error) {
        this.error = error.message || 'Something went wrong while loading members of the app.';
      }
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
    async loadRequests(refresh = false) {

      try {
        await this.$store.dispatch('requests/fetchRequests', {forceRefresh: refresh});  
      } catch (error) {
        this.error = error.message || 'Something failed!';
      }
    },
    loadmyUsers() {
      const allUsers = this.$store.getters['users/users'];
      const allContacts = this.$store.getters['users/contacts'];

      for(const userKey in allUsers) {
        for(const contactKey in allContacts) {
          if(allUsers[userKey].id !== allContacts[contactKey].id) {
            this.myUsersList.push(allUsers[userKey]);
          }
        }
      }
    },
    goToContacts() {
      this.$router.replace('/contacts')
    },
    goToRequests() {
      this.$router.replace('/requests')
    },
    async submitRequest() {
      this.formIsValid = true;
      
      this.name = this.$store.getters['users/singleUser'].firstName;
      this.surname = this.$store.getters['users/singleUser'].lastName;
      this.message = this.name + ' ' + this.surname + ' wants to be your friend.';
      
      await this.$store.dispatch('requests/contactUser', {
        userId: this.id,
        message: this.message
      });

      this.loadRequests(true);
      this.loadmyUsers();
      this.$router.replace('/users');
    }
  }
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 18px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

table {
  width: 100%;
}
th {
  width: 70%;
}
td {
  text-align: right;
  width: 30%;
}
</style>