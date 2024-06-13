<template>
  <div>
    <the-top-bar></the-top-bar>
    <main>
      <router-view @loginSuccess="verifyUser"></router-view>
    </main>
  </div>
</template>

<script>
import TheTopBar from './components/TheTopBar.vue';
export default {
  components: { TheTopBar },
  methods: {
    verifyUser(logIn) {
      if (logIn === 'suc') {
        console.log('User logged in');
      } else {
        console.log('Problem');
      }
    },
  },
};
</script>
<style>
body {
  display: contents;
}
label {
  text-align: center;
}

p {
  text-align: center;
}

select {
  text-align: center;
}
button {
  text-align: center;
}
header {
  color: navy;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: xx-large;
  background-color: bisque;
  border-top-style: solid;
  border-bottom-style: solid;
  border-top-color: navy;
  border-bottom-color: navy;
  border-top-width: thick;
  border-bottom-width: thick;
}
</style>
