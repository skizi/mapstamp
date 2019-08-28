<template>
  <div>

    <div class="container">

      <map-vue :page-name="this.$store.getters.pageName" :stamp="this.$store.getters.stamp" :decoration="this.$store.getters.decoration" :filter="this.$store.getters.filter" :text="this.$store.getters.text" :animation="this.$store.getters.animation" :generate-gif="this.$store.getters.generateGif"></map-vue>
      

      <div class="interface">

        <about v-if="this.$store.getters.pageName == 'about'"></about>
        <capture v-else-if="this.$store.getters.pageName == 'capture'"></capture>
        <editor v-else-if="this.$store.getters.pageName == 'editor'"></editor>
        <text-editor v-else-if="this.$store.getters.pageName == 'textEditor'" :text="this.$store.getters.text"></text-editor>
        <animation-editor v-else-if="this.$store.getters.pageName == 'animationEditor'"></animation-editor>
        <share v-else-if="this.$store.getters.pageName == 'share'" :share="this.$store.getters.share"></share>

      </div>

    </div>

    <loading :loading="this.$store.getters.loading"></loading>
  
  </div>

</template>


<style lang="scss">
/*@import "../../_scss/_vars.scss";*/



/*-----------------other--------------------*/
.interface{
  padding: 20px 10px 40px;
}


@media screen and (min-width: 375px) {
  body.home_index{
    .container{
      padding-top:20px;
    }
  }
}
</style>


<script>
import Vue from 'vue';
import MapVue from './map-vue';
import About from './about';
import Capture from './capture';
import Editor from './editor';
import TextEditor from './text-editor';
import AnimationEditor from './animation-editor';
import Share from './share';
import Loading from './loading';

import { mapMutations, mapGetters } from 'vuex'

import Util from '@/assets/js/Util'
import axios from 'axios';


export default {

  name: 'App',

  components: {
    'map-vue': MapVue,
    'about': About,
    'capture': Capture,
    'editor' : Editor,
    'text-editor' : TextEditor,
    'animation-editor' : AnimationEditor,
    'share' : Share,
    'loading' : Loading
  },


  created: function() {

    console.log("app : mounted!!");

    this.states = [ 'about', 'capture', 'editor', 'textEditor', 'animationEditor', 'share' ];

    if (process.client) {

      var http = axios.create();
      http.interceptors.response.use(function (response) {
          var token = response.headers['x-csrf-token'];
          if (token) {
              // save token in localStorage for later use
              app.csrfToken = token;
              window.localStorage.setItem('csrf-token', token);
              console.log(token);
          }
          return response;
      }, function (error) {});

      
      Util.clickEventName = 'click';
      if( window.app.loginFlag ) Util.loginProvider = window.app.provider;

      var header = document.body.getElementsByTagName( 'header' )[0];
      this.nextBtn = header.getElementsByClassName( 'next' )[0];
      this.prevBtn = header.getElementsByClassName( 'prev' )[0];
      this.nextBtn.addEventListener( 'click', this.nextBtnClick.bind( this ) );
      this.prevBtn.addEventListener( 'click', this.prevBtnClick.bind( this ) );


      if( localStorage.getItem('cacheImgBase64') ){

          var content = localStorage.getItem('cacheMessage');
          this.$store.commit( 'text', content );
          this.$store.commit( 'pageName', 'share' );

      }


      this.initHeaderBtns( this.$store.getters.pageName );
      this.$store.watch(
        (state, getters) => getters.pageName,
        (to, from) => {
          this.initHeaderBtns( to );
        }
      )
    }

  },


  methods : {

    initHeaderBtns( state ){

        if( state == 'about' ){
            this.prevBtn.style.display = 'none';
            this.nextBtn.style.display = 'block';
        }else if( state == 'share' ){
            this.prevBtn.style.display = 'block';
            this.nextBtn.style.display = 'none';
        }else{
            this.prevBtn.style.display = 'block';
            this.nextBtn.style.display = 'block';
        }

    },

    nextBtnClick : function(){
      
        this.changeState( 1 );

        
    },

    prevBtnClick : function(){

        this.changeState( -1 );

    },


    changeState : function( adjustIndex ){

        let state = this.$store.getters.pageName;
        let nextIndex = this.states.indexOf( state ) + adjustIndex;
        let nextState = this.states[ nextIndex ];

        if( nextState ){
            this.$store.commit( 'pageName', nextState );
        }

    },

  }

};

</script>

