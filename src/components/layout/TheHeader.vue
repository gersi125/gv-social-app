<template>
  <header>
    <nav>
      <h1>
        <router-link to="/">Socialize</router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/users">Members</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/profile">You</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/contacts">Contacts</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/requests">Requests</router-link>
        </li>
        <li v-else>
          <router-link to="/auth">Login</router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-logbutton @click="logout(true)">Logout</base-logbutton>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>

export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    async logout(refresh = false) {
      this.$store.dispatch('logout');
      this.$router.replace('/users');
      
      try {
       await this.$store.dispatch('users/loadUsers', { forceRefresh: refresh });
      } catch (error) {
        this.error = error.message || 'Something went wrong while loading members of the app!';
      }
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #15548f;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #71aed1;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #71aed1;
  border-radius: 8px
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>