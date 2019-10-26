const merge = require("merge");
const config = require("./webpack.config");

module.exports = merge(config, {
  mode: "production",
  optimization: {
    minimize: false,
  },
});
