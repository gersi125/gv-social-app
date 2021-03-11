<template>
  <form @submit.prevent="submitForm">
    <table> 
      <tr>
        <td>
          <div class="form-control" :class="{invalid: !firstName.isValid}">
            <label for="firstname">Firstname</label>
            <input type="text" id="firstname" v-model.trim="firstName.val" @blur="clearValidity('firstName')"/>
          </div>
        </td>
        <td>
          <div class="form-control" :class="{invalid: !lastName.isValid}">
            <label for="lastname">Lastname</label>
            <input type="text" id="lastname" v-model.trim="lastName.val" @blur="clearValidity('lastName')"/>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <p v-if="!firstName.isValid">Firstname field must not be empty.</p>
        </td>
        <td>
          <p v-if="!lastName.isValid">Lastname field must not be empty.</p>
        </td>
      </tr>  
    </table>
    <div class="form-control" :class="{invalid: !birthDate.isValid}">
      <label for="birthdate">Date of Birth</label>
      <input type="date" id="birthdate" v-model.trim="birthDate.val" @blur="clearValidity('birthDate')"/>
      <p v-if="!birthDate.isValid">Please specifiy your birth date.</p>
    </div>
       <table> 
         <tr>
           <td>
             <div class="form-control" :class="{invalid: !email.isValid}">
              <label for="email">E-Mail</label>
              <input type="email" id="email" v-model.trim="email.val" @blur="clearValidity('email')"/>
             </div>
            </td>
           <td>
             <div class="form-control" :class="{invalid: !phoneNumber.isValid}">
               <label for="phonenumber">Mobile Number</label>
               <input type="text" id="phonenumber" v-model.trim="phoneNumber.val" @blur="clearValidity('phoneNumber')"/>
             </div>
           </td>
         </tr>
         <tr>
           <td>
             <p v-if="!email.isValid">This is not a valid e-mail address format.</p>
           </td>
           <td>
             <p v-if="!phoneNumber.isValid">This is not a valid phone number.</p>
           </td>
         </tr>
       </table>
    <div class="form-control" :class="{invalid: !description.isValid}">
      <label for="description">Description</label>
      <textarea id="description" rows="6" v-model.trim="description.val" @blur="clearValidity('description')"></textarea>
      <p v-if="!description.isValid">Please provide a short description of yourself.</p>
    </div>
    <p v-if="!formIsValid">Please fix the highlighted errors above and submit your personal data again.</p>
    <br>
    <base-button style="padding: 0.6rem 1.2rem">Save Changes</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: {
        val: this.$store.getters['users/singleUser'].firstName,
        isValid: true
      },
      lastName: {
        val: this.$store.getters['users/singleUser'].lastName,
        isValid: true,
      },
      birthDate: {
        val: this.$store.getters['users/singleUser'].birthDate,
        isValid: true,
      },
      email: {
        val: this.$store.getters['users/singleUser'].email,
        isValid: true,
      },
      phoneNumber: {
        val: this.$store.getters['users/singleUser'].phoneNumber,
        isValid: true,
      },
      description: {
        val: this.$store.getters['users/singleUser'].description,
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.val === '') {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
       if (this.birthDate.val === '') {
        this.birthDate.isValid = false;
        this.formIsValid = false;
      }
       if (!this.email.val.includes('@')) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.phoneNumber.val.length > 15 ) {
        this.phoneNumber.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        birth: this.birthDate.val,
        email: this.email.val,
        phone: this.phoneNumber.val,
        desc: this.description.val
      };

      this.$emit('save-data', formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

table {
  width: 100%
}
</style>