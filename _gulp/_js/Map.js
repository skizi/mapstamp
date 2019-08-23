
import Util from './Util';
import UserAgent from './UserAgent';
import PixiView from './PixiView';


export default class Map{

  constructor( state ){

    Util.ua = new UserAgent();

    this.zoom = 13;
    this.debugFlag = false;
    this.ajaxData = {};

  	this.element = document.querySelector( '.map' );
    this.container = document.querySelector( '.map .leaflet' );

    //ドラッグ後に、この半径内に存在する質問をサーバーから取得する
    this.searchRadius = 500;

    L.Icon.Default.imagePath = '/assets/leaflet/';
    var latlng = [ 35.67848924554223, 139.76272863769532];
    this.map = L.map( 'leafletMap' ).setView( latlng, this.zoom );
  	L.tileLayer(
  		'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

  		//なぜかRetina対応タイルが存在しない
  		//'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}{r}.png',
  		{
  			attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
        minZoom: 3,
  			maxZoom: 18,
  			detectRetina:true
  		}
  	).addTo( this.map );

    this.leafletControlZoom = document.getElementsByClassName( 'leaflet-control-zoom' )[0];

    //移動範囲を限定させる
    this.map.setMaxBounds( new L.LatLngBounds([ -90, -180 ], [ 90, 180]) );

    this.map.on( 'moveend', this.mapMoved.bind( this ) );
    this.map.on( 'zoomstart', this.mapZoomStart.bind( this ) );
    this.map.on( 'zoomend', this.mapZoomEnd.bind( this ) );


    this.cover = this.element.getElementsByClassName( 'cover' )[0];
    this.copy = document.getElementsByClassName( 'leaflet-control-attribution' )[0];

    this.pixiView = new PixiView( state );
    this.pixiView.element.addEventListener( 'ysdCallback', function( e ){    
      var obj = e.detail.value;
      var latlng = this.map.getCenter();
      obj.lat = latlng.lat;
      obj.lng = latlng.lng;
      this.element.dispatchEvent( new CustomEvent( 'ysdCallback', { detail:{ value:obj } } ) );
    }.bind( this ) );


    //ユーザーの現在地を取得
    this.checkGps();
    this.gpsIntervalId = setInterval( this.checkGps.bind( this ), 5000 );


    if( Util.ua.ieVer < 12 ){
      console.log( "load html2canvas_old" );
      var script = document.createElement( 'script' );
      script.type = 'text/javascript';
      script.src = '/js/html2canvas_old.js';
      var head = document.getElementsByTagName( 'head' )[0];
      head.appendChild(script);
    }

  }


  show(){

    this.element.style.display = 'block';

  }


  hide(){

    this.element.style.display = 'none';

  }


  changeState( state ){

    if( state == 'about' ){
      this.setHeight( 150 );
    }else{
      this.setHeight( 320 );
    }

    this.setInterface( state );

    if( state == 'capture' ){
      this.capture();
    }

  }


  setHeight( h ){

    this.element.style.height = h + 'px';

    if( h == 320 ){
      this.container.style.transform = 'translateY(0px)';
    }else if( h == 150 ){
      this.container.style.transform = 'translateY(-75px)';
    }

  }


  mapMoved(){

  }


  mapZoomStart(){

  }


  mapZoomEnd(){

  }


  setInterface( type ){
    
    switch( type ){

      case 'about':
        this.leafletControlZoom.style.display = 'none';
        this.cover.style.display = 'block';
        break;

      case 'capture':
        this.leafletControlZoom.style.display = 'block';
        this.cover.style.display = 'none';
        this.pixiView.hide();
        break;

      case 'editor':
        this.leafletControlZoom.style.display = 'none';
        this.pixiView.show();
        this.cover.style.display = 'none';
        break;

      case 'share':
        this.cover.style.display = 'block';
        break;

    }

  }


  capture(){

    console.log("capture!!!!");
    this.copy.style.display = 'none';

    html2canvas( this.container, { useCORS: true } ).then(function( canvas ) {
        var img = new Image();
        img.src = canvas.toDataURL();
        img.onload = function( img ){

          this.copy.style.display = 'block';
          this.pixiView.addMap( img );

        }.bind( this, img );
    }.bind( this ));

  }


  addStamp( img, index ){

    this.pixiView.drawStamp( img, index, true );

  }


  addDecoration( img, index ){

    this.pixiView.drawDecoration( img, index, true );
    
  }


  addFilter( img, index ){

    this.pixiView.drawFilter( img, index, true );

  }


  addText( text ){
    
    this.pixiView.drawText( text );
  
  }


  addAnimation( data ){

    this.pixiView.animation( data );
  
  }


  //ポップアップを作成
  createPopup( data ){

    var content = L.DomUtil.create( 'div', 'popup' );
    //content.innerHTML = data.title;

    var popup = L.popup({ autoPan:false, keepInView:true, autoClose:false, closeOnEscapeKey:false, closeOnClick:false })
        .setLatLng([ Number( data.lat ), Number( data.lng ) ])
        .setContent( content )
        .openOn( this.map );

    var element = popup.getElement();


    //flickrだったら
    if( data.type == 'flickr' ){

      var img = document.createElement( 'img' );
      img.setAttribute( 'src', data.thumbnailSrc );
      content.appendChild( img );
      element.setAttribute( 'class', element.className + ' flickr' );

    }else{//questionだったら

      this.addUserIcon( data.user_id, content );
      var span = document.createElement( 'span' );
      span.innerHTML = data.title;
      content.appendChild( span );
    
      var rank = this.getRank( data );
      element.setAttribute( 'class', element.className + rank );

    }

// var draggable = new L.Draggable(popup._container, popup._wrapper);
// draggable.enable();
    
    L.DomEvent.on( element, 'click', this.popupClickHandler.bind( this, data ) );

    return popup;

  }



  removeBoundsPopup( key ){

    var length = this.popups[ key ].length;
    for( var i = 0; i < length; i++ ){
      //var content = this.popups[ key ][i].getContent();
      var element = this.popups[ key ][i].getElement();
      L.DomEvent.off( element, 'click', this.popupClickHandler.bind( this ) );
      this.popups[ key ][i].remove();
      this.allPopupLength--;
    }

    if( this.allPopupLength < 0 ) this.allPopupLength = 0;

    delete this.popups[ key ];

  }


  popupClickHandler( data ){

	 this.element.dispatchEvent( new CustomEvent( 'ysdCallback', { detail:{ value:{ type:'popupClick', data:data } } } ) );

  }


  checkGps(){
    
    navigator.geolocation.getCurrentPosition(
      function( pos ){

        var latLng = L.latLng( pos.coords.latitude, pos.coords.longitude );
        //console.log( latLng );
        
        if( this.userMaker ){
        
          this.userMaker.setLatLng( latLng );
        
        }else{//初回アクセス

          if( !localStorage.getItem('cacheImgBase64') ){
            this.map.setView( latLng, 16 );
            this.userMaker = L.marker([ latLng.lat, latLng.lng ]).addTo(this.map);
          }
        }
      }.bind( this ),
      function( error ){

        // console.log( error );
        if( error.code == 1 ){
          alert( "位置情報の利用が許可されていません" );
        }

        clearInterval( this.gpsIntervalId );

      }.bind( this ),
      {
        enableHighAccuracy:true
      }
    );

  }


  generateGif(){

    this.pixiView.encodeGifAnimation( function(){
      this.pixiView.generateGifAnimation();
    }.bind( this ) );

  }


  setLatLng( lat, lng ){

    var latLng = L.latLng( lat, lng );
    this.map.setView( latLng, 16 );
    this.userMaker = L.marker([ latLng.lat, latLng.lng ]).addTo(this.map);

  }


  saveData(){

    this.pixiView.saveData();

  }


  resize(){
    
    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;
    this.halfWidth = this.width * 0.5;
    this.halfHeight = this.height * 0.5;

  
  }

}
