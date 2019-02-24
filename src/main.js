import ElementUI from 'element-ui'
import Vuetify from 'vuetify'
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
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$axios = axios// 全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs// 全局注册，使用方法为:this.qs
// Vue.use(axios)
Vue.use(ElementUI)
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.use(VueQuillEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
