import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

// shim
window.SpeechRecognition =
  // eslint-disable-next-line
  (window as any)['webkitSpeechRecognition'] || SpeechRecognition;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
