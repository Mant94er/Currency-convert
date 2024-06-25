<template>
  <header>
    <nav>
      <h3>💸Currency converter💸</h3>
      <ul>
        <li>
          <router-link to="/home">Home</router-link>
        </li>
        <li>
          <router-link v-if="store.isLoggedIn" to="/manage">Manage</router-link>
        </li>
        <li v-if="store.isLoggedIn">
          <base-button link to="/">Log Out</base-button>
        </li>
        <li v-else>
          <base-button link to="/login">Log In</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
import { useStore } from '../store.js';
export default {
  data() {
    return {
      store: useStore(),
    };
  },
};
</script>

<style scoped>
h3 {
  margin: 0;
}
header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
ul {
  list-style: none;
  margin: 10px;
  padding: 2px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
li {
  margin: 0 1rem;
}

a {
  justify-content: right;
  align-content: right;
  align-items: right;
}
a.router-link-active {
  color: bisque;
  background-color: navy;
  border-color: bisque;
}
</style>
