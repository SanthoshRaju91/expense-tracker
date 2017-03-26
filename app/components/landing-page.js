import Ember from 'ember';

const {
  Component,
  $,
  run
} = Ember;

const PAGE_HEIGHT = 280;

export default Component.extend({

  /**
  * didInsertElement component hook
  * @method didInsertElement
  */
  didInsertElement() {
    this._super(...arguments);

    run.schedule('afterRender', this, () => {
      $(window).on('scroll', (e) => {
        if(e.currentTarget.scrollY > PAGE_HEIGHT) {
          $('.sticky-nav-bar').addClass('reached');
        } else {
          $('.sticky-nav-bar').removeClass('reached');
        }
      });

      $('.main-container .liquid-child:eq(1)').css({
        'transform': 'none !important'
      });
    });
  },

  actions: {
    /**
    * Function handler for register
    * @method register
    */
    register() {
      this.sendAction('register');
    },

    /**
    * Function hanlder for showLogin button click
    * @method showLogin
    */
    showLogin() {
      this.sendAction('showLogin');
    }
  }
});
