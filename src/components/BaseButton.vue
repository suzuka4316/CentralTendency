<template>
  <button :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style scoped>
button {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: pink;
  border: 1px solid pink;
  color: black;
  cursor: pointer;
  border-radius: 30px;
  display: inline-block;
}
button:hover {
  background-color: salmon;
  border: 1px solid salmon;
}
</style>
