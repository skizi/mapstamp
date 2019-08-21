<template>
	<div class="animation_editor">
		<p class="border_text">
			<span>アニメーションを<br>設定して演出しよう！</span>
		</p>
		<div class="slider">
			<ul>
			</ul>
		</div>

		<a href="javascript:void(0);" class="btn0" @click="clickSubmitBtn">決定！</a>
	</div>
</template>


<style lang="sass">
@import "../../_scss/_vars.scss";

</style>


<script>
import Vue from 'vue';


module.exports = {

  name: 'AnimationEditor',

  mounted: function() {


  },


  methods: {

  	clickSubmitBtn : function(){

  		this.$store.commit( 'nowState', 'share' );

  	}

  },


  watch: {
    

  },


  props : {
  }

};

</script>