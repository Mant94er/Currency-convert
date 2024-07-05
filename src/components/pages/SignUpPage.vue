<template>
  <div>
    <form @submit.prevent="signUp">
      <h2>Create New Account</h2>
      <div>Username: <input type="text" v-model="newUser" /></div>
      <div>Password: <input type="password" v-model="newPassword" /></div>
      <base-button type="submit">Submit</base-button>
      <p v-if="invalidUser">
        ⛔The username is not availabe! Please try another one
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
      newUser: '',
      newPassword: '',
      invalidUser: false,
    };
  },
  methods: {
    signUp() {
      if (this.newUser.trim() === '' || this.newPassword.trim() === '') {
        this.invalidUser = true;
      } else {
        fetch('/accounts', {
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
            this.invalidUser = false;
            this.store.switchLogin();
            localStorage.setItem('user', JSON.stringify(data));
            this.$router.push({ path: '/home' });
          })
          .catch((err) => {
            console.error(err);
            this.invalidUser = true;
          });
      }
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
p {
  color: red;
}
</style>
