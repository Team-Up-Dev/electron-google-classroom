const { ipcRenderer } = require("electron");
const { DisableDarkMode, EnableDarkMode } = require("./theme");

function eventFire(el, etype) {
  if ("FireEvent" in el) {
    el.fireEvent("on" + etype);
  } else {
    const evObj = document.createEvent("Events");
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

ipcRenderer.on("navigate:classroom", (e, href) => {
  if (location.host === "classroom.google.com") {
    if (location.pathname !== href)
      eventFire(document.querySelector(`a[href="${href}"]`), "click");
  }
});

ipcRenderer.on("theme:dark", () => {
  EnableDarkMode();
  ipcRenderer.send("theme:update", { enabled: true });
});
ipcRenderer.on("theme:light", () => {
  DisableDarkMode();
  ipcRenderer.send("theme:update", { enabled: false });
});
