const { app, Menu, Tray, shell } = require("electron");
const { default: openAboutWindow } = require("about-window");
const path = require("path");

const appInfo = require("../package.json");
const { isDevelopment } = require("./config");
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

const template = (win) => {
  const navigate = (href) => win.webContents.send("navigate:classroom", href);

  const template = [
    {
      label: "Application",
      submenu: [
        { label: `About ${product_name}`, click: about },
        { type: "separator" },
        { role: "reload" },
        {
          label: "Source Code",
          click: () => {
            const repo = appInfo.repository.url;
            const url = repo.replace("git+", "").replace(".git", "");

            shell.openExternal(url);
          },
        },
        {
          label: "Report Bug",
          click: () => void shell.openExternal(appInfo.bugs.url),
        },
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
    {
      label: "Classroom",
      submenu: [
        {
          label: "Classes",
          click: () => navigate("/h"),
        },
        {
          label: "Calendar",
          click: () => navigate("/calendar/this-week/course/all"),
        },
        {
          label: "To-do",
          click: () => navigate("/a/not-turned-in/all"),
        },
        {
          label: "Archived classess",
          click: () => navigate("/h/archived"),
        },
        {
          label: "Settings",
          click: () => navigate("/s"),
        },
      ],
    },
  ];

  if (isDevelopment) {
    template.push({
      label: "Debug",
      submenu: [
        {
          role: "toggledevtools",
        },
      ],
    });
  }

  return template;
};

function createTray(mainWindow) {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click: () => void mainWindow.show(),
    },
    { type: "separator" },
    { label: "About App", click: about },
    {
      label: "Quit",
      click: () => {
        app.isQuiting = true;
        app.quit();
      },
    },
  ]);

  let tray = new Tray(path.join(__dirname, "..", "icons", "png", "24x24.png"));
  tray.setContextMenu(contextMenu);
  tray.setToolTip(product_name);

  return tray;
}

module.exports = { template, createTray };
