import Ember from 'ember';

const {
  Service,
  RSVP,
  inject
} = Ember;



export default Service.extend({

  /** isAuthenticated */
  isAuthenticated: false,
  /** ajax service */
  ajax: inject.service(),
  /**
   * Function to login the user and set the session
   * @method login
   * @param username & password
   */
  login(email, password) {
    return new RSVP.Promise((resolve, reject) => {

      let payload = {
        user: {
          email,
          password
        }
      };

      this.get('ajax').request('/user/signin', {
        method: 'POST',
        data: payload
      }).then((response) => {
        if (response.success) {
          let {
            data
          } = response;

          this.set('isAuthenticated', true);
          // setting the cookies
          Cookies.set('userId', data.id);

          //saving user details in local storage
          localStorage.setItem('user', data);

          resolve(response);
        }
      }, (failure) => {
        reject(failure.errors[0].detail);
      });
    });
  },

  /**
   * Function to logout the user and invalidate the session
   * @method logout
   */
  logout() {
    Cookies.remove('userId');
    localStorage.removeItem('user');
    this.set('isAuthenticated', false);
  },

  /**
   * init service hook, checking if the user is authenticated
   * @method init
   */
  init() {
    this._super(...arguments);
    let userId = Cookies.get('userId');
    let user = localStorage.getItem('user');
    if (userId && user) {
      this.set('isAuthenticated', true);
    }
  },

  /**
   * Function to register the user via ajax register service
   * @method register
   * @param payload
   */
  register(payload) {
    return new RSVP.Promise((resolve, reject) => {
      this.get('ajax').request('/users', {
        method: 'POST',
        data: payload
      }).then((response) => {
        if (response.success) {
          this.set('isAuthenticated', true);

          let {
            data
          } = response;

          // setting the cookie
          let userId = `${data.id}`;
          Cookies.set('userId', userId);

          // saving user data in local storage
          localStorage.setItem('user', data);

          resolve(response);
        }
      }, (failure) => {
        reject(failure);
      });
    });
  }
});
