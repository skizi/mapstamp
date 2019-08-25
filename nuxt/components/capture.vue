<template>
	<div class="capture_btn_container">
		<p class="border_text">
			<span>地図をフリックして<br>位置を調整しよう！</span>
		</p>

		<a href="javascript:void(0);" class="btn0" @click="clickSubmitBtn">決定！</a>
	</div>
</template>


<style lang="scss">
/*@import "../../_scss/_vars.scss";*/

</style>


<script>
import Vue from 'vue';


export default {

  name: 'Capture',


  methods: {

  	clickSubmitBtn : function(){

  		this.$store.commit( 'pageName', 'editor' );

  	}

  },

};

</script>