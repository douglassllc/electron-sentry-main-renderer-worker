// Initialize Sentry (renderer's)
const DEBUG = (process.env.DEBUG === 'true')
const isDev = process.env.NODE_ENV === 'development' || DEBUG

console.log('Preload initializing...')

const { ipcRenderer } = require('electron')
// const Sentry = require('@sentry/vue')
const vueInit = require('@sentry/vue').init
// const Sentry = require('@sentry/electron')
const Sentry = require('@sentry/electron/renderer')
require('@sentry/electron/preload')

// Configuration information
const { version } = require('../package.json')

//const initSentry = ({ module = 'unassigned', vueInstance = null, vueRouter = null }) => {
const initSentry = ({ module = 'unassigned', vueInstance = null }) => {
  Sentry.init({
    Vue: vueInstance,
    dsn: "https://1bcf7b61a5424381ade5e36bafbb8fb5@o381889.ingest.sentry.io/4504464216162304",
    release: version,
    environment: isDev ? 'development' : 'production',
    debug: true,
    enableUnresponsive: false,
    /*
     * an attempt on getting better logging of Vue issues
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(vueRouter),
        tracePropagationTargets: ["localhost", /^\//],
      }),
    ],
    */
    beforeSend: async function (event, hint) {
      // extras
      const systemInformation = { test: true }
      event.extra = { ...event.extra, 'System Information': systemInformation }

      if (DEBUG) {
        const { breadcrumbs, ...rest } = event
        console.log('from preload.js', rest)
      }

      return event
    }
  //})
  }, vueInit)

  Sentry.setTag('module', (module === 'renderer') ? module : `worker:${module}`)

  /*
   * Original way I was setting tags
  setImmediate(() => {
    Sentry.configureScope(scope => {
      scope.setTag('module', (module === 'renderer') ? module : `worker:${module}`)
    })
  })
  */
}

// Set global scope instances
window.isDev = isDev

window.sentry = {
  getInstance: Sentry,
  init: initSentry
}

console.log('Preload initializing... Done!')
