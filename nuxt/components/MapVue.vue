<template>
	<div class="map">
		<div class="leaflet" id="leafletMap"></div>
		<div class="pixi"></div>
		<div class="cover"></div>
	</div>
</template>


<style lang="scss">
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
import Map from '@/assets/js/Map'


export default {

  name: 'MapVue',

  created(){

    if (process.browser) {

    	this.map = new Map( this.pageName );
      this.map.element.addEventListener( 'ysdCallback', this.mapCallBackHandler.bind( this ) );


      if( localStorage.getItem('cacheImgBase64') ){

        this.map.setInterface( 'share' );
        this.map.setHeight( 320 );
        var lat = localStorage.getItem('cacheLat');
        var lng = localStorage.getItem('cacheLng');
        this.map.setLatLng( lat, lng );
        setTimeout( () => {
          this.map.capture();
        }, 1000 );
      }
    }

  },


  methods : {

    
    mapCallBackHandler( e ){
      
      var obj = e.detail.value;
      switch( obj.type ){

        case 'generateBlob':
          obj.content = obj.content;

          this.$store.commit( 'share', { blob:obj.blob, lat:obj.lat, lng:obj.lng, content:obj.content, imgType:obj.imgType } );
          break;

        case 'changeLoadingText':
          this.$store.commit( 'loading', { state:'changeMessage', message:obj.message } );
          break;

      }
      
    }

  },


  watch: {
    
    pageName( to, from ){
      
      this.map.changeState( to );

    },


    stamp( to, from ){

      this.map.addStamp( to.img, to.index );

    },


    decoration( to, from ){

      this.map.addDecoration( to.img, to.index );        

    },

     
    filter( to, from ){

      this.map.addFilter( to.img, to.index );        
      
    },


    text( to, from ){

        this.map.addText( to );

    },


    animation( to, from ){

        this.map.addAnimation( to );

    },


    generateGif( to, from ){

      if( to.state == 'generateGif' ){
        this.map.generateGif();
        if( to.notLoginFlag ){//今からログインする場合はデータ保存
          this.map.saveData();
        }
      }

    }

  },


  props : {
    pageName : String,
    stamp : Object,
    decoration : Object,
    filter : Object,
    text : String,
    animation : Object,
    generateGif : Object
  }

};

</script>
