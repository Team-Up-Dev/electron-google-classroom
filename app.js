const { app, screen, BrowserWindow } = require("electron");
const windowState = require("electron-window-state");
const path = require("path");

const { userAgent } = require("./utils/config");

let mainWindow;

function createWindow() {
  const { workAreaSize } = screen.getPrimaryDisplay();

  const mainWindowState = windowState({
    defaultWidth: workAreaSize.width - 200,
    defaultHeight: workAreaSize.height - 100,
  });

  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 300,
    minHeight: 300,
    center: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
    },
    icon: path.join(__dirname, "icons/png/64x64.png"),
  });

  mainWindowState.manage(mainWindow);

  mainWindow.loadURL("https://classroom.google.com", { userAgent });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
