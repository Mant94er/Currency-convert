<template>
  <div>
    <form @submit.prevent="logIn" id="login">
      <div>Username: <input title="username" type="text" v-model="user" /></div>
      <div>
        Password: <input title="password" type="password" v-model="password" />
      </div>
      <base-button type="submit">Log In</base-button>
      <p id="error" v-if="invalidUser">⛔User not found! Please try again</p>
      <p>
        Don't have an account yet?
        <router-link to="signup">Sign Up!</router-link>
      </p>
    </form>
  </div>
</template>
<script>
import { useStore } from '../../store.js';
export default {
  data() {
    return {
      store: useStore(),
      user: '',
      password: '',
      invalidUser: false,
    };
  },
  methods: {
    logIn() {
      fetch('/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          user: this.user,
          password: this.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem('id', JSON.stringify(data));
          this.invalidUser = false;
          this.store.switchLogin();
          this.$router.push({ path: '/home' });
        })
        .catch((err) => {
          console.error(err);
          this.invalidUser = true;
        });
    },
  },
};
</script>

<style scoped>
form {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 40rem;
  color: navy;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: large;
  background-color: bisque;
  border-top-style: solid;
  border-bottom-style: solid;
  border-top-color: navy;
  border-bottom-color: navy;
  border-top-width: thick;
  border-bottom-width: thick;
}
div {
  margin: 8px;
}
button {
  border-radius: 10px;
  margin: 5px;
  color: navy;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: large;
  background-color: bisque;
  border-color: navy;
  border-top-width: thin;
  border-bottom-width: thin;
}
#error {
  color: red;
}
</style>
