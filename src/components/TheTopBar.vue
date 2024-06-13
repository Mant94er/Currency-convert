<template>
  <header>
    <div>
      <div id="title">💸Currency converter💸</div>
      <div id="list">
        <ul>
          <li v-if="withinAccount">
            <router-link to="/home">Home</router-link>
          </li>
          <li v-if="withinAccount">
            <router-link to="/manage">Manage</router-link>
          </li>
          <li v-if="withinAccount">
            <router-link to="/">Log Out</router-link>
          </li>
          <li>
            <router-link to="/login">Log In</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      withinAccount: true,
    };
  },
  mounted() {},
};
</script>

<style scoped>
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
div {
  display: inline-block;
  overflow: hidden;
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
#title {
  float: left;
  transform: translateY(10px);
}
#list {
  overflow: hidden;
  float: right;
}
</style>
