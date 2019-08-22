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
      
    }

  },


  props : {
    nowState : String,
    stamp : Object,
    decoration : Object,
    filter : Object
  }

};

</script>
