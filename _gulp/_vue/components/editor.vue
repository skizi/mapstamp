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
import Util from '../../_js/Util';


module.exports = {

  name: 'Editor',

  mounted: function() {

  	this.element = document.querySelector( '.editor' );

    this.selectBtns = document.getElementsByClassName( 'select_menu' )[0].getElementsByTagName( 'li' );
    this.selectBtns[0].addEventListener( Util.clickEventName, this.selectBtnClickHandler.bind( this, 'stamp' ) );
    this.selectBtns[1].addEventListener( Util.clickEventName, this.selectBtnClickHandler.bind( this, 'decoration' ) );
    this.selectBtns[2].addEventListener( Util.clickEventName, this.selectBtnClickHandler.bind( this, 'filter' ) );

    this.stamps = this.element.getElementsByClassName( 'stamps' )[0];
    this.decorations = this.element.getElementsByClassName( 'decorations' )[0];
    this.filters = this.element.getElementsByClassName( 'filters' )[0];

    this.addBtns( 'stamp' );
    this.addBtns( 'decoration' );
    


    this.submitBtn = this.element.getElementsByClassName( 'btn0' )[0];
    this.submitBtn.addEventListener( 'click', this.submitBtnClickHandler.bind( this ) );


    this.initFilters();
    this.initFilterBtns();

  },


  methods: {

  	clickSubmitBtn : function(){

  		this.$store.commit( 'nowState', 'textEditor' );

  	},


	addBtns : function( type ){

    	if( type == 'stamp' ){
	      var ul = this.stamps;
	      var func = this.stampBtnClickHandler;
	      var length = 81 + 1;
	    }else if( type == 'decoration' ){
	      length = 13 + 1;
	      ul = this.decorations;
	      func = this.decorationBtnClickHandler;
	    }

	    var none = document.createElement( 'li' );
	    none.innerHTML = '全削除';
	    ul.appendChild( none );
	    var btns = [ none ];
	    for( var i = 0; i < length; i++ ){
	      if( i != 0 ){
	        btns[i] = document.createElement( 'li' );
	        btns[i].innerHTML = '<img src="/images/' + type + '/' + ( i - 1 ) + '.png">';
	      }
	      btns[i].addEventListener( Util.clickEventName, func.bind( this, i ) )
	      ul.appendChild( btns[i] );
	    }
	    ul.style.width = length * 90 + 'px';

	    if( type == 'stamp' ){
	      this.stampBtns = btns;
	    }else if( type == 'decoration' ){
	      this.decorationBtns = btns;
	    }

	  },


		initFilters( state ){
			
			var filterNames = [ '全削除', 'フィルム', 'ズーム', /*'Ascii',*/ 'ドット', 'モザイク', /*'Bloom',*/ 'グレー' ];

		    var _filters = document.querySelector( '.editor .filters' );
		    var length = filterNames.length;
		    for( var i = 0; i < length; i++ ){
		    	var li = document.createElement( 'li' );
		    	li.innerHTML = filterNames[i];
			    _filters.appendChild( li );
			}
			_filters.style.width = length * 90 + 'px';
	
		},


	  initFilterBtns : function(){
	    
	    this.filterBtns = this.filters.getElementsByTagName( 'li' );
	    var length = this.filterBtns.length;
	    for( var i = 0; i < length; i++ ){
	      this.filterBtns[i].addEventListener( Util.clickEventName, this.filterBtnClickHandler.bind( this, i ) )
	    }

	  },


	  selectBtnClickHandler : function( type ){

	    // if( Util.ua.platform != 'pc' ){
	    //   if( new Date().getTime() - Util.downTime > Util.touchHitTime ) return;
	    // }

	    for( var i = 0; i < this.selectBtns.length; i++ ){
	      this.selectBtns[i].style.backgroundColor = '#fff';
	    }

	    switch( type ){

	      case 'stamp':
	        this.selectBtns[0].style.backgroundColor = '#f2f2f2';
	        this.stamps.style.display = 'block';
	        this.filters.style.display = 'none';
	        this.decorations.style.display = 'none';
	        break;

	      case 'decoration':
	        this.selectBtns[1].style.backgroundColor = '#f2f2f2';
	        this.stamps.style.display = 'none';
	        this.filters.style.display = 'none';
	        this.decorations.style.display = 'block';
	        break;

	      case 'filter':
	        this.selectBtns[2].style.backgroundColor = '#f2f2f2';
	        this.stamps.style.display = 'none';
	        this.filters.style.display = 'block';
	        this.decorations.style.display = 'none';
	        break;
	    }

	  },


	  stampBtnClickHandler : function( i ){

	    var img = this.stampBtns[i].getElementsByTagName( 'img' )[0];
	    // this.element.dispatchEvent( new CustomEvent( 'ysdCallback', { detail:{ value:{ type:'selectStamp', img:img, index:i } } } ) );

  		this.$store.commit( 'stamp', { img:img, index:i } );

	  },


	  decorationBtnClickHandler : function( i ){

	    var img = this.decorationBtns[i].getElementsByTagName( 'img' )[0];
	    // this.element.dispatchEvent( new CustomEvent( 'ysdCallback', { detail:{ value:{ type:'selectDecoration', img:img, index:i } } } ) );

  		this.$store.commit( 'decoration', { img:img, index:i } );

	  },


	  filterBtnClickHandler : function( i ){

	    var img = this.filterBtns[i].getElementsByTagName( 'img' )[0];
	    // this.element.dispatchEvent( new CustomEvent( 'ysdCallback', { detail:{ value:{ type:'selectFilter', img:img, index:i } } } ) );

  		this.$store.commit( 'filter', { img:img, index:i } );

	  },


	  submitBtnClickHandler : function(){

	      this.element.dispatchEvent( new CustomEvent( 'ysdCallback', { detail:{ value:{ type:'submit' } } } ) );

	  },


	  resize : function(){
	    
	    this.width = this.element.clientWidth;
	    this.height = this.element.clientHeight;
	    this.halfWidth = this.width * 0.5;
	    this.halfHeight = this.height * 0.5;

	  
	  }

  },


  watch: {
    

  },


  props : {
  }

};

</script>