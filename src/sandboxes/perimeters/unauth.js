import { createPerimeter } from 'vue-kindergarten'

export default createPerimeter({
  purpose: 'unauth',
  govern: {
    'can view' () {
      const canView = this.child.firebaseUser
      console.log(`[GOVERNOR]: User can view unauthenticated pages: '${!canView}'`)
      return canView
    }
  }
})
