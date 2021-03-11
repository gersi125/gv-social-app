<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <transition-group name="auth-list" :css="false"
          @before-enter="beforeEnter"
          @enter="enterMethod"
          @after-enter="afterEnter">
            <li v-if="mode === 'signup'">
              <div class="form-control">
                <label for="firstname">Firstname</label>
                <input type="text" id="firstname" v-model.trim="firstname" />
              </div>
              <div class="form-control">
                <label for="lastname">Lastname</label>
                <input type="text" id="lastname" v-model.trim="lastname" />
              </div>
              <div class="form-control">
                <label for="birthdate">Birthdate</label>
                <input type="date" id="birthdate" v-model.trim="birthdate" />
              </div>
            </li>
        </transition-group>
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">Please enter a valid email and password (must be at least 8 characters long).</p>
        <br>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      birthdate: '',
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error:  null,
      enterInterval: null,
      leaveInterval: null
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Signup';
      } else {
        return 'Login';
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;

      if (this.email === ''    || !this.email.includes('@') || this.email.includes(' ') || 
          this.password === '' || this.password.length < 8  || this.password.includes(' ')) {
            
          this.formIsValid = false;
          return;
      }

      this.isLoading = true;

      const actionPayload1 = {
        email:    this.email,
        password: this.password,
      };

      const actionPayload2 = {
        firstname: this.firstname,
        lastname:  this.lastname,
        birthdate: this.birthdate
      };

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload1);
        } else {
          await this.$store.dispatch('signup', actionPayload1);
          await this.$store.dispatch('register/registerUser', actionPayload2);
        }

        const redirectUrl = '/' + (this.$route.query.redirect || 'users');
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || 'Failed to authenticate, try later.';
      }
      
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleError() {
      this.error = null;
    },
    beforeEnter(el) {
      if (this.mode === 'signup') {
          el.style.opacity = 0;
      } 
       if (this.mode === 'login') {
          el.style.opacity = 1;
      } 

    },
    enterMethod(el, done) {
      let round = 1;
      if (this.mode === 'signup') {
        this.enterInterval = setInterval(() => {
          el.style.opacity = round * 0.02;
          round ++;

          if(round > 50) {
            clearInterval(this.enterInterval);
            done();
            }
          }, 2);
      }
      if (this.mode === 'login') {
        this.enterInterval = setInterval(() => {
          el.style.opacity = 1 - round * 0.02;
          round ++;

          if(round > 50) {
            clearInterval(this.enterInterval);
            done();
            }
          }, 2);
      }
    },
    afterEnter(el) {
       if (this.mode === 'signup') {
          el.style.opacity = 1;
      } 
       if (this.mode === 'login') {
          el.style.opacity = 0;
      } 
    }
  }
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

ul {
    list-style: none;
    margin: 1rem 0;
    padding: 0;
}

li {
  list-style: none;
}

</style>