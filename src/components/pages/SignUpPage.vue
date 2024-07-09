<template>
  <div>
    <base-form @submit.prevent="signUp">
      <h2>Create New Account</h2>
      <div>Username: <input type="text" v-model="newUser" /></div>
      <div>Password: <input type="password" v-model="newPassword" /></div>
      <base-button type="submit">Submit</base-button>
      <p v-if="error">⛔ {{ error }}</p>
    </base-form>
  </div>
</template>
<script>
import { useStore } from '../../store.js';
export default {
  data() {
    return {
      store: useStore(),
      newUser: '',
      newPassword: '',
      error: null,
    };
  },
  methods: {
    signUp() {
      this.error = null;
      if (this.newUser.trim() === '' || this.newPassword.trim() === '') {
        this.error = 'Username and passowrd are required!';
      } else {
        fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            user: this.newUser,
            password: this.newPassword,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              return this.$router.replace({ path: '/login' });
            }
            if (data.error) {
              this.error = data.error;
            }
          })
          .catch((err) => {
            this.error = err;
          });
      }
    },
  },
};
</script>

<style scoped>
div {
  margin: 8px;
}
p {
  color: red;
}
</style>
