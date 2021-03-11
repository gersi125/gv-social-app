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
  padding: 0.5rem 1.2rem;
  font: inherit;
  background-color: #103769;
  box-shadow: 0 5px 8px rgba(13, 14, 17, 0.26);
  border: 1px solid #002761;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  margin-right: 1rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #030f47;
  border-color: #000441;
}

.flat {
  background-color: transparent;
  color: #001f61;
  border: none;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>