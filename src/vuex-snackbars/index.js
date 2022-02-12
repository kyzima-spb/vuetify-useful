import { mapActions } from 'vuex';

import makeSnackbarsStore from './store';
import Snackbars from './VuexSnackbars';


const SnackbarsMixin = {
  methods: {
    ...mapActions('snackbars', [
      'flashError',
      'flashInfo',
      'flashSuccess',
      'flashWarning',
      'flashErrorMessage',
      'flashInfoMessage',
      'flashSuccessMessage',
      'flashWarningMessage',
    ]),
  },
};


function install(Vue, config = {}) {
  Vue.component('VuexSnackbars', Snackbars);
  Vue.mixin(SnackbarsMixin);
}


export { makeSnackbarsStore, SnackbarsMixin };
export default install;
