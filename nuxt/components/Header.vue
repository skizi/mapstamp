
<template>
	<header>

		<div class="inner">

			<a href="javascript:void(0);" class="prev">戻る</a>
			<h2>
				<a href="/">
					<img src="/img/header/logo.png" alt="MapStamp マップポップ" >
				</a>
			</h2>
			<h1>位置情報共有サービス マップスタンプ</h1>
			<a href="javascript:void(0);" class="next">次へ</a>

		</div>
		
	</header>
</template>

<script>
	
export default {

  name: 'Header',


  mounted: function() {

	this.states = [ 'about', 'capture', 'editor', 'textEditor', 'animationEditor', 'share' ];

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
	);

  },


  methods : {

    initHeaderBtns( state ){

        if( this.$route.name != 'index' ){
            this.prevBtn.style.display = 'none';
            this.nextBtn.style.display = 'none';
            return;
        }

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

    nextBtnClick : function(){
      
        this.changeState( 1 );

        
    },

    prevBtnClick : function(){

        this.changeState( -1 );

    },


    changeState : function( adjustIndex ){

        let state = this.$store.getters.pageName;
        let nextIndex = this.states.indexOf( state ) + adjustIndex;
        let nextState = this.states[ nextIndex ];

        if( nextState ){
            this.$store.commit( 'pageName', nextState );
        }

    },

  }

};

</script>