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
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #10458b;
  border: 1px solid #002761;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  margin-right: 0.8rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #000c41;
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