import RouteGoverness from './RouteGoverness'

export default class UnAuthenticatedRouteGoverness extends RouteGoverness {
  guard (action, {next}) {
    // If the user is allowed to view the app then they are logged in; redirect them to home
    return this.isAllowed(action) ? next({name: 'root'}) : next()
  }
}
