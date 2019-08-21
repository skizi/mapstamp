<template>
	<div class="editor">
		<div class="bottom slider">
			<ul class="stamps">
			</ul>
			<ul class="decorations">
			</ul>
			<ul class="filters">
			</ul>
		</div>

		<ul class="select_menu">
			<li>スタンプ</li>
			<li>かざり</li>
			<li>フィルター</li>
		</ul>
		
		<p class="border_text">
			<span>スタンプやフィルターで<br>デコろう！<br>配置したスタンプは<br>ドラッグで調整できるよ！</span>
		</p>

		<a href="javascript:void(0);" class="btn0" @click="clickSubmitBtn">決定！</a>
	</div>
</template>


<style lang="sass">
@import "../../_scss/_vars.scss";

</style>


<script>
import Vue from 'vue';


module.exports = {

  name: 'Editor',

  mounted: function() {


  },


  methods: {

  	clickSubmitBtn : function(){

  		this.$store.commit( 'nowState', 'textEditor' );

  	}

  },


  watch: {
    

  },


  props : {
  }

};

</script>