<template>
  <div>
    <h1>Welcome to currency conversion!</h1>
  </div>
</template>
<script>
import { useStore } from '../store.js';
export default {
  data() {
    return {
      store: useStore(),
    };
  },
  created() {
    this.store.switchLogin();
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
