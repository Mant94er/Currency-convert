<template>
  <div>
    <base-form @submit.prevent="logIn" id="login">
      <div>Username: <input title="username" type="text" v-model="user" /></div>
      <div>
        Password: <input title="password" type="password" v-model="password" />
      </div>
      <base-button type="submit">Log In</base-button>
      <p id="error" v-if="error">⛔ {{ error }}</p>
      <p>
        Don't have an account yet?
        <router-link to="signup">Sign Up!</router-link>
      </p>
    </base-form>
  </div>
</template>
<script>
import { login as loginUser } from '../../api.js';
import { useStore } from '../../store.js';
export default {
  data() {
    return {
      store: useStore(),
      user: '',
      password: '',
      error: null,
    };
  },
  methods: {
    logIn() {
      this.error = null;
      if (this.user.trim() === '' || this.password.trim() === '') {
        this.error = 'Username and password are required!';
      }
      loginUser(this.user, this.password)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            this.store.switchLogin();
            return this.$router.replace({ path: '/home' });
          }
          if (data.error) {
            this.error = data.error;
          }
        })
        .catch((err) => {
          this.error = err;
        });
    },
  },
};
</script>

<style scoped>
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
