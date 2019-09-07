<template>
	<div>
		<img :src="'/images/post_images/' + imgId + '.' + imgType" class="post_image">

		<p class="border_text">
			<span>
				画像を右クリック（または長押し）で<br>ダウンロードしよう！
			</span>
		</p>

		<a href="/" class="btn0 c_mb40">トップに戻る</a>

		<!--
		<p>title:<%= @postImage.title %></p>
		<p>id:<%= @postImage.id %></p>
		<p>content:<%= @postImage.content %></p>
		<p>user_id:<%= @postImage.user_id %></p>
		<p>lat:<%= @postImage.lat %></p>
		<p>lng:<%= @postImage.lng %></p>
		-->
	</div>
</template>

<script>

export default {

	name : 'PostImages',

	head: {
		bodyAttrs: {
			class: 'post_images_show'
		}
	},

	data: function(){
		return {
			imgId:0,
			imgType:'gif'
		}
	},


	mounted : function(){

      this.imgId = localStorage.getItem( 'imgId' );
      this.imgType = localStorage.getItem( 'imgType' );

	},

	
	validate ({ params }) {
		// 数値でなければならない
		return /^\d+$/.test(params.id)
	}

}

</script>