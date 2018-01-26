// Auth Frontends
// Sync Imports
import Auth from '@/views/auth/Auth.vue'
import FirebaseAuth from '@/views/auth/FirebaseAuth.vue'
import Logout from '@/views/auth/Logout.vue'
import Unauthorized from '@/views/auth/Unauthorized.vue'
import OnBoard from '@/views/auth/OnBoard.vue'
import UnAuthPerimeter from '@/sandboxes/perimeters/unauth'
import AuthenticatedRouteGoverness from '@/sandboxes/governesses/AuthenticatedRouteGoverness'
import UnAuthenticatedRouteGoverness from '@/sandboxes/governesses/UnAuthenticatedRouteGoverness'

export default {
  path: '/auth',
  component: Auth,
  children: [
    {
      path: '/login',
      name: 'auth.login',
      component: FirebaseAuth,
      meta: {
        governess: UnAuthenticatedRouteGoverness,
        perimeter: UnAuthPerimeter,
        perimeterAction: 'view'
      }
    },
    {
      path: '/logout',
      name: 'auth.logout',
      component: Logout,
      meta: {
        governess: AuthenticatedRouteGoverness
      }
    },
    {
      path: '/unauth',
      name: 'auth.unauthorized',
      component: Unauthorized
    },
    {
      path: '/onboard',
      name: 'auth.onboard',
      component: OnBoard
    }
  ]
}
