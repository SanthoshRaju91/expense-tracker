import Ember from 'ember';

const {
  Route,
  inject
} = Ember;

export default Route.extend({

  /** authenticated service */
  authenticated: inject.service(),

  /**
  * Authenticating if the user is logged in & navigating
  * @method beforeModel
  */
  beforeModel() {
    let isAuthenticated = this.get('authenticated.isAuthenticated');

    if(isAuthenticated) {
      this.transitionTo('admin');
    } else {
      this.transitionTo('landing');
    }
  }
});
