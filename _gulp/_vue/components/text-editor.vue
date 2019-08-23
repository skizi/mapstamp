<template>
	<div class="text_editor">
		<p class="border_text">
			<span>アピールしたいことを<br>文章で書こう！</span>
		</p>
		<textarea maxlength="12" placeholder="ここにメッセージを入力してね"></textarea>

		<a href="javascript:void(0);" class="btn0" @click="clickSubmitBtn">決定！</a>
	</div>
</template>


<style lang="sass">
@import "../../_scss/_vars.scss";

</style>


<script>
import Vue from 'vue';

  
module.exports = {

  name: 'TextEditor',

  mounted: function() {

    this.textEditor = document.getElementsByClassName( 'text_editor' )[0];
    this.textarea = this.textEditor.getElementsByTagName( 'textarea' )[0];
    var oldText = this.textarea.value;
    setInterval( function(){
      if( oldText != this.textarea.value ){
        this.$store.commit( 'text', this.textarea.value );
        oldText = this.textarea.value;
      }
    }.bind( this ), 1000 );

  },


  methods: {

  	clickSubmitBtn : function(){

  		this.$store.commit( 'nowState', 'animationEditor' );

  	}

  },


  watch: {
    

  },


  props : {
  }

};

</script>