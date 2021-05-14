const PROXY_CONFIG = {
  "/content/*": {
    target: "https://genshin-wishes.com",
    secure: false,
    logLevel: "debug",
  },
  "/api/*": {
    target: "http://localhost:8080",
    secure: false,
    logLevel: "debug",
    pathRewrite: { "^/api": "" },
    changeOrigin: true,
  },
};

module.exports = PROXY_CONFIG;
