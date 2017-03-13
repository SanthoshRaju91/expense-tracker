import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('landing', { path: '/' });
  this.route('admin', function() {
    this.route('main');
    this.route('create');
    this.route('view');
    this.route('profile');
  });
  this.route('register', { path: '/register' });
});

export default Router;
