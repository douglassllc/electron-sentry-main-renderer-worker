import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Initialize Sentry
window.sentry.init({ module: 'renderer', vueInstance: Vue })

new Vue({
  render: h => h(App),
}).$mount('#app')
