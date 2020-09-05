<template>
  <div id="app">
    <Menubar />
    <router-view class="view" />
  </div>
</template>

<style>
html,
body {
  height: 100vh;
  margin: 0;
  background: #2c3e50;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-flow: column;
  height: 100%;
}

#nav {
  padding: 1em;
  flex: 0 1 auto;
  /* The above is shorthand for:
  flex-grow: 0,
  flex-shrink: 1,
  flex-basis: auto
  */
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.view {
  flex: 1 1 auto;
}

body {
  padding: 0;
  margin: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: white;
}

.fa-button {
  color: white;
  vertical-align: middle;
}
</style>

<script>
// @ is an alias to /src
import Menubar from "@/components/Menubar.vue";

export default {
  components: {
    Menubar,
  },
};
</script>
