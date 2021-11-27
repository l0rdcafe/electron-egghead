const { ipcRenderer, BrowserWindow } = require("electron");

const versionElm = document.querySelector("#version");
const countElm = document.querySelector("#count");

versionElm.innerText = process.versions.electron;
document.querySelector("#new-window").addEventListener("click", () => {
  ipcRenderer.send("create-window", { x: 0, y: 0 });
});

ipcRenderer.on("window-count", (_, props) => {
  countElm.textContent = props.count;
  console.log(BrowserWindow.getFocusedWindow());
});

ipcRenderer.send("get-window-count");
