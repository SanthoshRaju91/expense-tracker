import Ember from 'ember';

const {
  Route,
  inject
} = Ember;

export default Route.extend({

  /** ajax service inject */
  ajaxService: inject.service('ajax.service')
});
