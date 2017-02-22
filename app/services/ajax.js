import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  host: 'https://cash-counter.herokuapp.com',
  namespace: '/api/v1'
});
