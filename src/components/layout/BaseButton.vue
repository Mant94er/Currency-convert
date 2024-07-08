<template>
  <button v-if="!link">
    <slot></slot>
  </button>
  <button v-else>
    <router-link :to="to">
      <slot></slot>
    </router-link>
  </button>
</template>
<script>
export default {
  props: {
    to: {
      type: String,
      required: false,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
<style scoped>
button {
  border-radius: 10px;
  cursor: pointer;
  margin: 5px;
  color: navy;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: large;
  background-color: bisque;
  border-color: navy;
  border-top-width: thin;
  border-bottom-width: thin;
}
</style>
