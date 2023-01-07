const path = require('path')

module.exports = {
  pages: {
    main: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Renderer',
      chunks: ['chunk-vendors', 'chunk-common', 'main']
    },
    worker: {
      entry: 'src/worker.js',
      title: 'Worker'
    }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      preload: './src/preload.js',
    }
  }
}
