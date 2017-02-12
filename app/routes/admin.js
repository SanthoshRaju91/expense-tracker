import Ember from 'ember';

const {
  Route,
  inject
} = Ember;

export default Route.extend({
  /** authenticated service */
  authenticated: inject.service(),

  /**
  * Authenticating the route
  * @method beforeModel
  */
  beforeModel() {
    let authenticated = this.get('authenticated.isAuthenticated');
    if(!authenticated) {
      this.transitionTo('landing');
    }
  }
});
