
import Util from './Util';


export default class Loading{

	constructor(){

		this.element = document.getElementsByClassName( 'loading_cover' )[0];
		this.text = this.element.getElementsByTagName( 'p' )[0];
		this.faceBookShareBtn = this.element.getElementsByClassName( 'facebook_share_btn' )[0];
		// this.faceBookShareBtn.addEventListener( Util.clickEventName, this.shareFaceBook.bind( this ) );
		this.timeoutId;

	}

	showLoading( message ){
		this.text.innerHTML = message;
		this.element.style.display = 'block';
		clearTimeout( this.timeoutId );
		this.timeoutId = setTimeout(function(){
			this.element.style.opacity = 1;
		}.bind( this ), 100 );
	}

	hideLoading(){
		this.element.style.opacity = 0;
		clearTimeout( this.timeoutId );
		this.timeoutId = setTimeout(function(){
			this.element.style.display = 'none';
			this.text.innerHTML = '';
		}.bind( this ), 300 );
	}


	setText( message ){

		this.text.innerHTML = message;

	}


	showFaceBookShareBtn( url ){

		this.faceBookShareBtn.style.display = 'block';
		setTimeout(function(){
			this.faceBookShareBtn.style.opacity = 1;
			this.faceBookShareBtn.setAttribute( 'href', url );
		}.bind( this ), 100 );

	}


	// shareFaceBook( e ){

	// 	if( this.shareFaceBookCallBack ) this.shareFaceBookCallBack();

	// 	this.faceBookShareBtn.style.opacity = 0;
	// 	setTimeout(function(){
	// 		this.faceBookShareBtn.style.display = 'block';
	// 	}.bind( this ), 300 );
	// }

}