<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  border-radius: 12px;
  background-color: rgb(51, 100, 172);
  box-shadow: 0 2px 8px rgba(19, 18, 18, 0.26);
  padding: 0.7rem;
  margin: 0.8rem auto;
  max-width: 36rem;
}
</style>