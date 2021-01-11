const { app, screen, BrowserWindow, Menu } = require("electron");
const windowState = require("electron-window-state");
const path = require("path");

const { userAgent } = require("./js/config");
const { template } = require("./js/menu");

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

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
