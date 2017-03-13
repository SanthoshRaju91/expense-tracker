import Ember from 'ember';

const {
  Service,
  inject,
  RSVP: {
    Promise
  }
} = Ember;

export default Service.extend({

  /** ajax service injection */
  ajax: inject.service(),

  /**
   * invoke ajax method
   * @method invoke
   * @param api - URL, method - http verb, payload - payload
   */
  invoke(api, method, payload = {}) {
    let ajax = this.get('ajax');
    let token = localStorage.getItem('token');

    return new Promise((resolve, reject) => {
      ajax.request(api, {
        method,
        contentType: 'application/json',
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      }).then((response) => {
        if (response.success) {
          resolve(payload);
        }
      }, (failure) => {
        reject(failure);
      });
    });
  }
});
