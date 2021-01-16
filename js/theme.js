const Darker = require("darkreader");

Darker.setFetchMethod(window.fetch);

const EnableDarkMode = () => void Darker.enable();
const DisableDarkMode = () => void Darker.disable();

module.exports = {
  EnableDarkMode,
  DisableDarkMode,
};
