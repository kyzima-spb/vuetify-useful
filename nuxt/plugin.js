// import { makeSnackbarsStore } from '@kyzima-spb/vuetify-useful/vuex-snackbars';
import { SnackbarsPlugin, makeSnackbarsStore } from '@kyzima-spb/vuetify-useful';
import Vue from 'vue';


Vue.use(SnackbarsPlugin);


export default (ctx, inject) => {
  makeSnackbarsStore()(ctx.store);
};
