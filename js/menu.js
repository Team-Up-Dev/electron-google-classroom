const { default: openAboutWindow } = require("about-window");

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
      { label: "Quit", accelerator: "CmdOrCtrl+Q", role: "quit" },
    ],
  },
];

module.exports = { template };
