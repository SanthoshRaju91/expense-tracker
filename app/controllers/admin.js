import Ember from 'ember';

const {
  Controller,
  inject
} = Ember;

export default Controller.extend({

  /** authenticated service */
  authenticated: inject.service(),

  actions: {

    /**
    * Function to logout the user
    * @method logout
    */
    logout() {
      let authenticated = this.get('authenticated');
      authenticated.logout();
      this.transitionToRoute('landing');
    }
  }
});
