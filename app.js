const { app, screen, BrowserWindow, Menu, ipcMain } = require("electron");
const windowState = require("electron-window-state");
const path = require("path");

const { userAgent, isDevelopment } = require("./js/config");
const { template, createTray } = require("./js/menu");

let mainWindow;
let tray;

if (isDevelopment) {
  try {
    require("electron-reload")(__dirname, {
      electron: path.join(__dirname, "node_modules", ".bin", "electron"),
      hardResetMethod: "exit",
    });
  } catch (_) {}
}

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
    backgroundColor: "#FFF",
    webPreferences: {
      preload: path.join(__dirname, "js", "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, "icons/png/64x64.png"),
  });

  mainWindowState.manage(mainWindow);

  mainWindow.loadURL("https://classroom.google.com", { userAgent });

  const menu = Menu.buildFromTemplate(template(mainWindow));
  Menu.setApplicationMenu(menu);

  const lightMenu = menu.getMenuItemById("theme-light");
  const darkMenu = menu.getMenuItemById("theme-dark");

  tray = createTray(mainWindow);

  mainWindow.on("minimize", (event) => {
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on("close", (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }

    return false;
  });

  ipcMain.on("theme:update", (e, { enabled }) => {
    if (enabled) {
      lightMenu.enabled = true;
      darkMenu.enabled = false;
    } else {
      lightMenu.enabled = false;
      darkMenu.enabled = true;
    }
  });
}

const SingleInstance = app.requestSingleInstanceLock();

if (!SingleInstance) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (!mainWindow.isVisible()) mainWindow.show();
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(createWindow);

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}
