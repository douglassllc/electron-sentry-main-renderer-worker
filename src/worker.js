import Vue from 'vue'
import AppWorker from './AppWorker.vue'

Vue.config.productionTip = false

// Initialize Sentry
window.sentry.init({ module: 'worker', vueInstance: Vue })

new Vue({
  render: h => h(AppWorker),
}).$mount('#app-worker')
