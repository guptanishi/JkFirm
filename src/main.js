import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VueGoodTablePlugin from 'vue-good-table';

// Modern fonts
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/fira-code/400.css';

// Modern design system
import './assets/modern-design-system.css';

// import the styles 
import 'vue-good-table/dist/vue-good-table.css';

Vue.use(VueGoodTablePlugin);

Vue.config.productionTip = false

// Suppress ResizeObserver loop error (harmless browser issue)
const resizeObserverErr = window.console.error;
window.console.error = (...args) => {
  if (args[0]?.includes?.('ResizeObserver loop')) {
    return;
  }
  resizeObserverErr(...args);
};

Vue.filter("upperCase", function (value) {
  if (!value) return "";
  return value.toUpperCase();

});
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
