<template>
	<div class="capture_btn_container">
		<p class="border_text">
			<span>地図をフリックして<br>位置を調整しよう！</span>
		</p>

		<a href="javascript:void(0);" class="btn0" @click="clickSubmitBtn">決定！</a>
	</div>
</template>


<style lang="scss">

.capture_btn_container{
    text-align: center;

    p{
		margin-bottom: 10px;
    }

    .btn0{
	    position: relative;
		top: 10px;
    }
}
</style>


<script>

export default {

  name: 'Capture',


  methods: {

  	clickSubmitBtn(){

  		this.$store.commit( 'pageName', 'editor' );

  	}

  },

};

</script>