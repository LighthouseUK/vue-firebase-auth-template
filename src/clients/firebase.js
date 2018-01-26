import firebase from 'firebase'
// import * as firebase from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/database'
import firebaseui from 'firebaseui'

const logRequests = !!process.env.DEBUG_API
// TODO: use firebaseclient to get the paths to things, rather than formatting strings in components

class FirebaseClient {
  constructor (config, version) {
    this.firebaseInstance = firebase.initializeApp(config)
    const basePath = `/${version}/`
    this.firebaseBaseDbReadRef = this.firebaseInstance.database().ref(basePath)
    this.firebaseUser = null
    this.user = null
  }

  newRef (path) {
    return this.firebaseBaseDbReadRef.child(path)
  }

  newAbsoluteRef (path) {
    return this.firebaseInstance.database().ref(path)
  }

  newRefFromURL (absoluteURL) {
    return this.firebaseInstance.database().refFromURL(absoluteURL)
  }

  getSystemConfigRef () {
    return this.newRef('systemConfig')
  }

  getModuleConfigRef (module) {
    return this.newRef('moduleConfig').child(module)
  }

  getUserRef (userUID) {
    return this.newRef('users').child(userUID)
  }

  watchUser (cb) {
    const self = this
    return this.firebaseInstance.auth().onAuthStateChanged((user) => {
      // Store the user internally so that it can be consumed by third parties
      self.firebaseUser = user
      cb(user)
    })
  }

  logoutUser () {
    return this.firebaseInstance.auth().signOut()
  }

  fetch (child) {
    let self = this
    logRequests && console.log(`fetching ${child}...`)
    const cache = self.firebaseBaseDbReadRef.cachedItems
    if (cache && cache.has(child)) {
      logRequests && console.log(`cache hit for ${child}.`)
      return Promise.resolve(cache.get(child))
    } else {
      return new Promise((resolve, reject) => {
        self.firebaseBaseDbReadRef.child(child).once('value', snapshot => {
          const val = snapshot.val()
          // mark the timestamp when this item is cached
          if (val) val.__lastUpdated = Date.now()
          cache && cache.set(child, val)
          logRequests && console.log(`fetched ${child}.`)
          resolve(val)
        }, reject)
      })
    }
  }

  fetchIdsByType (type) {
    let self = this
    return self.firebaseBaseDbReadRef.cachedIds && self.firebaseBaseDbReadRef.cachedIds[type]
      ? Promise.resolve(self.firebaseBaseDbReadRef.cachedIds[type])
      : fetch(`${type}stories`)
  }

  fetchItem (id) {
    let self = this
    return self.fetch(`item/${id}`)
  }

  fetchItems (ids) {
    let self = this
    return Promise.all(ids.map(id => self.fetchItem(id)))
  }

  watchList (type, cb) {
    let self = this
    let first = true
    const ref = self.firebaseBaseDbReadRef.child(`${type}stories`)
    const handler = snapshot => {
      if (first) {
        first = false
      } else {
        cb(snapshot.val())
      }
    }
    ref.on('value', handler)
    return () => {
      ref.off('value', handler)
    }
  }
}

let firebaseClient = new FirebaseClient(process.env.FIREBASE_CONFIG, process.env.FIREBASE_VERSION)
let firebaseUIClient = new firebaseui.auth.AuthUI(firebaseClient.firebaseInstance.auth())

export {
  firebaseClient,
  firebaseUIClient
}
