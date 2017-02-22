import Ember from 'ember';
import {
  task,
  timeout
} from 'ember-concurrency';

const {
  Controller,
  set,
  get,
  inject,
  String: {
    htmlSafe
  }
} = Ember;

export default Controller.extend({
  /** authenticated service */
  authenticated: inject.service(),
  /**
   * init contoller hook
   * @method init
   */
  init() {
    this.set('formObject', {});
  },

  /**
   * Function to handler register click and make a service call to register the user
   * @method register
   */
  register: task( function * (form) {
    yield timeout(1000);
    let formObject = this.get('formObject');
    let formModel = {};
    form.map((current) => {
      if (current.model !== 'confirmPassword') {
        set(formModel, `${current.model}`, get(formObject, `${current.model}`));
      }
    });

    let testify = form.reduce((initial, current) => {
      return initial && !get(formObject, `${current.error}`);
    }, true);

    if (testify) {
      let authenticator = this.get('authenticated');

      // calling register service
      authenticator.register({
        user: formModel
      }).then((response) => {
        this.transitionToRoute('admin');
      }, (error) => {
        this.set('isError', true);
        this.set('errorMsg', htmlSafe(error.errors[0].detail.messages.join('<br/>')));
      });
    }
  }).drop(),

  actions: {
    /**
     * Function to handle cancel and route the user to landing page
     * @method cancel
     */
    cancel() {
      this.transitionToRoute('landing');
    },

    emailAddressValidate(config, e) {
      let value = e.target.value;
      let regex = new RegExp(config.regex, 'ig');
      let tested = regex.test(value);

      let form = this.get('formObject');
      set(form, `${config.model}`, value);

      if (tested) {
        set(form, `${config.error}`, false);
      } else {
        set(form, `${config.error}`, true);
      }
    },

    textValidate(config, e) {
      let value = e.target.value;
      let regex = new RegExp(config.regex, 'ig');
      let tested = regex.test(value);

      let form = this.get('formObject');
      set(form, `${config.model}`, value);

      if (tested) {
        set(form, `${config.error}`, false);
      } else {
        set(form, `${config.error}`, true);
      }
    },

    numberValidate(config, e) {
      let value = e.target.value;
      let regex = new RegExp(config.regex, 'ig');
      let tested = regex.test(value);

      let form = this.get('formObject');
      set(form, `${config.model}`, value);

      if (tested) {
        set(form, `${config.error}`, false);
      } else {
        set(form, `${config.error}`, true);
      }
    },

    passwordValidate(config, e) {
      let value = e.target.value;
      let regex = new RegExp(config.regex, 'ig');
      let tested = regex.test(value);

      let form = this.get('formObject');
      set(form, `${config.model}`, value);

      if (tested) {
        set(form, `${config.error}`, false);
      } else {
        set(form, `${config.error}`, false);
      }
    },

    confirmPasswordValidate(config, e) {
      let confirmPassword = e.target.value;
      let form = this.get('formObject');
      let password = get(form, `${config.parentModel}`);

      set(form, `${config.model}`, confirmPassword);

      if (password === confirmPassword) {
        set(form, `${config.error}`, false);
      } else {
        set(form, `${config.error}`, true);
      }
    }
  }
});
