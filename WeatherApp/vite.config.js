export default {
  server: {
    port: 3000,
    proxy: {
      "/api": {
        // target: "http://127.0.0.1:8000",
        target: "http://localhost:3000/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
};
