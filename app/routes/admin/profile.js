import Ember from 'ember';
import { task } from 'ember-concurrency';

const {
  Route,
  inject
} = Ember;

export default Route.extend({

  /** ajax service injection */
  ajaxService: inject.service('ajax.service'),
  /** authenticated service */
  authenticated: inject.service(),

  /**
  * model hook for route get the user details if the user is authenticated / transition to login page
  * @method model
  */
  model() {
    let authenticated = this.get('authenticated');
    if(authenticated.isAuthenticated) {
      let { id:userId }= JSON.parse(authenticated.getUserDetails());
      return {
        user: this.get('getUserDetails').perform(userId)
      };
    } else {
      this.transitionTo('landing');
    }
  },

  /**
  * Get user details currency task
  * @method getUserDetails
  */
  getUserDetails: task(function * (userId = 1) {
    let ajaxService = this.get('ajaxService');

    let userDetails = yield ajaxService.invoke(`/users/${userId}`, 'GET');

    return userDetails;
  })
});
