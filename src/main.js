import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VueGoodTablePlugin from 'vue-good-table';

// import the styles 
import 'vue-good-table/dist/vue-good-table.css';

Vue.use(VueGoodTablePlugin);

Vue.config.productionTip = false

Vue.filter("upperCase", function (value) {
  if (!value) return "";
  return value.toUpperCase();

});
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
