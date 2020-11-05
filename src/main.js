import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './assets/scss/global.scss'
import router from './router/router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
