const Store = require("electron-store");

const schema = {
  theme: {
    type: "string",
    enum: ["light", "dark"],
    default: "light",
  },
};

module.exports = new Store({ schema });
