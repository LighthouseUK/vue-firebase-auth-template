import { createPerimeter } from 'vue-kindergarten'

export default createPerimeter({
  purpose: 'admin',
  govern: {
    'can view' () {
      const canView = this.isAdmin()
      console.log(`[GOVERNOR]: User can view admin: '${canView}'`)
      return canView
    }
  },
  isAdmin () {
    return this.child.user && this.child.user.permissions.roles.hasOwnProperty('admin') && (this.child.user.permissions.roles.admin === true)
  }
})
