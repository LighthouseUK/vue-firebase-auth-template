import Vue from 'vue'
import Router from 'vue-router'
// Router modules
import AuthModule from './modules/auth'
// View Components
import SystemRoot from '@/views/core/SystemRoot.vue'
import AppRoot from '@/views/core/AppRoot.vue'
// Auth Imports
import { createSandbox } from 'vue-kindergarten'
import RouteGoverness from '@/sandboxes/governesses/RouteGoverness'
import AuthenticatedRouteGoverness from '@/sandboxes/governesses/AuthenticatedRouteGoverness'
import child from '@/sandboxes/child'
import BasePerimeter from '@/sandboxes/perimeters/base'

Vue.use(Router)

// This looks a little funky. We have a single parent route so that we can perform auth ops
// Nesting the root view allows us to redirect any pages that don't match to the default route.
// By nesting everything a further level we can use perimeter checking, courtesy of vue-kindergarten.
// Everything nested under the 'BaseView' component will be checked by vue-kindergarten to make sure there is a user,
// and that the user has permission to view the route.
const router = new Router({
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      component: SystemRoot,
      children: [
        {
          path: '',
          name: 'root',
          component: AppRoot,
          meta: {
            perimeter: BasePerimeter,
            governess: AuthenticatedRouteGoverness,
            perimeterAction: 'view'
          },
          children: [
            // This is where you would load in your own modules (as children so that vue-kindergarten can protect them)
          ]
        },
        AuthModule,
        {
          path: '*',
          name: 'default',
          redirect: {
            name: 'root'
          }
        }
      ]
    }
  ]
})

// TODO: this continues evaluating even after a check has been made; redundant?
router.beforeEach((to, from, next) => {
  const routeSandboxEvalFormatting = 'color: green;'
  const routeName = to.name ? to.name : to.path
  console.log(`[GOVERNOR]: %cEvaluating sandbox for route '${routeName}'`, routeSandboxEvalFormatting)
  if (!to.hasOwnProperty('matched')) {
    console.log('[GOVERNOR]: To route has no matches in the router.')
    return next()
  }
  to.matched.some((routeRecord) => {
    const perimeter = routeRecord.meta.perimeter
    const Governess = routeRecord.meta.governess || RouteGoverness
    const action = routeRecord.meta.perimeterAction || 'route'

    const routeMatchedConsoleFormatting = 'color: blue;'
    if (routeRecord.name) {
      console.log(`[GOVERNOR]: %cChecking matched route named '${routeRecord.name}' for sandbox`, routeMatchedConsoleFormatting)
    } else {
      console.log(`[GOVERNOR]: %cChecking matched route path '${routeRecord.path}' for sandbox`, routeMatchedConsoleFormatting)
    }

    if (perimeter) {
      console.log('[GOVERNOR]: %cFound sandbox; executing', routeSandboxEvalFormatting)
      const currentChild = child()
      const sandbox = createSandbox(currentChild, {
        governess: new Governess(),
        perimeters: [
          perimeter
        ]
      })

      return sandbox.guard(action, {to, from, next})
    }
    return next()
  })
})

export default router
