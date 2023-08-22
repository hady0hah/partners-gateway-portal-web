"use strict";

import Vue from 'vue';
import axios from "axios";
import store from '../store';
import router from '../router/index.js'
import endpoints from './endpoints';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

//let proxy = 'https://cors-anywhere.herokuapp.com/';

let config = {
  //baseURL: process.env.baseURL || process.env.apiUrl || "",
  // timeout: 60 * 1000, // Timeout
  //baseURL: "https://potech.obdev.net/api",
  // baseURL: "https://partners.thidesoft.com/api",
  baseURL: "https://partners-portal.obdev.net/api",
  withCredentials: false, // Check cross-site Access-Control,
  headers: {
    //'Content-Type': 'multipart/form-data'
    //'Access-Control-Allow-Origin': 'https://potech.obdev.net',
    //'wsse': 'UsernameToken Username="62260c148a8bf4.43316119", PasswordDigest="cU/lEiK6P6XkdvOiMvdcVBj0Jz9lRU4kLuGq5aLMN4LbiPrTwTB8dhDkDzcCAZrsRgwQX+5tleyDCtahj0JPKA==", Nonce="e4df606ff971c30967c3475b5d53293c", Created="2022-03-07 13:43:48"'
    //'x-wsse': store.getters.StateUser != null ? store.getters.StateUser.wsse : ''
  },
  endpoints: endpoints
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    if (store.getters.StateUser != null) {
      config.headers['x-wsse'] = store.getters.StateUser.wsse
    }

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    if (error.response.status == 403 && store.getters.StateUser != null) {
      router.push('/login')
      store.dispatch('StateLogout')
      alert("Session has expired please login again")
    }
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue/*, options*/) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
