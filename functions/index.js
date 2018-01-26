const functions = require('firebase-functions')
const admin = require('firebase-admin')
const paths = require('./paths')
// Initialise the database for use in handlers
admin.initializeApp(functions.config().firebase)
const baseRef = admin.database().ref(paths.versionPath)
// Import the handler functions now that firebase has been initialised
const authEvents = require('./auth-events')

// Auth event handlers
exports.createUserProfile = functions.auth.user().onCreate(event => {
  // We need to create a user profile when the user registers.
  return authEvents.createUserProfile(event, baseRef, admin)
})
// END Auth event handlers
