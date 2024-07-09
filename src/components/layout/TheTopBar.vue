<template>
  <header>
    <nav>
      <h3>💸Currency converter💸</h3>
      <ul>
        <li>
          <router-link to="/home">Home</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/manage">Manage</router-link>
        </li>
        <li v-if="isLoggedIn" @click="logout">
          <base-button>Log Out</base-button>
        </li>
        <li v-else>
          <base-button link to="/login">Log In</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
import { logout as logoutUser } from '../../api.js';
import { useStore } from '../../store.js';
export default {
  data() {
    return {
      store: useStore(),
    };
  },
  methods: {
    async logout() {
      const resp = await logoutUser();
      const { logout } = await resp.json();
      if (logout) {
        this.store.switchLogin();
        this.$router.replace('/home');
      }
    },
  },
  computed: {
    isLoggedIn() {
      return this.store.isLoggedIn;
    },
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
