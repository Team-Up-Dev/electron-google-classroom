const { app, Menu, Tray } = require("electron");
const { default: openAboutWindow } = require("about-window");
const path = require("path");

const appInfo = require("../package.json");
const product_name = "Google Classroom Desktop";

const about = () => {
  openAboutWindow({
    product_name,
    icon_path: `${__dirname}/../icons/png/512x512.png`,
    package_json_dir: `${__dirname}/../`,
    bug_report_url: appInfo.repository.report,
    license: appInfo.license,
    win_options: {
      titleBarStyle: "hidden",
      resizable: false,
      open_devtools: true,
    },
  });
};

const template = [
  {
    label: "Application",
    submenu: [
      { label: `About ${product_name}`, click: about },
      { type: "separator" },
      {
        label: "Quit",
        accelerator: "CmdOrCtrl+Q",
        click: () => {
          app.isQuiting = true;
          app.quit();
        },
      },
    ],
  },
];

function createTray(mainWindow) {
  const contextMenu = Menu.buildFromTemplate([
    { label: "About App", click: about },
    { type: "separator" },
    {
      label: "Show App",
      click: () => void mainWindow.show(),
    },
    {
      label: "Quit",
      click: () => {
        app.isQuiting = true;
        app.quit();
      },
    },
  ]);

  tray = new Tray(path.join(__dirname, "..", "icons", "png", "24x24.png"));
  tray.setContextMenu(contextMenu);
  tray.setToolTip(product_name);
}

module.exports = { template, createTray };
