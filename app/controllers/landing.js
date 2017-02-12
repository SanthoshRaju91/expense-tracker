import Ember from 'ember';

const {
  Controller,
  inject
} = Ember;

export default Ember.Controller.extend({

  authenticated: inject.service(),

  init() {
    this._super(...arguments);
    let steps = [{
      text: 'Login to the app',
      icon: 'fa-circle-thin'
    },{
      text: 'Create a group / event',
      icon: 'fa-circle-thin'
    }, {
      text: 'Add friends / colleagues',
      icon: 'fa-circle-thin'
    }, {
      text: 'Add your expenses',
      icon: 'fa-circle-thin'
    }, {
      text: 'Enjoy your trip without having to divide them.',
      icon: 'fa-circle-thin'
    }];

    let assistance = [{
      text: 'Call us on 1800-000-0000',
      icon: 'fa-phone'
    }, {
      text: 'Send us an email on support@expense.com',
      icon: 'fa-envelope-o'
    }, {
      text: 'Raise a request, our support staff will get back to you.',
      icon: 'fa-question-circle-o'
    }];

    this.set('steps', steps);
    this.set('assistance', assistance);
  },

  actions: {
    authenticate() {
      this.set('authenticated.isAuthenticated', true);
      return true;
    }
  }
});
