<template>
	<div class="share">

		<textarea maxlength="30" placeholder="画像と一緒に投稿するメッセージを入力してね。" class="pluse_message"></textarea>

		<a href="javascript:void(0);" class="btn0 twitter">Twitterにシェアする</a>
		<a href="javascript:void(0);" class="btn0 facebook">FaceBookにシェアする</a>
		<a href="javascript:void(0);" class="btn0 download">画像をダウンロードする</a>
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


  },


  watch: {
    

  },


  props : {
  }

};

</script>