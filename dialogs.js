const { dialog, app, nativeImage } = require("electron");
const fs = require("fs");
const path = require("path");

function showMessage(browserWindow) {
  dialog.showMessageBox(
    browserWindow,
    {
      type: "info",
      icon: nativeImage.createFromPath("./screen.png"),
      message: "Hello",
      detail: "Just a friendly post",
      buttons: ["Woof", "Close"],
      defaultId: 0,
    },
    (i) => {
      console.log({ i });
    }
  );
}

async function showSaveDialog(browserWindow) {
  const { canceled, filePath } = await dialog.showSaveDialog(browserWindow, {
    defaultPath: path.join(app.getPath("downloads"), "memory-info.txt"),
  });

  if (canceled) {
    return;
  }

  const memInfo = JSON.stringify(await process.getProcessMemoryInfo());
  fs.writeFile(filePath, memInfo, "utf8", (err) => {
    if (err != null) {
      dialog.showErrorBox("Save Failed", err.message);
    }
  });
}

async function showOpenDialog(browserWindow) {
  const { canceled, filePaths } = await dialog.showOpenDialog(browserWindow, {
    defaultPath: app.getPath("downloads"),
    filters: [{ name: "Text Files", extensions: ["txt"] }],
  });

  if (canceled) {
    return;
  }

  const content = filePaths.map((path) => fs.readFileSync(path, "utf8"));
  console.log({ filePaths, content });
}

module.exports = {
  showMessage,
  showSaveDialog,
  showOpenDialog,
};
