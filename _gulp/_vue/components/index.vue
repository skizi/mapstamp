<template>
  <div>

    <div class="container">

      <map-vue :now-state="this.$store.getters.nowState" :stamp="this.$store.getters.stamp" :decoration="this.$store.getters.decoration" :filter="this.$store.getters.filter" :text="this.$store.getters.text" :animation="this.$store.getters.animation" :generate-gif-state="this.$store.getters.generateGifState"></map-vue>
      

      <div class="interface">

        <about v-if="this.$store.getters.nowState == 'about'"></about>
        <capture v-else-if="this.$store.getters.nowState == 'capture'"></capture>
        <editor v-else-if="this.$store.getters.nowState == 'editor'"></editor>
        <text-editor v-else-if="this.$store.getters.nowState == 'textEditor'" :text="this.$store.getters.text"></text-editor>
        <animation-editor v-else-if="this.$store.getters.nowState == 'animationEditor'"></animation-editor>
        <share v-else-if="this.$store.getters.nowState == 'share'" :share-obj="this.$store.getters.shareObj"></share>

      </div>

    </div>

    <loading :loading-state="this.$store.getters.loadingState"></loading>
  
  </div>

</template>


<style lang="sass">
@import "../../_scss/_vars.scss";



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

module.exports = {

  name: 'Index',

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


  mounted: function() {

    // alert( this.nowState );

    this.states = [ 'about', 'capture', 'editor', 'textEditor', 'animationEditor', 'share' ];

    var header = document.body.getElementsByTagName( 'header' )[0];
    this.nextBtn = header.getElementsByClassName( 'next' )[0];
    this.prevBtn = header.getElementsByClassName( 'prev' )[0];
    this.nextBtn.addEventListener( 'click', this.nextBtnClick.bind( this ) );
    this.prevBtn.addEventListener( 'click', this.prevBtnClick.bind( this ) );


    if( localStorage.getItem('cacheImgBase64') ){

        var content = localStorage.getItem('cacheMessage');
        this.$store.commit( 'text', content );
        this.$store.commit( 'nowState', 'share' );

    }


    this.initHeaderBtns( this.$store.getters.nowState );
    this.$store.watch(
      (state, getters) => getters.nowState,
      (to, from) => {
        this.initHeaderBtns( to );
      }
    )

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
        console.log(2);
        this.changeState( 1 );

        
    },

    prevBtnClick : function(){

        this.changeState( -1 );

    },


    changeState : function( adjustIndex ){

        let state = this.$store.getters.nowState;
        let nextIndex = this.states.indexOf( state ) + adjustIndex;
        let nextState = this.states[ nextIndex ];

        if( nextState ){
            this.$store.commit( 'nowState', nextState );
        }

    },

  }

};

</script>

