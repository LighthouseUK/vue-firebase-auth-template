const env = {
  FIREBASE_CONFIG: {
    apiKey: '"adfoinadfhpinRPOwrpgaspfignpirnh"',
    authDomain: '"example-project-id.firebaseapp.com"',
    databaseURL: '"https://example-project-id.firebaseio.com"',
    projectId: '"example-project-id"',
    storageBucket: '"example-project-id.appspot.com"',
    messagingSenderId: '"356875498672"'
  },
  FIREBASE_VERSION: '"v0"'
}

module.exports = {
  build: {
    env: env
  },
  dev: {
    env: env
  }
}
