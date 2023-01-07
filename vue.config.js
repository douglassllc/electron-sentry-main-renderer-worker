const path = require('path')

module.exports = {
  pages: {
    /*
    worker: {
      // entry for the page
      entry: 'src/worker.js',
      // the source template
      template: 'public/worker.html',
      // output as dist/index.html
      filename: 'worker.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Worker',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      //chunks: ['chunk-vendors', 'chunk-common', 'index']
      chunks: ['worker']
    },
    */
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    //subpage: 'src/subpage/main.js'
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
  /*
  chainWebpack: (config) => {
      config.optimization.splitChunks(false)
      config.output.filename("[name].bundle.js")
      config.entryPoints.delete("app")
      config.entry("app").add("./src/main.js").end()
      config.entry("worker").add("./src/worker.js").end()
  },
  */
  /*
  configureWebpack: {
    entry: {
      worker: './src/worker.js'
    },
    output: {
      path: path.resolve(__dirname, '../dist/renderer'),
      filename: (chunkData) => {
        return '[name].bundle.js'
      }
    }
  },
  */
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      preload: './src/preload.js',
    }
  }
}
