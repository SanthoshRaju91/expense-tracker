import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({

  model() {
    let form = [{
      label: 'Email Address',
      type: 'email',
      model: 'email',
      placeholder: 'Email Address',
      handler: 'emailAddressValidate',
      error: 'emailErrorFlag',
      regex: '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
    }, {
      label: 'First Name',
      type: 'text',
      model: 'first_name',
      placeholder: 'First Name',
      handler: 'textValidate',
      error: 'firstErrorFlag',
      regex: '^([a-zA-Z0-9_-]){3,10}$'
    }, {
      label: 'Last Name',
      type: 'text',
      model: 'last_name',
      placeholder: 'Last Name',
      handler: 'textValidate',
      error: 'lastErrorFlag',
      regex: '^([a-zA-Z0-9_-]){3,10}$'
    }, {
      label: 'Contact Number',
      type: 'number',
      model: 'mobile',
      placeholder: 'Contact Number',
      handler: 'numberValidate',
      error: 'contactErrorFlag',
      regex: '^([0-9]){10,10}$',
      min: 10
    }, {
      label: 'Password',
      type: 'password',
      model: 'password',
      placeholder: 'Password',
      handler: 'passwordValidate',
      error: 'passwordErrorFlag',
      regex: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'
    }, {
      label: 'Confirm Password',
      type: 'password',
      parentModel: 'password',
      model: 'confirmPassword',
      placeholder: 'Confirm Password',
      error: 'confirmPasswordErrorFlag',
      handler: 'confirmPasswordValidate',
      hasConfirm: true
    }];

    return {
      form
    };
  }
});
