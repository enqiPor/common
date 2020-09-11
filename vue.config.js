module.exports = {
  publicPath: "./",
  lintOnSave: false, //关闭eslint
  outputDir: process.env.outputDir, 
  devServer: {
          proxy: {
              '/api': {
                  // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
                  target: 'http://topic.ingcare.com/',
                  // 允许跨域
                  changeOrigin: true,
                  ws: true,
                  pathRewrite: {
                      '^/api': ''
                  }
              }
          }
      }
};