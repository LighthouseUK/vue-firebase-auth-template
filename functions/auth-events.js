const paths = require('./paths')

exports.createUserProfile = function (event, baseRef, admin) {
  // Strangely, the firebaseUI registration has to make a separate call to the user API to set the displayName
  // We add a slight delay here to make sure the call is complete
  console.log('New user created; pausing to let user displayName update.')
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('displayName should be updated now; Fetching user data.')

      resolve(admin.auth().getUser(event.data.uid).then((userRecord) => {
        console.info('Got user Data; creating profile.')
        const userUID = userRecord.uid
        const updates = {}
        const newActivityKey = baseRef.child(paths.userAccountActivityPath).child(userUID).push().key

        // Save the user profile details
        updates[`${paths.usersPath}${userUID}${paths.userProfilesPath}`] = {
          displayName: userRecord.displayName || '',
          email: userRecord.email
        }
        // Create the default user permissions
        updates[`${paths.usersPath}${userUID}/${paths.userPermissions}/${paths.userRoles}`] = {
          roleList: ['User'],
          prettyRoles: 'User',
          admin: false,
          user: true,
          sysadmin: false
        }
        // Start a new activity log for the user account
        updates[`${paths.userAccountActivityPath}${userUID}/${newActivityKey}`] = {
          initiator: {
            uid: userUID,
            email: userRecord.email
          },
          description: 'User account created',
          timestamp: admin.database.ServerValue.TIMESTAMP
        }
        // Commit the updates to the database
        return baseRef.update(updates)
      }))
    }, 3 * 1000)
  })
}
