import Ember from 'ember';

const {
  Service
} = Ember;

export default Service.extend({

  /** isAuthenticated */
  isAuthenticated: false,

  /**
  * Function to login the user and set the session
  * @method login
  * @param username & password
  */
  login() {

  },

  /**
  * Function to logout the user and invalidate the session
  * @method logout
  */
  logout() {

  }
});
