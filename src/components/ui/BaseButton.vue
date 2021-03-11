<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  }
}
</script>

<style scoped>
button,
a {
  outline: none;
  text-decoration: none;
  padding: 0.7rem 1.2rem;
  font: inherit;
  background-color: #0f207c;
  border: 2px solid #040b50;
  color: white;
  cursor: pointer;
  border-radius: 15px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #05205a;
  border-color: #6b8bcc;
}

.flat {
  background-color: transparent;
  color: #1a2a4e;
  border: none;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #a3d9e9;
}
</style>