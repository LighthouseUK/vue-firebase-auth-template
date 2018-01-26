const env = {
  FIREBASE_CONFIG: {
    apiKey: '"adfoinadfhpinRPOwrpgaspfignpirnh"',
    authDomain: '"example-dev-project-id.firebaseapp.com"',
    databaseURL: '"https://example-dev-project-id.firebaseio.com"',
    projectId: '"example-dev-project-id"',
    storageBucket: '"example-dev-project-id.appspot.com"',
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
