const version = 'v0'
const commands = 'commands'
const users = 'users'
const userProfiles = 'profile'
const userPermissions = 'permissions'
const userRoles = 'roles'
const userAccountActivity = 'userAccountActivity'
const versionPath = `/${version}/`
const commandsPath = `/${commands}/`
const usersPath = `/${users}/`
const userProfilesPath = `/${userProfiles}/`
const userPermissionsPath = `/${userPermissions}/`
const userRolesPath = `/${userRoles}/`
const userAccountActivityPath = `/${userAccountActivity}/`
const userAccountActivityAbsolutePath = `/${version}/${userAccountActivity}/`
const usersAbsolutePath = `/${version}/${users}/`

module.exports = {
  version,
  commands,
  users,
  userProfiles,
  userPermissions,
  userRoles,
  versionPath,
  commandsPath,
  usersPath,
  userProfilesPath,
  userPermissionsPath,
  userRolesPath,
  userAccountActivityPath,
  userAccountActivityAbsolutePath,
  usersAbsolutePath
}
