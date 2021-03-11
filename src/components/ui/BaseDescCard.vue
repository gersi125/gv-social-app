<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  border-radius: 8px;
  background-color: rgb(189, 233, 253);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.26);
  padding: 0.5rem;
  max-width: 40rem;
  font: 105% sans-serif;
}
</style>