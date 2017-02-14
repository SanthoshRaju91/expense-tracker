import Ember from 'ember';

const {
  Controller
} = Ember;

export default Controller.extend({

  actions: {
    /**
    * Function to handle cancel and route the user to landing page
    * @method cancel
    */
    cancel() {
      this.transitionToRoute('landing');
    },

    /**
    * Function to handler register click and make a service call to register the user
    * @method register
    */
    register() {
      
    }
  }
});
