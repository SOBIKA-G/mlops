const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/predict',  // Specify the endpoint you want to proxy
    createProxyMiddleware({
      target: 'http://localhost:5000',  // Specify the URL of your Flask backend
      changeOrigin: true,
    })
  );
};
