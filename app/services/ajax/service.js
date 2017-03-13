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
          'Authorization' : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNDg5Mzc4NjY4LCJleHAiOjE0ODkzOTMwNjh9.BAx8M24WPD4IThrTZMrbeMsdgZtTUhtHuPaKdUF8rxE`
        }
      }).then((response) => {
        if (response.success) {
          resolve(payload);
        }
      }, (failure) => {
        reject(failure);
      })
    });
  }
});
