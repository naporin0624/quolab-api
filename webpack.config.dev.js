const merge = require("merge");
const config = require("./webpack.config");

module.exports = merge(config, {
  watch: true,
  mode: "development",
});
