import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import moment from 'moment'
import VueProgressBar from 'vue-progressbar'
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'

Vue.config.productionTip = false

const apiDateFormat = 'YYYY-MM-DD hh:mm:ss.SSSSSS'

Vue.mixin({
  methods: {
    formatDate (value) {
      if (value) {
        return moment(String(value), apiDateFormat).format('YYYY-MM-DD HH:mm')
      }
    },
    getDate (value) {
      if (value) {
        return moment(String(value), apiDateFormat).format('YYYY-MM-DD')
      }
    },
    getTime (value) {
      if (value) {
        return moment(String(value), apiDateFormat).format('hh:mm A')
      }
    },
    getDay (value) {
      if (value) {
        return moment(String(value)).format('D')
      }
    },
    getMonth (value) {
      if (value) {
        return moment(String(value)).format('M')
      }
    },
    getYear (value) {
      if (value) {
        return moment(String(value)).format('YYYY')
      }
    },
    friendlyDate (value) {
      if (value) {
        return moment(value, apiDateFormat).format('MMMM D, YYYY')
      }
    },
    todayDate() {
      return moment()
    },
    momentDate(value) {
      if (value) {
        return moment(value)
      }
    }
  }
})

Vue.filter('friendlyDate', function (value) {
  if (value) {
    return moment(String(value), apiDateFormat).format('MMMM D, YYYY')
  }
})

Vue.filter('currency', function (value) {
  if (value) {
    return "$" + Number(value).toLocaleString();
  }
})


Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})

Vue.component('vue-timepicker', VueTimepicker)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
