
import Util from './Util';


export default class PixiView{

  constructor(){

		this.element = document.querySelector( '.map .pixi' );  	

		this.stage = new PIXI.Stage();
		this.renderer = PIXI.autoDetectRenderer( 320, 320, {  transparent: true, antialias : true, resolution:2, backgroundColor:0x00000000, preserveDrawingBuffer: true } );
		this.element.appendChild( this.renderer.view );
		this.renderer.view.style.cssText = 'touchAction:auto;';
		this.renderer.plugins.interaction.autoPreventDefault = false;

		this.renderer.view.ontouchmove = function(e) {
			if( this.dragFlag ) e.preventDefault();
		}.bind( this );

		setInterval( this.animate.bind( this ), 1000 / 30 );


		this.container = new PIXI.Container();
		this.container.x = 160;
		this.container.y = 160;
		this.stage.addChild( this.container );

		this.bg = new PIXI.Sprite();
		this.bg.anchor.x = 0.5;
		this.bg.anchor.y = 0.5;
		this.container.addChild( this.bg );

		this.stamps = [];
		this.decorations = [];
		this.filters =[
			null,
			new PIXI.filters.OldFilmFilter(),
			new PIXI.filters.ZoomBlurFilter(),
			//new PIXI.filters.AsciiFilter(),
			new PIXI.filters.DotFilter(),
			new PIXI.filters.PixelateFilter(),
			//new PIXI.filters.AdvancedBloomFilter({ threshold:0.5, brightness:0.3 }),
			new PIXI.filters.ColorMatrixFilter()
		];
		this.filters[2].center = [160, 160];
		//this.filters[3].size = 10; //ascii


		this.filterNames = [ 'なし', 'フィルム', 'ズーム', /*'Ascii',*/ 'ドット', 'モザイク', /*'Bloom',*/ 'グレー' ];

	    var _filters = document.querySelector( '.editor .filters' );
	    var length = this.filters.length;
	    for( var i = 0; i < length; i++ ){
	    	var li = document.createElement( 'li' );
	    	li.innerHTML = this.filterNames[i];
		    _filters.appendChild( li );
		}
		_filters.style.width = length * 90 + 'px';


		this.stage.interactive = true;
		if( Util.ua.platform == 'pc' ){
			this.stage.on('mousemove', this.moveHandler.bind( this ));
			this.stage.on('mousedown', this.downHandler.bind( this ));
			document.body.onmouseup = this.upHandler.bind( this );
		}else{
			this.stage.on('touchmove', this.moveHandler.bind( this ));
			this.stage.on('touchstart', this.downHandler.bind( this ));
			document.body.ontouchend = this.upHandler.bind( this );
		}



		this.text = new PIXI.Text( '',{fontFamily : 'Arial', fontSize: 24, fill:0xff6744, align : 'center'});
		this.text.y = 320 - 50;
		this.text.style.stroke = 0xffffff;
		this.text.style.strokeThickness	= 10;
		this.stage.addChild( this.text );


		//osm copy
		this.copy = new PIXI.Container();
		this.copy.x = 172;
		this.copy.y = 304;
		this.stage.addChild( this.copy );

		var graphics = new PIXI.Graphics();
		graphics.beginFill( 0xffffff, 0.7 );
		graphics.drawRect( 0, 0, 150, 16 );
		graphics.endFill();
		this.copy.addChild( graphics );
		
		var text = new PIXI.Text('Map data © OpenStreetMap',{ fontSize: 11, fill : 0x0078A8 });
		text.x = 5;
		text.y = 1;
		this.copy.addChild( text );


		//gif animation -----------------
		//インスタンスの生成
		this.refreshGifanimation();

		var canvas = document.createElement( 'canvas' );
		canvas.setAttribute( 'width', 320 );
		canvas.setAttribute( 'height', 320 );
		this.gifCtx = canvas.getContext('2d');


		//カメラ　アニメーション用
		this.animationData = { frames:[] };

	}


	show(){

		this.element.style.display = 'block';

	}


	hide(){

		this.element.style.display = 'none';

	}


	moveHandler(){



	}


	downHandler( e ){

		if (e.data.originalEvent.touches) {
		    Util.mouseX = e.data.originalEvent.touches[0].pageX;
		    Util.mouseY = e.data.originalEvent.touches[0].pageY;
		}else{
			Util.mouseX = e.data.originalEvent.pageX;
			Util.mouseY = e.data.originalEvent.pageY;
		}

	}


	upHandler(){



	}


	refreshGifanimation(){

		this.gifAnimation = new GIFEncoder(320,320);
		this.gifAnimation.setRepeat(0);
		this.gifAnimation.setDelay(100);
		this.gifAnimation.start();

	}


	addMap( img ){

		let texture = new PIXI.Texture( new PIXI.BaseTexture(img) );
		this.bg.texture = texture;
		if( Util.ua.platform != "pc" ){
			this.bg.scale.set( 0.5, 0.5 );
		}
		// this.bg.width = 320;
		// this.bg.height = 320;

		console.log("add map...");

	}


	drawStamp( img ){

		if( !img ){
			for( var i = 0; i < this.stamps.length; i++ ){
				this.container.removeChild( this.stamps[i] );
			}
			this.stamps = [];
			return;
		}


		let texture = new PIXI.Texture( new PIXI.BaseTexture(img) );
		var stamp = new PIXI.Sprite( texture );
		stamp.anchor.x = 0.5;
		stamp.anchor.y = 0.5;
		stamp.x = 0;
		stamp.y = 0;
		stamp.scale.set( 0.9 );
		stamp.on('pointerdown', this.onDragStart.bind( this ))
	        .on('pointerup', this.onDragEnd.bind( this ))
	        .on('pointerupoutside', this.onDragEnd.bind( this ))
	        .on('pointermove', this.onDragMove);
	    stamp.interactive = true;
		stamp.buttonMode = true;
		this.stamps.push( stamp );
		this.container.addChild( stamp );

	}


	drawDecoration( img, index ){

		if( !img ){
			for( var i = 0; i < this.decorations.length; i++ ){
				this.stage.removeChild( this.decorations[i] );
			}
			this.decorations = [];
			return;
		}

		let texture = new PIXI.Texture( new PIXI.BaseTexture(img) );
		this.decoration = new PIXI.Sprite( texture );
		this.decoration.y = 320 - this.decoration.height;
		// this.decoration.anchor.x = 0.5;
		// this.decoration.anchor.y = 0.5;
		this.decorations.push( this.decoration );
		this.stage.addChild( this.decoration );
	
		this.stage.addChild( this.text );
		this.stage.addChild( this.copy );
	}


	drawFilter( img, index ){

		if( this.filterNames[index] == 'なし' ){
			this.container.filters = [];
			return;
		}

		this.container.filters = [ this.filters[index] ];

		if( this.filterNames[index] == 'グレー' ){
			this.container.filters[0].desaturate();
		}

	}


	drawText( text ){

		this.text.text = text;
		this.text.x = ( 320 - this.text.width ) * 0.5;
		this.stage.addChild( this.text );

	}


	animation( data ){

		var count = 0;
		var length = data.frames.length;

		this.animationData = data;
		this.container.x = 160;
		this.container.y = 160;
		this.container.scale.set( 1 );

		clearInterval( this.animationSampleInterval );
		if( length == 0 ){
			return;
		}

		this.animationSampleInterval = setInterval(function(){

			var s = data.frames[count].scale;
			this.container.scale.set( s );

			count++;
			if( count == length ) count = 0;

		}.bind( this ), 100 );

	}


	//-------------------------------
	stageScaleAnimation0( count, length ){

		var rot = 180 * ( count / length );
		var s = 1 + Math.sin( Math.PI / 180 * rot );
		this.container.scale.set( s );

	}


	//--------------generate gif animation-----------------
	encodeGifAnimation( callback ){
		
		if( this.encodeInterval ) return;

		clearInterval( this.animationSampleInterval );
		this.container.x = 160;
		this.container.y = 160;
		this.container.scale.set( 1 );
		

		var frameLength = this.animationData.frames.length;
		if( frameLength == 0 ){
        	Util.loading.setText( '画像を生成しています。' );
			callback();
			return;
		}

		var count = 0;
		this.encodeInterval = setInterval(function(){

			//this.stageScaleAnimation0( count, frameLength-1 );
			var frame = this.animationData.frames[count];
			var s = frame.scale;
			this.container.scale.set( s );
			this.addGifFrame();

			count++;
			if( count == frameLength ){
				clearInterval( this.encodeInterval );
				this.encodeInterval = null;
				callback();
			}

		}.bind( this ), 100 );

	}


	addGifFrame(){

		// this.renderer.view.style.width = '320px';
		// this.renderer.view.style.height = '320px';
		
		this.gifCtx.drawImage( this.renderer.view, 0, 0, 320, 320 );
		// this.drawCopy( this.gifCtx );
		this.gifAnimation.addFrame(this.gifCtx);

		// this.renderer.view.style.width = '320px';
		// this.renderer.view.style.height = '320px';

	}


	drawCopy( ctx ){

		ctx.beginPath();
		ctx.fillStyle = 'rgba(255, 255, 255, 0.7 )';
		ctx.rect( 160, 304, 160, 16 );
		ctx.fill();
		ctx.font = '11px';
		ctx.fillStyle = '#0078A8';
		ctx.fillText( 'Map data © OpenStreetMap', 165, 307 );

	}


	generateGifAnimation(){
		
		var image = document.createElement('img');
        
		var frameLength = this.animationData.frames.length;
		//0フレームのときはただのPNG
		if( frameLength == 0 ){

			var url = this.renderer.view.toDataURL("image/png");
			//image.src = url;
			blob = this.dataURLtoBlob( url );

		//フレームがあるときはgifアニメ
		}else{

			//GIFアニメーションの生成終了
			this.gifAnimation.finish();

	        var bin = new Uint8Array( this.gifAnimation.stream().bin);
	        var blob = new Blob([bin.buffer], {type:'image/gif'});
	        // var url = URL.createObjectURL(blob);
	        //image.src = url;
	        // image.onload = function() {
	        //   URL.revokeObjectURL(url);
	        // }

	        this.refreshGifanimation();
	    }
        

		// var b64 = window.btoa( this.gifAnimation.stream().getData());
		// image.src = 'data:image/gif;base64,'+b64;
        

        // 画像サンプル配置
        // image.className = 'gif';
        // var container = document.getElementsByClassName( 'share' )[0];
        // container.appendChild( image );

		var imgType = 'gif';
		if( frameLength == 0 ) imgType = 'png';
	    this.element.dispatchEvent( new CustomEvent( 'ysdCallback', { detail:{ value:{ type:'generateBlob', blob:blob, content:this.text.text, imgType:imgType } } } ) );


	}


    dataURLtoBlob(dataurl) {
        var bin = atob(dataurl.split("base64,")[1]);
        var len = bin.length;
        var barr = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            barr[i] = bin.charCodeAt(i);
        }
        return new Blob([barr], {
            type: 'image/jpeg',
        });
    }

	//----------------mouse event---------------------
	onDragStart( e ) {
		this.dragFlag = true;
		var target = e.currentTarget;
	    target.data = e.data;
	    target.alpha = 0.8;
	    target.dragging = true;
	}

	onDragEnd( e ) {
		this.dragFlag = false;
		var target = e.currentTarget;
	    target.data = null;
	    target.alpha = 1;
	    target.dragging = false;
	}

	onDragMove() {
	    if (this.dragging) {
	        var newPosition = this.data.getLocalPosition(this.parent);
	        this.x = newPosition.x;
	        this.y = newPosition.y;
	    }
	}


	animate(){

	    this.renderer.render( this.stage );

	}

}

