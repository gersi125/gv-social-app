<template>
  <li>
    <div>
      <table>
        <tr>
          <td><h3>{{ fullName }}</h3></td>
          <td style="text-align:right">
            <base-button style="padding: 0.6rem 1.2rem" @click="removeContact">Remove Contact</base-button>
          </td>
        </tr>
      </table>
    </div>
    <base-contactcard>
      <base-contactbutton @click="toggleContactDetails">
        {{ detailsVisible ? 'Hide' : 'Show'  }} Details
      </base-contactbutton>
      <div v-if="detailsVisible">
        <table>
          <tr>
            <th>E-Mail:</th>
            <td><base-desccard>{{ getEmail }}</base-desccard></td>
          </tr>
          <tr>
            <th>Mobile:</th>
            <td><base-desccard>{{ getPhone }}</base-desccard></td>
          </tr>
        </table>
        <h3><label for="description">Description</label></h3>
        <base-desccard>{{ getDescription }}</base-desccard>
      </div>
      <div v-if="detailsVisible" class="action">
        <base-contactbutton>
          <a :href="emailLink" style="color: white">Send Message</a>
        </base-contactbutton>
      </div>
    </base-contactcard>
  </li>
</template>

<script>
import BaseButton from '../ui/BaseButton.vue';

export default {
  data() {
    return {
      detailsVisible: false
    }
  },
  components: { BaseButton },
  props: ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'description'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    getEmail() {
      return this.email;
    },
    emailLink() {
      return 'mailto:' + this.email;
    },
    getPhone() {
      return this.phoneNumber;
    },
    getDescription() {
      return this.description;
    }
  },
  async created() {
    await this.loadUsers(true);
    await this.loadContacts(true);
    await this.loadUserContacts(true);
  },
  methods: {
    toggleContactDetails() {
      this.detailsVisible = !this.detailsVisible;
    },
    async loadUsers(refresh = false) {
  
      try {
       await this.$store.dispatch('users/loadUsers', {forceRefresh: refresh});
      } catch (error) {
        this.error = error.message || 'Something went wrong while loading members of the app!';
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
    async removeContact() {

      await this.$store.dispatch('contacts/removeContact', {
        userId:    this.$store.getters['users/singleUser'].id,
        contactId: this.id
      });

      await this.$store.dispatch('contacts/removeContact', {
        userId:    this.id,
        contactId: this.$store.getters['users/singleUser'].id,
      });

      this.loadContacts(true);
      this.loadUserContacts(true);
    }
  }
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #3f3c3c;
  border-radius: 12px;
  padding: 0.5rem;
}

h3 {
  font-size: 1.5rem;
  padding: 0rem
}

h3,
table {
  margin: 0.2rem 0;
  text-align: left;
  width: 100%
}
th {
  color: rgb(158, 207, 247);
  width: 12%
}

label,text {
  color:rgb(158, 207, 247);
  margin: 0.2rem ;
  font-size: 1.2rem ;
}
div {
  margin: 0.8rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>