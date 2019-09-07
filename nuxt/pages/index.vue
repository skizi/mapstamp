<template>
  <div>

    <div class="container">

      <MapVue :page-name="this.$store.getters.pageName" :stamp="this.$store.getters.stamp" :decoration="this.$store.getters.decoration" :filter="this.$store.getters.filter" :text="this.$store.getters.text" :animation="this.$store.getters.animation" :generate-gif="this.$store.getters.generateGif"></MapVue>
      

      <div class="interface">

        <About v-if="this.$store.getters.pageName == 'about'"></About>
        <Capture v-else-if="this.$store.getters.pageName == 'capture'"></Capture>
        <Editor v-else-if="this.$store.getters.pageName == 'editor'"></Editor>
        <TextEditor v-else-if="this.$store.getters.pageName == 'textEditor'" :text="this.$store.getters.text"></TextEditor>
        <AnimationEditor v-else-if="this.$store.getters.pageName == 'animationEditor'"></AnimationEditor>
        <Share v-else-if="this.$store.getters.pageName == 'share'" :share="this.$store.getters.share"></Share>

      </div>

    </div>

    <loading :loading="this.$store.getters.loading"></loading>
  
  </div>

</template>


<style lang="scss">

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
import MapVue from '~/components/MapVue';
import About from '~/components/About';
import Capture from '~/components/Capture';
import Editor from '~/components/Editor';
import TextEditor from '~/components/TextEditor';
import AnimationEditor from '~/components/AnimationEditor';
import Share from '~/components/Share';
import Loading from '~/components/Loading';

import Util from '@/assets/js/Util'
import axios from 'axios';


export default {

  name: 'Index',

  components: {
    MapVue,
    About,
    Capture,
    Editor,
    TextEditor,
    AnimationEditor,
    Share,
    Loading
  },

  head: {
    bodyAttrs: {
      class: 'home_index'
    }
  },


  created() {

    this.states = [ 'about', 'capture', 'editor', 'textEditor', 'animationEditor', 'share' ];

    if (process.client) {
      
      Util.clickEventName = 'click';

      //データ初期化
      var params = this.getParams();
      if( params['loginFlag'] ) Util.loginProvider = params['provider'];

      if( localStorage.getItem('cacheImgBase64') ){

          var content = localStorage.getItem('cacheMessage');
          this.$store.commit( 'text', content );
          this.$store.commit( 'pageName', 'share' );

      }

      /*
      var header = document.body.getElementsByTagName( 'header' )[0];
      this.nextBtn = header.getElementsByClassName( 'next' )[0];
      this.prevBtn = header.getElementsByClassName( 'prev' )[0];
      this.nextBtn.addEventListener( 'click', this.nextBtnClick.bind( this ) );
      this.prevBtn.addEventListener( 'click', this.prevBtnClick.bind( this ) );

      this.initHeaderBtns( this.$store.getters.pageName );
      this.$store.watch(
        (state, getters) => getters.pageName,
        (to, from) => {
          this.initHeaderBtns( to );
        }
      )
      */
    }

  },


  computed : {

    isLoggedin(){

      return function( str ){
        var str = '未ログイン';
        if (this.$auth.loggedIn) str = 'ログイン';

        return str;
      }

    }

  },


  methods : {

    getParams(){
      
      var arg = new Object;
      var pair = location.search.substring(1).split('&');
      for( var i = 0; pair[i]; i++ ){
          var kv = pair[i].split('=');
          arg[kv[0]]=kv[1];
      }

      return arg;

    },


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

    nextBtnClick(){
      
        this.changeState( 1 );

        
    },

    prevBtnClick(){

        this.changeState( -1 );

    },


    changeState( adjustIndex ){

        let state = this.$store.getters.pageName;
        let nextIndex = this.states.indexOf( state ) + adjustIndex;
        let nextState = this.states[ nextIndex ];

        if( nextState ){
            this.$store.commit( 'pageName', nextState );
        }

    },


    authenticate() {
      this.$auth.loginWith('github');
    },

  }

};

</script>


