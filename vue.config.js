module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      title: "SampleApplication"
    },
  },
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:8081",
      },
    },
  },
};
