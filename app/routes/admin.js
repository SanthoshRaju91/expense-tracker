import Ember from 'ember';

const {
  Route,
  inject
} = Ember;

export default Route.extend({
  /** authenticated service */
  authenticated: inject.service(),

  /**
  * Authenticating the route
  * @method beforeModel
  */
  beforeModel() {
    let authenticated = this.get('authenticated.isAuthenticated');
    if(!authenticated) {
      this.transitionTo('landing');
    } else {
      this.transitionTo('admin.main');
    }
  },

  model() {
    let navigation = [{
      link: 'admin.main',
      icon: 'fa-home',
      name: 'Home',
      class: 'col-lg-3 col-md-3',
      color: 'orange'
    }, {
      link: 'admin.create',
      icon: 'fa-plus',
      name: 'create',
      class: 'col-lg-3 col-md-3',
      color: 'green'
    }, {
      link: 'admin.view',
      icon: 'fa-file-text-o',
      name: 'View',
      class: 'col-lg-3 col-md-3',
      color: 'snuff'
    }, {
      link: 'admin.profile',
      icon: 'fa-user',
      name: 'profile',
      class: 'col-lg-3 col-md-3',
      color: 'confetti'
    }];

    return {
      navigation
    };
  }
});
