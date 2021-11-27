const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { setMainMenu } = require("./main-menu");

const windows = [];

function sendWindowCount() {
  windows.forEach((win) => {
    win.webContents.send("window-count", { count: windows.length });
  });
}

function createWindow(opts) {
  const win = new BrowserWindow({
    webPreferences: { nodeIntegration: true, contextIsolation: false },
    show: false,
    ...opts,
  });

  win.loadFile(path.join(__dirname, "index.html"));
  win.on("ready-to-show", () => {
    win.show();
  });
  windows.push(win);
  win.on("close", () => {
    windows.splice(windows.indexOf(win), 1);
    sendWindowCount();
  });

  setMainMenu(win);
  return win;
}

app.on("ready", () => {
  createWindow();
  ipcMain.on("create-window", (_, props) => {
    createWindow(props);
  });
  ipcMain.on("get-window-count", sendWindowCount);
});
