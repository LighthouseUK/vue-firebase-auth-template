import Vue from 'vue'
import App from './App'
import router from './router'
import Working from '@/components/core/Working'
import Loading from '@/components/core/Loading'
// Firebase
import {firebaseClient, firebaseUIClient} from '@/clients/firebase'
// Perimeter checking
import VueKindergarten from 'vue-kindergarten'
import child from '@/sandboxes/child'

Vue.config.productionTip = false

Vue.component('loading', Loading)
Vue.component('working', Working)

// I don't like how this loads the user. The firebase client shouldn't know about the
// system user, but it's the cleanest way I've found so far. Ideally we could load the
// user from the vue instance somehow
Vue.use(VueKindergarten, {
  child
})

Vue.prototype.$firebaseClient = firebaseClient
Vue.prototype.$firebaseUIClient = firebaseUIClient

// Makes it easy to develop the first loading animation on index.html
const enable = 1
/* eslint-disable no-new */
if (enable === 1) {
  new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })
}
