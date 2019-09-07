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



<script>
import Util from '@/assets/js/Util'


export default {

  name: 'AnimationEditor',

  mounted() {

    if (process.browser) {
      this.element = document.getElementsByClassName( 'animation_editor' )[0];

      this.data = [
        {
          name:'なし',
          frames:[]
        },
        {
          name:'ズーム1',
          frames:[
            { x:0, y:0, scale:1.1 },
            { x:0, y:0, scale:1.2 },
            { x:0, y:0, scale:1.3 },
            { x:0, y:0, scale:1.4 },
            { x:0, y:0, scale:1.5 },
            { x:0, y:0, scale:1.6 },
            { x:0, y:0, scale:1.7 },
            { x:0, y:0, scale:1.8 },
            { x:0, y:0, scale:1.9 },
            { x:0, y:0, scale:2 }
          ],
        },
        {
          name:'ズーム2',
          frames:[
            { x:0, y:0, scale:1 },
            { x:0, y:0, scale:1.2 },
            { x:0, y:0, scale:1.4 },
            { x:0, y:0, scale:1.6 },
            { x:0, y:0, scale:1.8 },
            { x:0, y:0, scale:2 },
            { x:0, y:0, scale:1.8 },
            { x:0, y:0, scale:1.6 },
            { x:0, y:0, scale:1.4 },
            { x:0, y:0, scale:1.2 }
          ],
        }
      ];
      this.active = 0;

      this.btnContainer = this.element.getElementsByTagName( 'ul' )[0];
      this.btns = [];
      var length = this.data.length;
      for( var i = 0; i < length; i++ ){
        this.btns[i] = document.createElement( 'li' );
        this.btns[i].innerHTML = this.data[i].name;
        this.btns[i].addEventListener( Util.clickEventName, this.btnClickHandler.bind( this, i ) );
        this.btnContainer.appendChild( this.btns[i] );
      }
      this.btnContainer.style.width = length * 90 + 'px';
    }
    
  },


  methods: {

  	clickSubmitBtn(){

  		this.$store.commit( 'pageName', 'share' );
      this.$store.commit( 'animation', this.data[this.active] );

  	},


    btnClickHandler( index ){
      
      this.active = index;
      this.$store.commit( 'animation', this.data[this.active] );

    }

  },

};

</script>