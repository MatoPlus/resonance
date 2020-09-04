<template>
  <div id="menu-bar">
    <div class="left" role="menu">
      <button class="menubar-btn fa-button" id="menu-btn" @click="openMenu">
        <fa-icon id="menu-icon" :icon="['fas', 'bars']" />
      </button>
      <h5 id="title">Resonance</h5>
    </div>
    <div class="right">
      <button
        class="menubar-btn fa-button"
        id="minimize-btn"
        @click="minimizeWindow"
      >
        <fa-icon id="minimize-icon" :icon="['fas', 'window-minimize']" />
      </button>
      <button
        class="menubar-btn fa-button"
        id="max-unmax-btn"
        @click="maxUnmaxWindow"
      >
        <fa-icon id="max-unmax-icon" :icon="screenStateIcon" />
      </button>
      <button class="menubar-btn fa-button" id="close-btn" @click="closeWindow">
        <fa-icon id="close-icon" :icon="['fas', 'times']" />
      </button>
    </div>
  </div>
</template>

<script>
const { remote, ipcRenderer } = window.require("electron");

export default {
  name: "Menubar",
  data() {
    return {
      isMaximized: this.getCurrentWindow().isMaximized(),
    };
  },
  methods: {
    getCurrentWindow: function() {
      return remote.getCurrentWindow();
    },
    openMenu: function(e) {
      let x = e.x;
      let y = e.y;
      ipcRenderer.send(`display-app-menu`, { x, y });
    },
    minimizeWindow: function() {
      let browserWindow = this.getCurrentWindow();
      if (browserWindow.minimizable) {
        browserWindow.minimize();
      }
    },
    maximizeWindow: function() {
      let browserWindow = this.getCurrentWindow();
      if (browserWindow.maximizable) {
        browserWindow.maximize();
      }
    },
    unmaximizeWindow: function() {
      this.getCurrentWindow().unmaximize();
    },
    maxUnmaxWindow: function() {
      let browserWindow = this.getCurrentWindow();
      if (browserWindow.isMaximized()) {
        browserWindow.unmaximize();
      } else {
        browserWindow.maximize();
      }
      this.isMaximized = browserWindow.isMaximized();
    },
    closeWindow: function() {
      this.getCurrentWindow().close();
    },
  },
  computed: {
    screenStateIcon() {
      return this.isMaximized ? ["far", "clone"] : ["far", "square"];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
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
  color: white;
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
