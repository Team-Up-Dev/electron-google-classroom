const { app, BrowserWindow } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 300,
    minHeight: 300,
    center: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL("https://classroom.google.com");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
