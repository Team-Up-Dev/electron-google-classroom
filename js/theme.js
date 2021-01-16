const Darker = require("darkreader");

Darker.setFetchMethod(window.fetch);

const EnableDarkMode = () => void Darker.enable({ brightness: 100 + 10 });
const DisableDarkMode = () => void Darker.disable();

module.exports = {
  EnableDarkMode,
  DisableDarkMode,
};
