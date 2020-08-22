<template>
  <div id="app">
    <div id="menu-bar">
      <div class="left" role="menu">
        <button class="menubar-btn" id="menu-btn">
          <i class="fas fa-bars"></i>
        </button>
        <h5>Resonance</h5>
      </div>
      <div class="right">
        <button class="menubar-btn" id="minimize-btn">
          <i class="fas fa-window-minimize"></i>
        </button>
        <button class="menubar-btn" id="max-unmax-btn">
          <i class="far fa-square"></i>
        </button>
        <button class="menubar-btn" id="close-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
body {
  padding: 0;
  margin: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: white;
}

#menu-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  background: #34475a;
  -webkit-app-region: drag;
}

#menu-bar > div {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menubar-btn {
  -webkit-app-region: no-drag;
}

.container {
  height: calc(100vh - 30px);
  background: #34475ab0;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
}

button {
  height: 100%;
  padding: 0 15px;
  border: none;
  background: transparent;
  outline: none;
}

button:hover {
  background: rgba(221, 221, 221, 0.2);
}

#close-btn:hover {
  background: rgb(255, 0, 0);
}

button i {
  color: white;
}
</style>

<script>
  export default {
    created() {
      window.addEventListener("DOMContentLoaded", () => {
        const menuButton = document.getElementById("menu-btn");
        const minimizeButton = document.getElementById("minimize-btn");
        const maxUnmaxButton = document.getElementById("max-unmax-btn");
        const closeButton = document.getElementById("close-btn");

        menuButton.addEventListener("click", (e) => {
          // Opens menu at (x,y) coordinates of mouse click -
          // - on the hamburger icon.
          window.openMenu(e.x, e.y);
        });

        minimizeButton.addEventListener("click", () => {
          window.minimizeWindow();
        });

        maxUnmaxButton.addEventListener("click", () => {
          const icon = maxUnmaxButton.querySelector("i.far");

          window.maxUnmaxWindow();

          // Change the middle maximize-unmaximize icons.
          if (window.isWindowMaximized()) {
            icon.classList.remove("fa-square");
            icon.classList.add("fa-clone");
          } else {
            icon.classList.add("fa-square");
            icon.classList.remove("fa-clone");
          }
        });

        closeButton.addEventListener("click", () => {
          window.closeWindow();
        });
      });
    }
  }
</script>
