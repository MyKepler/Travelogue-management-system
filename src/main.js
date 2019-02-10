// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import ElementUI from 'element-ui'
import Vuetify from 'vuetify'
// import mavonEditor from 'mavon-editor'
// import Simditor from 'simditor'
// import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import axios from 'axios'
// Vue.use(axios)
Vue.use(ElementUI)
Vue.use(Vuetify)
Vue.config.productionTip = false
// var mavonEditor = require('mavon-editor')
// Vue.use(mavonEditor)
// Vue.use(Simditor)
Vue.use(VueQuillEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
