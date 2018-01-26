import RouteGoverness from './RouteGoverness'

export default class AuthenticatedRouteGoverness extends RouteGoverness {
  guard (action, {next}) {
    return this.isAllowed(action) ? next() : next({name: 'auth.login'})
  }
}
