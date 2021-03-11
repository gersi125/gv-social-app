<template>
  <section>
    <base-card>
      <h2>Profile Information</h2>
      <user-form @save-data="saveData"></user-form>
    </base-card>
  </section>
</template>

<script>
import UserForm from '../../components/users/UserForm.vue';

export default {
  props: ['id', 'firstName', 'lastName', 'birthDate', 'email', 'phoneNumber', 'description'],
  components: {
    UserForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('users/completeUser', data);
      this.$router.replace('/users');
    }
  }
};
</script>