import Ember from 'ember';

const {
  Route,
  inject
} = Ember;

export default Route.extend({

  authenticated: inject.service(),

  renderTemplate(controller, model) {
    let isAuthenticated = this.get('authenticated.isAuthenticated');

    if(isAuthenticated) {
      this.render('admin', {
        outlet: 'main',
        controller: this.controllerFor('admin')
      });
    } else {
      this.render('landing', {
        outlet: 'main',
        controller: this.controllerFor('landing')
      });
    }
  },

  actions: {
    authenticate() {
      this.renderTemplate();
    }
  }

});
