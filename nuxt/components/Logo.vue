<template>
  <div class="VueToNuxtLogo">
    Vue!!!!!
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

export default  {

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
  
}

</script>