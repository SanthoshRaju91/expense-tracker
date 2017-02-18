import Ember from 'ember';

const {
  Service,
  RSVP
} = Ember;

export default Service.extend({

  /** isAuthenticated */
  isAuthenticated: false,

  /**
  * Function to login the user and set the session
  * @method login
  * @param username & password
  */
  login(username, password) {
    return new RSVP.Promise((resolve, reject) => {
      if(username === 'sant' && password === '12') {
        this.set('isAuthenticated', true);
        Cookies.set('userId', username);
        resolve();
      } else {
        reject('username & password do not match');
      }
    });
  },

  /**
  * Function to logout the user and invalidate the session
  * @method logout
  */
  logout() {
    Cookies.remove('userId');
    this.set('isAuthenticated', false);
  },

  init() {
    this._super(...arguments);
    var userId = Cookies.get('userId');
    if(userId) {
      this.set('isAuthenticated', true);
    }
  }
});
