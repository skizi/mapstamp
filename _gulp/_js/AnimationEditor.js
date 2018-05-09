
import Util from './Util';


export default class AnimationEditor{

  constructor(){

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

    this.submitBtn = this.element.getElementsByClassName( 'btn0' )[0];
    this.submitBtn.addEventListener( Util.clickEventName, this.submitBtnClickHandler.bind( this, i ) )

  }


  show(){

    this.element.style.display = 'block';

  }


  hide(){

    this.element.style.display = 'none';

  }


  btnClickHandler( index ){

    if( Util.ua.platform != 'pc' ){
      if( new Date().getTime() - Util.downTime > 200 ) return;
    }
    
  	this.active = index;
	this.element.dispatchEvent( new CustomEvent( 'ysdCallback', { detail:{ value:{ type:'select', data:this.data[this.active] } } } ) );

  }


  submitBtnClickHandler(){

	this.element.dispatchEvent( new CustomEvent( 'ysdCallback', { detail:{ value:{ type:'submit', data:this.data[this.active] } } } ) );

  }

}
