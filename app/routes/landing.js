import Ember from 'ember';

const {
  Route,
  inject
} = Ember;

export default Route.extend({
  /** authenticated service */
  authenticated: inject.service(),

  /**
  * Authenticate if the user is logged in
  * @method beforeModel
  */
  beforeModel() {
    let isAuthenticated = this.get('authenticated.isAuthenticated');
    //checking if the user is already is authenticated
    if(isAuthenticated) {
      this.transitionTo('admin');
    }
  },

  /**
  * Model to return landing page content
  * @method model
  */
  model() {
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

    let media = [{
      link: '',
      icon: 'fa-facebook-official',
      class: 'facebook'
    }, {
      link: '',
      icon: 'fa-twitter-square',
      class: 'twitter'
    }, {
      link: '',
      icon: 'fa-instagram',
      class: 'instagram'
    }, {
      link: '',
      icon: 'fa-google-plus',
      class: 'google'
    }];

    return {
      steps,
      assistance,
      media
    };
  }
});
