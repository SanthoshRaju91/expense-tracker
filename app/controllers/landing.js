import Ember from 'ember';
import {
  task,
  timeout
} from 'ember-concurrency';

const {
  Controller,
  inject,
  String: {
    htmlSafe
  }
} = Ember;

export default Controller.extend({
  /** showLoginModal proeprty */
  showLoginModal: false,
  /** authenticated service */
  authenticated: inject.service(),

  /**
   * init controller hook
   * @method init
   */
  init() {
    this._super(...arguments);
  },

  /**
   * Function to login the user
   * @method login
   * @param username password
   */
  login: task(function*(username, password) {
    yield timeout(1000);

    let authenticated = this.get('authenticated');

    authenticated.login(username, password)
      .then((response) => {
        this.set('showLoginModal', false);
        this.transitionToRoute('admin');
      }, (error) => {
        this.set('errorMsg', htmlSafe(error.messages.join('<br/>')));
      })
  }).drop(),

  actions: {

    /**
     * Function to show login model for the user to login
     * @method showLogin
     */
    showLogin() {
      this.toggleProperty('showLoginModal');
    },

    /**
     * Function to toggle the showLoginModal property
     * @method toggleModal
     */
    toggleModal() {
      this.toggleProperty('showLoginModal');
    },

    /**
     * Function to navigate the user to register route
     * @method register
     */
    register() {
      this.set('showLoginModal', false);
      this.transitionToRoute('register');
    }
  }
});
