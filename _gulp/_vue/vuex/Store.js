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
		nowState : 'about',
		stamp : {},
		decoration : {},
		filter : {},
		text : '',
		animation : {},
		generateGifState : {},
		shareObj : {},
		loadingState : {}
	},


	/**
	 * mutations
	 *
	 * ステートを更新・変更させる処理を書く場所。
	 * 非同期処理を含めない。
	 */
	mutations: {

		nowState( state, nowState ){
			
	      state.nowState = nowState;

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


	    generateGifState( state, generateGifState ){

	      state.generateGifState = generateGifState;
	    
	    },


	    shareObj( state, shareObj ){

	      state.shareObj = shareObj;

	    },

	    loadingState( state, loadingState ){

	      state.loadingState = loadingState;

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

		nowState: ( state ) =>{
			return state.nowState;
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

		generateGifState: ( state ) => {
			return state.generateGifState;
		},

		shareObj: ( state ) => {
			return state.shareObj;
		},

		loadingState: ( state ) => {
			return state.loadingState;
		},

	}
});
export default store;
