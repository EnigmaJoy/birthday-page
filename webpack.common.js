const path = require("path");

module.exports = {
  entry: {
    app: "./js/app.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "./js/[name].js",
  },

  module: {
    rules: [
      // SCSS -> CSS -> injected in <style>
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },

      // (opzionale ma utile) CSS puro
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
