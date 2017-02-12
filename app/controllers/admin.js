import Ember from 'ember';

const {
  Controller,
  inject
} = Ember;

export default Controller.extend({

  authenticated: inject.service(),

  actions: {
    authenticate() {
      this.set('authenticated.isAuthenticated', false);
      return true;
    }
  }
});
