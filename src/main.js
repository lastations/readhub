// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import { Tab, Tabs } from 'vant'
import { Col, Row } from 'vant';
import { Popup } from 'vant';
import { Icon } from 'vant';
import { Search } from 'vant';
import { Grid, GridItem } from 'vant';
import { Image as VanImage } from 'vant';


Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Col);
Vue.use(Row);
Vue.use(Popup);
Vue.use(Icon);
Vue.use(Search);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
