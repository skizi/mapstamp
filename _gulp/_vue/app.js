/* -----------------------------------------------
 * Vue本処理
 * ----------------------------------------------- */
import Vue from 'vue';
import Util from '../_js/Util';
// import VueRouter from 'vue-router';

// Vue.use( VueRouter );

import store from './vuex/Store';
// import routes from './routes';

import Index from './components/index';
  
var is_debug_console = false; // コンソールのON/OFF
var is_devmode = Boolean(document.domain == 'localhost'); // VUEのモードを切り替える
var router_mode = (is_devmode)? 'hash' : 'history';


// export const router = new VueRouter({
// 	mode: router_mode,
// 	// mode: 'hash',
//   // mode: 'history',
//   routes: routes,
// });

Util.clickEventName = 'click';

Vue.component('index', Index);

const app = new Vue({

  // el: '#app',
  // router : router,
  store : store,
  mounted : function(){
  },
  el: '#app',
  // components: { Index },
  // template: '<index></index>',
  // data: {
  //   nowState: "hogege"// store.getters.nowState
  // },
  render : h => h( Index )
  // render: function(h){
  //   return h( Index, this.nowState )
  // },

});//.$mount('#app')


