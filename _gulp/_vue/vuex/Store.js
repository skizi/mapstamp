/**
 * Store/Index.js
 */
import Vue from 'vue';
import Vuex from 'vuex';
import {router} from "../app.js"
import axios from 'axios';


Vue.use(Vuex);
const store = new Vuex.Store({


	/**
	 * state
	 *
	 * 実際の状態（最新のデータ）が入ったもの。
	 * コンポーネントでいうデータのようなもの。
	 * ミューテーション以外から直接書き換えてはいけない。
	 */
	state : {
		pageName : 'about',
		stamp : {},
		decoration : {},
		filter : {},
		text : '',
		animation : {},
		generateGif : {},
		share : {},
		loading : {}
	},


	/**
	 * mutations
	 *
	 * ステートを更新・変更させる処理を書く場所。
	 * 非同期処理を含めない。
	 */
	mutations: {

		pageName( state, pageName ){
			
	      state.pageName = pageName;

		},

	    stamp( state, stamp ){

	      state.stamp = stamp;
	    
	    },

	    decoration( state, decoration ){
	    
	      state.decoration = decoration;
	    
	    },

	    filter( state, filter ){

	      state.filter = filter;
	    
	    },

	    text( state, text ){

	      state.text = text;
	    
	    },


	    animation( state, animation ){

	      state.animation = animation;
	    
	    },


	    generateGif( state, generateGif ){

	      state.generateGif = generateGif;
	    
	    },


	    share( state, share ){

	      state.share = share;

	    },

	    loading( state, loading ){

	      state.loading = loading;

	    },

	},


	/**
	 * actions
	 *
	 * 非同期処理を行うロジック。
	 * API との通信して結果をコミットしたりコンポーネントに返すなど。
	 * ステートを操作したい場合はここからミューテーションにコミットする。
	 */
	actions: {

	    async ajax( context, property ){

	      const payload = {
	        get_works: [],
	        get_work: {},
	        get_members: {},
	        get_member: {}
	      };

	      var params = {
		  	action : property.wpActionName,
		    //secure : '<?php echo wp_create_nonce('text_test_ajax ') ?>'
		  };
		  if( property.wpActionName == 'get_work' || property.wpActionName == 'get_member' ){
		  	params.id = property.id;
		  }

	      await axios.get(
	      	Vue.prototype.$_wpAjaxUrl, {
			  params: params
			},
			{ headers: { 'Content-Type': 'application/json' } }
	      ).then((res) => {

			payload[property.wpActionName] = res.data;

	      });

		  context.commit( property.wpActionName, payload[property.wpActionName] );

	    },

	},


	getters: {

		pageName: ( state ) =>{
			return state.pageName;
		},
	
		stamp: ( state ) => {
			return state.stamp;
		},

		decoration: ( state ) => {
			return state.decoration;
		},

		filter: ( state ) => {
			return state.filter;
		},

		text: ( state ) => {
			return state.text;
		},

		animation: ( state ) => {
			return state.animation;
		},

		generateGif: ( state ) => {
			return state.generateGif;
		},

		share: ( state ) => {
			return state.share;
		},

		loading: ( state ) => {
			return state.loading;
		},

	}
});
export default store;
