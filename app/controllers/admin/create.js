import Ember from 'ember';
import { task } from 'ember-concurrency';

const {
  Controller,
  inject
} = Ember;

export default Controller.extend({
  /** inject ajax service */
  ajaxService: inject.service('ajax.service'),
  /** group property */
  group: {},

  /**
  * Concurrency task to create group by making an Ajax call
  * @method create
  */
  create: task(function * (group) {
    let ajaxService = this.get('ajaxService');

    let response = yield ajaxService.invoke('/groups', 'POST', {
      group
    });

    alert(JSON.stringify(response));
  }).drop(),

  actions: {
    /**
    * Function handler to create a group
    * @method createGroup
    */
    createGroup() {

      let group = this.get('group');
      this.setProperties({
        'nameError': '',
        'descError': ''
      });

      if(!group.name || group.name.length < 6) {
        this.set('nameError', 'Group Name is required & min length is 6');
        return;
      }

      if(!group.description || group.description.length < 20) {
        this.set('descError', 'Group Description is required & min length is 20');
        return;
      }

      this.get('create').perform(group);
    }
  }
});
