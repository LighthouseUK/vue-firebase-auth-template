<template>
  <div id="system-root">
    <loading v-if="!systemLoaded" :invert="true" :loadingMessage="systemLoadingMessage" :fullScreen="true"></loading>
    <loading v-else-if="userLoading" :invert="true" :loadingMessage="userLoadingMessage" :fullScreen="true"></loading>
    <template v-else>
      <router-view v-on:logoutUser="logoutUser" :firebaseUser="firebaseUser" :user="user" :systemConfig="systemConfig"></router-view>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'system-root',
    data () {
      return {
        loadingFirebaseUser: false,
        firebaseUser: null,
        loadingUser: false,
        user: null,
        userRef: null,
        systemConfig: null,
        systemConfigStatus: 0
      }
    },
    created () {
      this.initSystem()
    },
    computed: {
      systemLoaded () {
        return this.firebaseUserLoaded && this.systemConfigLoaded
      },
      systemConfigLoaded () {
        return this.systemConfigStatus === 2
      },
      firebaseUserLoaded () {
        return !this.loadingFirebaseUser
      },
      userLoaded () {
        return !this.loadingFirebaseUser && !this.loadingUser && this.user
      },
      userLoading () {
        return !this.loadingFirebaseUser && this.firebaseUser && !this.user
      },
      systemLoadingMessage () {
        switch (this.systemConfigStatus) {
          case -1:
            return 'Failed to load system config'
          case 0:
          case 1:
            return 'Loading system config...'
          case 2:
            return 'Loading complete!'
        }
      },
      userLoadingMessage () {
        if (this.userLoaded) {
          return 'User profile loaded!'
        } else {
          return 'Loading your user profile'
        }
      }
    },
    methods: {
      reset () {
        this.loadingFirebaseUser = false
        this.firebaseUser = null
        this.loadingUser = false
        this.user = null
        this.userRef = null
      },
      initSystem () {
        console.log('[SYSTEM_ROOT]: Initializing system config and loading user')
        this.loadSystemConfig()
        this.loadUser()
      },
      loadSystemConfig () {
        // We don't need an unwatcher here because the system config will be the same for everyone
        // Even if a user is logged out, the config will be the same. When the page closes the watchers
        // are automatically removed.
        // Set loading status
        const self = this
        this.systemConfigStatus = 1
        const systemConfigRef = this.$firebaseClient.getSystemConfigRef()
        systemConfigRef.on('value', (systemConfigSnapshot) => {
          console.log('[SYSTEM_ROOT]: Loaded system config')
          // Update the systemConfig value
          self.systemConfig = systemConfigSnapshot.val()
          // Set status to loaded
          self.systemConfigStatus = 2
        }, error => {
          self.systemConfigStatus = -1
          console.error(`[SYSTEM_ROOT]: ${error}`)
        })
      },
      loadUser () {
        const self = this
        self.loadingFirebaseUser = true
        // Store the firebase auth watcher so we can disable it later/on logout
        this.$firebaseClient.watchUser((firebaseUser) => {
          console.log('[SYSTEM_ROOT]: Firebase user changed')
          self.firebaseUser = firebaseUser
          this.$firebaseClient.firebaseUser = firebaseUser
          // If there is a user, attempt to load them from the database
          if (firebaseUser) {
            console.log('[SYSTEM_ROOT]: Firebase user present; loading user')
            // Set user loading to true
            self.loadingUser = true
            // Get the userRef
            const userRef = this.$firebaseClient.getUserRef(firebaseUser.uid)
            self.userRef = userRef
            // Watch the userRef for changes. Store the watcher so we can disable it.
            userRef.on('value', snapshot => {
              // When the user changes, update the stored value
              const user = snapshot.val()
              self.user = user
              // Store the user in the firebase client so that it can be consumed by third parties e.g.
              // vue-kindergarten
              this.$firebaseClient.user = user
              // Even if the user value is empty, we have finished loading so set load flag to false
              self.loadingUser = false
            }, error => {
              console.error(`[SYSTEM_ROOT]: ${error}`)
            })
          } else {
            // No user found
            console.log('[SYSTEM_ROOT]: No Firebase user found; redirecting to login')
            // Reset the stored values because the user no longer exists
            self.reset()
            // Handle redirect to login
            let continueArgs = {}
            if (self.$route.name !== 'auth.logout' && self.$route.name !== 'auth.login') {
              continueArgs = {continueUrl: self.$route.fullPath}
            }
            self.$router.push({name: 'auth.login', query: continueArgs})
          }
          self.loadingFirebaseUser = false
        })
      },
      logoutUser () {
        const self = this
        console.log('[SYSTEM_ROOT]: Logging out user')
        this.$firebaseClient.logoutUser()
          .then(() => {
            try {
              self.userRef.off()
            } catch (e) {
              console.log('[SYSTEM_ROOT]: Error while unwatching user: ' + e)
            }
            self.reset()
            console.log('[SYSTEM_ROOT]: User successfully signed out')
          })
          .catch((error) => {
            console.log('[SYSTEM_ROOT]: Failed to logout user' + error)
          })
      }
    }
  }
</script>

<style lang="scss">
</style>
