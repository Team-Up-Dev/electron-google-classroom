const { ipcRenderer } = require("electron");
const { DisableDarkMode, EnableDarkMode } = require("./theme");

const updateOnlineStatus = () => {
  ipcRenderer.send(
    "online-status-changed",
    navigator.onLine ? "online" : "offline"
  );
};
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

ipcRenderer.on("theme:dark", () => void EnableDarkMode());
ipcRenderer.on("theme:light", () => void DisableDarkMode());

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);

updateOnlineStatus();
