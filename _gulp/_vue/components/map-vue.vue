<template>
	<div class="map">
		<div class="leaflet" id="leafletMap"></div>
		<div class="pixi"></div>
		<div class="cover"></div>
	</div>
</template>


<style lang="sass">
  /*@import "../../sass/import/_vars.scss";*/

.map{
	width: 320px;
    height: 150px;
    margin:0 auto;
    position:relative;
    transition-duration: 0.8s;
    transition-property: height;
    transition-timing-function: ease;
    transition-timing-function: cubic-bezier(0.7, -0.02, 0.25, 1);
    overflow: hidden;

    .leaflet{
    	width:100%;
	    height: 320px;
        z-index: 0;
	    transition-duration: 0.8s;
	    transition-property: transform;
	    transition-timing-function: ease;
	    transition-timing-function: cubic-bezier(0.7, -0.02, 0.25, 1);
	    transform:translateY( -75px );

        .leaflet-control-zoom{
        	display: none;
        }
    }

    .cover{
    	width:320px;
    	height:320px;
    	position:absolute;
    	top: 0px;
    	left:0px;
    }
	.pixi{
		position: absolute;
		top: 0px;
		left: 0px;
		width: 320px;
		height: 320px;
    	display: none;

    	canvas{
		    width: 320px;
    	}
	}
}

</style>


<script>
import Vue from 'vue';
import Map from '../../_js/Map';


module.exports = {

  name: 'MapVue',

  data: function(){
    return {
    }
  },

  mounted: function() {

  	this.map = new Map( this.nowState );
    this.map.element.addEventListener( 'ysdCallback', this.mapCallBackHandler.bind( this ) );

  },


  methods : {

    
    mapCallBackHandler : function( e ){
      
      var obj = e.detail.value;
      switch( obj.type ){

        // case 'popupClick':
        //   this.showPostModal.refresh();
        //   this.showPostModal.setText( obj.data );
        //   this.showPostModal.show();
        //   break;

        case 'generateBlob':
          var pluseMessage = document.getElementsByClassName( 'pluse_message' )[0].value;
          obj.content = pluseMessage + ' ' + obj.content;
          this.share.submit( obj.blob, obj.lat, obj.lng, obj.content, obj.imgType );
          //↑ comitに差し替える
          break;

      }
    }

  },


  watch: {
    
    nowState : function( to, from ){

      if( from != to ){
        this.map.changeState( this.nowState );
      }

    },


    stamp : function( to, from ){

      this.map.addStamp( to.img, to.index );

    },


    decoration : function( to, from ){

      this.map.addDecoration( to.img, to.index );        

    },

     
    filter : function( to, from ){

      this.map.addFilter( to.img, to.index );        
      
    },


    text : function( to, from ){

        this.map.addText( to );

    },


    animation : function( to, from ){

        this.map.addAnimation( to );

    },


    generateGifState : function( to, from ){

      if( to.state == 'generateGif' ){
        this.map.generateGif();
        if( to.notLoginFlag ){//今からログインする場合はデータ保存
          this.map.saveData();
        }
      }

    }

  },


  props : {
    nowState : String,
    stamp : Object,
    decoration : Object,
    filter : Object,
    text : String,
    animation : Object,
    generateGifState : Object
  }

};

</script>
