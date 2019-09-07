<template>
	<div class="text_editor">
		<p class="border_text">
			<span>アピールしたいことを<br>文章で書こう！</span>
		</p>
		<textarea maxlength="12" placeholder="ここにメッセージを入力してね">{{text}}</textarea>

		<a href="javascript:void(0);" class="btn0" @click="clickSubmitBtn">決定！</a>
	</div>
</template>



<script>
  
export default {

  name: 'TextEditor',

  mounted: function() {

    if (process.browser) {
      this.textEditor = document.getElementsByClassName( 'text_editor' )[0];
      this.textarea = this.textEditor.getElementsByTagName( 'textarea' )[0];
      var oldText = this.textarea.value;
      setInterval( function(){
        if( oldText != this.textarea.value ){
          this.$store.commit( 'text', this.textarea.value );
          oldText = this.textarea.value;
        }
      }.bind( this ), 1000 );
    }
    
  },


  methods: {

  	clickSubmitBtn(){

  		this.$store.commit( 'pageName', 'animationEditor' );

  	}

  },


  props : {
    text : String
  }

};

</script>