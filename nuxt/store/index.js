/**
 * Store/Index.js
 */
import Vue from 'vue';
import Vuex from 'vuex';
// import {router} from "../app.js"
import axios from 'axios';


Vue.use(Vuex);

const store = () => {

	return new Vuex.Store({

		/**
		 * state
		 *
		 * 実際の状態（最新のデータ）が入ったもの。
		 * コンポーネントでいうデータのようなもの。
		 * ミューテーション以外から直接書き換えてはいけない。
		 */
		state : {
			pageName : 'about',
			stamp : { img : null, index : 0 },
			decoration : { img : null, index : 0 },
			filter : { img : null, index : 0 },
			text : '',
			animation : { name:'', frames:[] },
			generateGif : { state : '', notLoginFlag : false },
			share : { blob : null, lat : 0, lng : 0, content : '', imgType : '' },
			loading : { state : '', message : '' },
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

		    async postMessage( context, property ){

		      var http = axios.create();
		      http.interceptors.response.use(function (response) {
		          var token = response.headers['x-csrf-token'];

		          if (token) {
		              // save token in localStorage for later use
		              // this.authenticity_token = token;
		              property.formData.append( 'authenticity_token', token );
		              window.localStorage.setItem('csrf-token', token);
		          }
		          return response;
		      }.bind( this ), function (error) {});
		      http.interceptors.request.use(function (config) {
		          var token = window.localStorage.getItem('csrf-token');
		          config.headers['X-CSRF-Token'] = token;
		          return config;
		      }, function (error) {});

		      const response = await http.post( property.url, property.formData, 
		        {
		          headers: {
		            'content-type': 'multipart/form-data',
		          },
		          validateStatus: function (status) {
		            return status < 300;
		          },
		        }
		      ).catch( err => {
				return 'error';
			  });

	          if( response.status < 300 ){
	            return response.data;
	          }else{
	            return 'error';
	          }

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
}
export default store;
