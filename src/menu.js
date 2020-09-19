const { Menu, dialog, BrowserWindow } = require("electron");
const fs = require("fs");
const path = require("path");

const isMac = process.platform === "darwin";

const template = [
  {
    label: "File",
    submenu: [isMac ? { role: "close" } : { role: "quit" }],
  },
  // { role: 'editMenu' }
  {
    label: "Edit",
    submenu: [
      {
        label: "Add song",
        click: () => {
          dialog
            .showOpenDialog({
              properties: ["openFile"],
            })
            .then((result) => {
              if (result.canceled === false) {
                let fileName = result.filePaths[0].replace(/^.*[\\\/]/, "");
                fs.copyFile(
                  result.filePaths[0],
                  path.join(__dirname, "../public/playlist/" + fileName),
                  (err) => {
                    if (err) throw err;
                  }
                );
                BrowserWindow.getFocusedWindow().webContents.send("add-song", {
                  fileName,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        },
      },
      {
        label: "Select background image",
        click: () => {
          dialog
            .showOpenDialog({
              properties: ["openFile"],
            })
            .then((result) => {
              if (result.canceled === false) {
                fs.copyFile(
                  result.filePaths[0],
                  path.join(__dirname, "../public/background/background.jpg"),
                  (err) => {
                    if (err) throw err;
                  }
                );
              }
            })
            .catch((err) => {
              console.log(err);
            });
        },
      },
      { type: "separator" },
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
    ],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forcereload" },
      { role: "toggledevtools" },
      { type: "separator" },
      { role: "resetzoom" },
      { role: "zoomin" },
      { role: "zoomout" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
  // { role: 'windowMenu' }
  {
    label: "Window",
    submenu: [{ role: "minimize" }, { role: "zoom" }],
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://electronjs.org");
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

module.exports = {
  menu,
};
