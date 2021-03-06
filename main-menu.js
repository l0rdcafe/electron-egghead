const { app, Menu } = require("electron");
const { showMessage, showSaveDialog, showOpenDialog } = require("./dialogs");

function setMainMenu(mainWindow) {
  const template = [
    {
      label: app.getName(),
      submenu: [
        {
          label: "Say Hello",
          click() {
            showMessage(mainWindow);
          },
        },
        {
          label: "Save Memory Usage Info",
          click() {
            showSaveDialog(mainWindow);
          },
        },
        {
          label: "Open File",
          click() {
            showOpenDialog(mainWindow);
          },
        },
        { type: "separator" },
        { role: "quit" },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

module.exports = {
  setMainMenu,
};
