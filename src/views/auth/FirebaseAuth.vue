<template>
  <div>
    <loading v-show="uiLoading"></loading>
    <div id="firebaseui-auth-container" v-show="!uiLoading"></div>
    <div id="outdated"></div>
  </div>
</template>

<script>
  // import {firebaseUIClient} from '@/clients/firebase'
  import firebase from 'firebase'
  import firebaseui from 'firebaseui'
  import Loading from '@/components/core/Loading'

  export default {
    name: 'firebase-auth',
    props: {
      firebaseUser: {
        required: true
      },
      systemConfig: {
        type: Object,
        required: true
      }
    },
    components: {
      Loading
    },
    data () {
      return {
        uiLoading: true
      }
    },
    created () {
      if (this.firebaseUser) {
        console.log('[FIREBASE_AUTH]: There is already a logged in user; we should redirect')
        this.redirectOnLogin()
      }
    },
    mounted () {
      let self = this
      let uiConfig = {
        callbacks: {
          signInSuccess: (currentUser, credential, redirectUrl) => {
            return false
          },
          uiShown: () => {
            console.log('[FIREBASE_AUTH]: Firebase UI widget ready')
            self.uiLoading = false
          }
        },
        signInSuccessUrl: '/',
        signInOptions: [
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true
          }
        ],
        credentialhelper: firebaseui.auth.CredentialHelper.NONE
      }
      this.$firebaseUIClient.start('#firebaseui-auth-container', uiConfig)
    },
    methods: {
      redirectOnLogin () {
        if (this.firebaseUser) {
          console.log('[FIREBASE_AUTH]: User account logged in')
          if (this.$router.currentRoute.query.continueUrl) {
            console.log('[FIREBASE_AUTH]: Continue URL supplied; redirecting after login')
            this.$router.push(this.$router.currentRoute.query.continueUrl)
          } else {
            this.$router.push({name: 'root'})
          }
        } else {
          console.log('[FIREBASE_AUTH]: Firebase user missing; aborting redirect')
        }
      }
    },
    watch: {
      firebaseUser () {
        this.redirectOnLogin()
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../node_modules/firebaseui/dist/firebaseui.css";
</style>
