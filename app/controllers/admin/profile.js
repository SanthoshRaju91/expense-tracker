import Ember from 'ember';

const {
  Controller,
  inject
} = Ember;

export default Controller.extend({

  /** edit state property */
  editable: false,
  /** saved state property*/
  saved: false,
  /** authenticated service */
  authenticated: inject.service(),

  /**
  * init controller hook
  * @method init
  */
  init() {
    this._super(...arguments);

    // getting profile data from local storage
    let authenticated = this.get('authenticated');
    let profileDetails = authenticated.getUserDetails();
    this.set('profile', JSON.parse(profileDetails));
  },

  actions: {
    /**
    * Function handler for toggling edit state
    * @method edit
    * @param state
    */
    edit(state) {
      this.set('editable', state);

      if(!state) {
        this.setProperties({
          'saved': false,
          'isError': false
        });
      }
    },

    /**
    * Function for saving the profile changes.
    * @method save
    */
    save() {

      let authenticatedService = this.get('authenticated');

      let firstname = this.get('profile.firstname');
      let lastname = this.get('profile.lastname');
      let email = this.get('profile.email');
      let number = this.get('profile.mobile');

      if(firstname !== '' && lastname !== '' && validateEmail(email) && validateMobile(number) ) {
        let id = this.get('profile.id');

        let newUserData = {
          first_name: firstname,
          last_name: lastname,
          email,
          mobile: number
        };
        authenticatedService.updateUserDetails(id, newUserData)
          .then((response) => {
            if(response.success) {
              this.setProperties({
                'saved': true,
                'isError': false,
                'saveMsg': 'Your profile changes saved'
              });
            }
          })
          .catch((error) => {
            this.setProperties({
              'editable': false,
              'isError': true,
              'saved': true,
              'saveMsg': 'Something went wrong while saving data, please try again',
              'profile': JSON.parse(authenticatedService.getUserDetails())
            });
          });
      }

      /**
      * Function to validate email
      * @method validateEmail
      * @param email
      */
      function validateEmail(email) {
        let emailPattern = new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$', 'ig');
        let tested = emailPattern.test(email);

        return (tested) ? true : false;
      }

      /**
      * Function to validate mobile number
      * @method validateMobile
      * @param number
      */
      function validateMobile(number) {
        let numberLength = number.toString().length;
        if(numberLength >= 10) {
          return true;
        } else {
          this.set('errorMsg', 'Mobile number length should be 10');
          return false;
        }
      }
    }
  }
});
