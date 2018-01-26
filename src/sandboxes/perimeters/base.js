import { createPerimeter } from 'vue-kindergarten'

export default createPerimeter({
  purpose: 'base',
  govern: {
    'can view' () {
      const canView = this.child.firebaseUser !== null
      console.log(`[GOVERNOR]: User is logged in and can view root: '${canView}'`)
      return canView
    }
  },
  isAdmin () {
    return this.child.user.permissions.roles.hasOwnProperty('admin') && (this.child.user.permissions.roles.admin === true)
  }
})
