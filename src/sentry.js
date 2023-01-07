// Initialize Sentry (main process)
const path = require('path')

const DEBUG = (process.env.DEBUG === 'true')

const { app } = require('electron')
const Sentry = require('@sentry/electron/main')

// Configuration information
const { version } = require('../package.json')

console.log(`Process Type: ${process.type}`)

if (process.type !== 'renderer') {
  Sentry.init({
    dsn: "https://1bcf7b61a5424381ade5e36bafbb8fb5@o381889.ingest.sentry.io/4504464216162304",
    release: version,
    environment: !app.isPackaged ? 'development' : 'production',
    debug: true,
    enableUnresponsive: false,
    beforeSend: function (event, hint) {
      // tags
      if (event.platform === 'node' && event.request === undefined && event.message === undefined) {
        // main
        event.tags = { ...event.tags, module: 'main' }
      } else if (event.contexts.electron && event.contexts.electron.crashed_url && event.contexts.electron.crashed_url.includes('workers')) {
        // worker
        const url = new URL(event.contexts.electron.crashed_url)
        const pathnameParts = url.pathname.split('/')
        event.tags = { module: `worker:${pathnameParts[2]}`, ...event.tags }
      } else {
        // renderer
        event.tags = { module: 'main', ...event.tags }
      }

      // exceptions - mapped to string of key/value pair
      const exceptions = (event.exception && event.exception.values)
        ? event.exception.values.map(e => `${e.type}: ${e.value}`).join('. ')
        : (event.message) ? event.message : 'Unknown'

      if (DEBUG) {
        const { breadcrumbs, ...rest } = event
        console.log('from sentry.js', rest)
      }

      console.error(`Module [${event.tags.module}]. Event ID [${event.event_id}]. Exception: ${exceptions}`)
      return event
    }
  })

  Sentry.setTag('module', 'main')
}

module.exports = {
  Sentry
}
