(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnimationEditor = function () {
  function AnimationEditor() {
    _classCallCheck(this, AnimationEditor);

    this.element = document.getElementsByClassName('animation_editor')[0];

    this.data = [{
      name: 'なし',
      frames: []
    }, {
      name: 'ズーム1',
      frames: [{ x: 0, y: 0, scale: 1.1 }, { x: 0, y: 0, scale: 1.2 }, { x: 0, y: 0, scale: 1.3 }, { x: 0, y: 0, scale: 1.4 }, { x: 0, y: 0, scale: 1.5 }, { x: 0, y: 0, scale: 1.6 }, { x: 0, y: 0, scale: 1.7 }, { x: 0, y: 0, scale: 1.8 }, { x: 0, y: 0, scale: 1.9 }, { x: 0, y: 0, scale: 2 }]
    }, {
      name: 'ズーム2',
      frames: [{ x: 0, y: 0, scale: 1 }, { x: 0, y: 0, scale: 1.2 }, { x: 0, y: 0, scale: 1.4 }, { x: 0, y: 0, scale: 1.6 }, { x: 0, y: 0, scale: 1.8 }, { x: 0, y: 0, scale: 2 }, { x: 0, y: 0, scale: 1.8 }, { x: 0, y: 0, scale: 1.6 }, { x: 0, y: 0, scale: 1.4 }, { x: 0, y: 0, scale: 1.2 }]
    }];
    this.active = 0;

    this.btnContainer = this.element.getElementsByTagName('ul')[0];
    this.btns = [];
    var length = this.data.length;
    for (var i = 0; i < length; i++) {
      this.btns[i] = document.createElement('li');
      this.btns[i].innerHTML = this.data[i].name;
      this.btns[i].addEventListener(_Util2.default.clickEventName, this.btnClickHandler.bind(this, i));
      this.btnContainer.appendChild(this.btns[i]);
    }
    this.btnContainer.style.width = length * 90 + 'px';

    this.submitBtn = this.element.getElementsByClassName('btn0')[0];
    this.submitBtn.addEventListener(_Util2.default.clickEventName, this.submitBtnClickHandler.bind(this, i));
  }

  _createClass(AnimationEditor, [{
    key: 'show',
    value: function show() {

      this.element.style.display = 'block';
    }
  }, {
    key: 'hide',
    value: function hide() {

      this.element.style.display = 'none';
    }
  }, {
    key: 'btnClickHandler',
    value: function btnClickHandler(index) {

      if (_Util2.default.ua.platform != 'pc') {
        if (new Date().getTime() - _Util2.default.downTime > 200) return;
      }

      this.active = index;
      this.element.dispatchEvent(new CustomEvent('ysdCallback', { detail: { value: { type: 'select', data: this.data[this.active] } } }));
    }
  }, {
    key: 'submitBtnClickHandler',
    value: function submitBtnClickHandler() {

      this.element.dispatchEvent(new CustomEvent('ysdCallback', { detail: { value: { type: 'submit', data: this.data[this.active] } } }));
    }
  }]);

  return AnimationEditor;
}();

exports.default = AnimationEditor;

},{"./Util":9}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Editor = function () {
  function Editor() {
    _classCallCheck(this, Editor);

    this.element = document.querySelector('.editor');

    this.selectBtns = document.getElementsByClassName('select_menu')[0].getElementsByTagName('li');
    this.selectBtns[0].addEventListener(_Util2.default.clickEventName, this.selectBtnClickHandler.bind(this, 'stamp'));
    this.selectBtns[1].addEventListener(_Util2.default.clickEventName, this.selectBtnClickHandler.bind(this, 'decoration'));
    this.selectBtns[2].addEventListener(_Util2.default.clickEventName, this.selectBtnClickHandler.bind(this, 'filter'));

    this.stamps = this.element.getElementsByClassName('stamps')[0];
    this.decorations = this.element.getElementsByClassName('decorations')[0];
    this.filters = this.element.getElementsByClassName('filters')[0];

    this.addBtns('stamp');
    this.addBtns('decoration');
    this.filterBtns = this.filters.getElementsByTagName('li');
    var length = this.filterBtns.length;
    for (var i = 0; i < length; i++) {
      this.filterBtns[i].addEventListener(_Util2.default.clickEventName, this.filterBtnClickHandler.bind(this, i));
    }

    this.submitBtn = this.element.getElementsByClassName('btn0')[0];
    this.submitBtn.addEventListener('click', this.submitBtnClickHandler.bind(this));
  }

  _createClass(Editor, [{
    key: 'show',
    value: function show(img) {

      this.element.style.display = 'block';
    }
  }, {
    key: 'hide',
    value: function hide() {

      this.element.style.display = 'none';
    }
  }, {
    key: 'addBtns',
    value: function addBtns(type) {

      if (type == 'stamp') {
        var ul = this.stamps;
        var func = this.stampBtnClickHandler;
        var length = 81 + 1;
      } else if (type == 'decoration') {
        length = 13 + 1;
        ul = this.decorations;
        func = this.decorationBtnClickHandler;
      }

      var none = document.createElement('li');
      none.innerHTML = 'なし';
      ul.appendChild(none);
      var btns = [none];
      for (var i = 0; i < length; i++) {
        if (i != 0) {
          btns[i] = document.createElement('li');
          btns[i].innerHTML = '<img src="/images/' + type + '/' + (i - 1) + '.png">';
        }
        btns[i].addEventListener(_Util2.default.clickEventName, func.bind(this, i));
        ul.appendChild(btns[i]);
      }
      ul.style.width = length * 90 + 'px';

      if (type == 'stamp') {
        this.stampBtns = btns;
      } else if (type == 'decoration') {
        this.decorationBtns = btns;
      }
    }
  }, {
    key: 'selectBtnClickHandler',
    value: function selectBtnClickHandler(type) {

      if (_Util2.default.ua.platform != 'pc') {
        if (new Date().getTime() - _Util2.default.downTime > 200) return;
      }

      for (var i = 0; i < this.selectBtns.length; i++) {
        this.selectBtns[i].style.fontWeight = 'normal';
      }

      switch (type) {

        case 'stamp':
          this.selectBtns[0].style.fontWeight = 'bold';
          this.stamps.style.display = 'block';
          this.filters.style.display = 'none';
          this.decorations.style.display = 'none';
          break;

        case 'decoration':
          this.selectBtns[1].style.fontWeight = 'bold';
          this.stamps.style.display = 'none';
          this.filters.style.display = 'none';
          this.decorations.style.display = 'block';
          break;

        case 'filter':
          this.selectBtns[2].style.fontWeight = 'bold';
          this.stamps.style.display = 'none';
          this.filters.style.display = 'block';
          this.decorations.style.display = 'none';
          break;
      }
    }
  }, {
    key: 'stampBtnClickHandler',
    value: function stampBtnClickHandler(i) {

      if (_Util2.default.ua.platform != 'pc') {
        if (new Date().getTime() - _Util2.default.downTime > 200) return;
      }

      var img = this.stampBtns[i].getElementsByTagName('img')[0];
      this.element.dispatchEvent(new CustomEvent('ysdCallback', { detail: { value: { type: 'selectStamp', img: img, index: i } } }));
    }
  }, {
    key: 'decorationBtnClickHandler',
    value: function decorationBtnClickHandler(i) {

      if (_Util2.default.ua.platform != 'pc') {
        if (new Date().getTime() - _Util2.default.downTime > 200) return;
      }

      var img = this.decorationBtns[i].getElementsByTagName('img')[0];
      this.element.dispatchEvent(new CustomEvent('ysdCallback', { detail: { value: { type: 'selectDecoration', img: img, index: i } } }));
    }
  }, {
    key: 'filterBtnClickHandler',
    value: function filterBtnClickHandler(i) {

      if (_Util2.default.ua.platform != 'pc') {
        if (new Date().getTime() - _Util2.default.downTime > 200) return;
      }

      var img = this.filterBtns[i].getElementsByTagName('img')[0];
      this.element.dispatchEvent(new CustomEvent('ysdCallback', { detail: { value: { type: 'selectFilter', img: img, index: i } } }));
    }
  }, {
    key: 'submitBtnClickHandler',
    value: function submitBtnClickHandler() {

      this.element.dispatchEvent(new CustomEvent('ysdCallback', { detail: { value: { type: 'submit' } } }));
    }
  }, {
    key: 'resize',
    value: function resize() {

      this.width = this.element.clientWidth;
      this.height = this.element.clientHeight;
      this.halfWidth = this.width * 0.5;
      this.halfHeight = this.height * 0.5;
    }
  }]);

  return Editor;
}();

exports.default = Editor;

},{"./Util":9}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loading = function () {
	function Loading() {
		_classCallCheck(this, Loading);

		this.element = document.getElementsByClassName('loading_cover')[0];
		this.text = this.element.getElementsByTagName('p')[0];
		this.faceBookShareBtn = this.element.getElementsByClassName('facebook_share_btn')[0];
		this.faceBookShareBtn.addEventListener(_Util2.default.clickEventName, this.shareFaceBook.bind(this));
		this.timeoutId;
	}

	_createClass(Loading, [{
		key: 'showLoading',
		value: function showLoading(message) {
			this.text.innerHTML = message;
			this.element.style.display = 'block';
			clearTimeout(this.timeoutId);
			this.timeoutId = setTimeout(function () {
				this.element.style.opacity = 1;
			}.bind(this), 100);
		}
	}, {
		key: 'hideLoading',
		value: function hideLoading() {
			this.element.style.opacity = 0;
			clearTimeout(this.timeoutId);
			this.timeoutId = setTimeout(function () {
				this.element.style.display = 'none';
				this.text.innerHTML = '';
			}.bind(this), 300);
		}
	}, {
		key: 'setText',
		value: function setText(message) {

			this.text.innerHTML = message;
		}
	}, {
		key: 'showFaceBookShareBtn',
		value: function showFaceBookShareBtn(callback) {

			this.faceBookShareBtn.style.display = 'block';
			setTimeout(function () {
				this.faceBookShareBtn.style.opacity = 1;
				this.shareFaceBookCallBack = callback;
			}.bind(this), 100);
		}
	}, {
		key: 'shareFaceBook',
		value: function shareFaceBook(e) {

			if (this.shareFaceBookCallBack) this.shareFaceBookCallBack();

			this.faceBookShareBtn.style.opacity = 0;
			setTimeout(function () {
				this.faceBookShareBtn.style.display = 'block';
			}.bind(this), 300);
		}
	}]);

	return Loading;
}();

exports.default = Loading;

},{"./Util":9}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

var _UserAgent = require('./UserAgent');

var _UserAgent2 = _interopRequireDefault(_UserAgent);

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

var _Editor = require('./Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _AnimationEditor = require('./AnimationEditor');

var _AnimationEditor2 = _interopRequireDefault(_AnimationEditor);

var _Share = require('./Share');

var _Share2 = _interopRequireDefault(_Share);

var _Loading = require('./Loading');

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import NewPostModal from './NewPostModal';
// import ShowPostModal from './ShowPostModal';


document.addEventListener("DOMContentLoaded", function () {

  new Main();
});

var Main = function () {
  function Main() {
    _classCallCheck(this, Main);

    _Util2.default.ua = new _UserAgent2.default();
    _Util2.default.userId = app.user_id;
    if (app.loginFlag) _Util2.default.loginProvider = app.provider;

    this.state = 'about';

    _Util2.default.clickEventName = 'touchend';
    if (_Util2.default.ua.platform == 'pc') _Util2.default.clickEventName = 'click';

    _Util2.default.loading = new _Loading2.default();

    if (_Util2.default.ua.platform != 'pc') {
      document.body.addEventListener('touchstart', function () {
        _Util2.default.downTime = new Date().getTime();
      }.bind(this));
    }

    this.moveTo = new MoveTo({ tolerance: 0, duration: 300, easing: 'easeOutQuart' });
    this.header = document.getElementsByTagName('header')[0];

    this.map = new _Map2.default();
    this.map.element.addEventListener('ysdCallback', this.mapCallBackHandler.bind(this));

    this.aboutContainer = document.getElementsByClassName('about_container')[0];
    if (!this.aboutContainer.getElementsByClassName('twitter')[0]) {
      this.startBtn = this.aboutContainer.getElementsByClassName('btn0')[0];
      this.startBtn.addEventListener(_Util2.default.clickEventName, this.startBtnClickHandler.bind(this));
    }

    this.captureBtnContainer = document.querySelector('.capture_btn_container');
    this.captureBtn = document.querySelector('.capture_btn_container .btn0');
    this.captureBtn.addEventListener(_Util2.default.clickEventName, this.captureBtnClickHandler.bind(this));

    this.editor = new _Editor2.default();
    this.editor.element.addEventListener('ysdCallback', this.editorCallBackHandler.bind(this));

    this.textEditor = document.getElementsByClassName('text_editor')[0];
    this.textEditorBtn = this.textEditor.getElementsByClassName('btn0')[0];
    this.textEditorBtn.addEventListener(_Util2.default.clickEventName, function () {
      this.nextBtnClickHandler();
    }.bind(this));
    var textarea = this.textEditor.getElementsByTagName('textarea')[0];
    var oldText = textarea.value;
    setInterval(function () {
      if (oldText != textarea.value) {
        this.map.addText(textarea.value);
        oldText = textarea.value;
      }
    }.bind(this), 1000);

    this.animationEditor = new _AnimationEditor2.default();
    this.animationEditor.element.addEventListener('ysdCallback', this.animationEditorCallBackHandler.bind(this));

    this.share = new _Share2.default();
    this.share.element.addEventListener('ysdCallback', this.shareCallBackHandler.bind(this));

    this.prevBtn = document.querySelector('header .prev');
    this.prevBtn.addEventListener(_Util2.default.clickEventName, this.prevBtnClickHandler.bind(this));
    // this.nextBtn = document.querySelector( 'header .next' );
    // this.nextBtn.addEventListener( Util.clickEventName, this.nextBtnClickHandler.bind( this ) );


    this.resize();
    window.onresize = this.resize.bind(this);

    /*
    document.querySelector( '#form0 input' ).addEventListener( 'change', function( e ){
       var file = e.target.files[0];
       var form0 = document.getElementById( 'form0' );
      var formData = new FormData(form0);
      // formData.append( 'upfile', blob, 'anime.gif' );
      formData.append( 'title', '東京なうｗ' );
      formData.append( 'content', '東京なうｗ' );
      formData.append( 'lat', 1 );
      formData.append( 'lng', 1 );
      formData.append( 'user_id', 0 );
      formData.append( 'image_type', 'gif' );
       var url = Util.apiHeadUrl + '/post_images/create.json';
      $.ajax({
          url:url,
          type:'POST',
          data:formData,
          processData: false,
          contentType: false,
          success:function( result ){
              console.log( result );
          }.bind( this ),
          error:function( result ){
              console.log( result );
          }.bind( this )
      });
     }.bind(this) );
    */
  }

  _createClass(Main, [{
    key: 'prevBtnClickHandler',
    value: function prevBtnClickHandler() {

      switch (this.state) {

        case 'map':
          this.state = 'about';
          this.aboutContainer.style.display = 'block';
          this.captureBtnContainer.style.display = 'none';

          this.prevBtn.style.display = 'none';
          // this.nextBtn.style.display = 'none';

          this.map.setInterface('about');
          this.map.setHeight(150);
          break;

        case 'editor':
          this.state = 'map';
          this.captureBtnContainer.style.display = 'block';
          this.map.setInterface('map');
          this.editor.hide();

          this.prevBtn.style.display = 'block';
          // this.nextBtn.style.display = 'none';
          break;

        case 'textEditor':
          this.state = 'editor';
          this.textEditor.style.display = 'none';
          this.map.setInterface('editor');
          this.setEditor();

          this.prevBtn.style.display = 'block';
          // this.nextBtn.style.display = 'block';
          break;

        case 'animationEditor':
          this.state = 'textEditor';
          this.animationEditor.hide();
          this.textEditor.style.display = 'block';
          this.map.setInterface('share');

          this.prevBtn.style.display = 'block';
          // this.nextBtn.style.display = 'block';
          break;

        case 'share':
          this.state = 'animationEditor';
          this.map.setInterface('share');
          this.share.hide();
          this.animationEditor.show();

          this.prevBtn.style.display = 'block';
          // this.nextBtn.style.display = 'block';
          break;

      }
    }
  }, {
    key: 'nextBtnClickHandler',
    value: function nextBtnClickHandler() {

      switch (this.state) {

        case 'about':
          this.state = 'map';
          this.prevBtn.style.display = 'block';
          // this.nextBtn.style.display = 'none';
          break;

        case 'editor':
          this.state = 'textEditor';
          this.map.setInterface('share');
          this.editor.hide();
          this.textEditor.style.display = 'block';
          break;

        case 'textEditor':
          this.state = 'animationEditor';
          this.map.setInterface('share');
          this.textEditor.style.display = 'none';
          this.animationEditor.show();
          break;

        case 'animationEditor':
          this.state = 'share';
          this.map.setInterface('share');
          this.animationEditor.hide();
          this.share.show();

          // this.nextBtn.style.display = 'none';
          break;

      }

      this.moveTo.move(this.header);
    }
  }, {
    key: 'startBtnClickHandler',
    value: function startBtnClickHandler() {

      this.state = 'map';

      this.aboutContainer.style.display = 'none';
      this.captureBtnContainer.style.display = 'block';

      this.prevBtn.style.display = 'block';
      // this.nextBtn.style.display = 'none';

      this.map.setInterface('map');
      this.map.setHeight(320);
    }
  }, {
    key: 'captureBtnClickHandler',
    value: function captureBtnClickHandler() {

      this.map.capture();
      this.state = 'editor';
      this.map.setInterface('editor');
      this.setEditor();

      this.prevBtn.style.display = 'block';
      // this.nextBtn.style.display = 'block';
    }
  }, {
    key: 'setEditor',
    value: function setEditor() {

      this.editor.show();
      this.captureBtnContainer.style.display = 'none';
    }
  }, {
    key: 'mapCallBackHandler',
    value: function mapCallBackHandler(e) {

      var obj = e.detail.value;
      switch (obj.type) {

        // case 'popupClick':
        //   this.showPostModal.refresh();
        //   this.showPostModal.setText( obj.data );
        //   this.showPostModal.show();
        //   break;

        case 'generateBlob':
          this.share.submit(obj.blob, obj.lat, obj.lng, obj.content, obj.imgType);
          break;

      }
    }
  }, {
    key: 'editorCallBackHandler',
    value: function editorCallBackHandler(e) {

      var obj = e.detail.value;
      switch (obj.type) {

        case 'selectStamp':
          this.map.addStamp(obj.img, obj.index);
          break;

        case 'selectDecoration':
          this.map.addDecoration(obj.img, obj.index);
          break;

        case 'selectFilter':
          this.map.addFilter(obj.img, obj.index);
          break;

        case 'submit':
          this.nextBtnClickHandler();
          break;

      }
    }
  }, {
    key: 'animationEditorCallBackHandler',
    value: function animationEditorCallBackHandler(e) {

      var obj = e.detail.value;
      switch (obj.type) {

        case 'select':
          this.map.addAnimation(obj.data);
          break;

        case 'submit':
          this.nextBtnClickHandler();
          break;

      }
    }
  }, {
    key: 'shareCallBackHandler',
    value: function shareCallBackHandler(e) {

      var obj = e.detail.value;
      switch (obj.type) {

        case 'generateGif':
          this.map.generateGif();
          break;

      }
    }
  }, {
    key: 'resize',
    value: function resize() {

      clearTimeout(this.resizeTimeOutId);
      this.resizeTimeOutId = setTimeout(function () {
        this.map.resize();
      }.bind(this), 100);
    }
  }]);

  return Main;
}();

},{"./AnimationEditor":1,"./Editor":2,"./Loading":3,"./Map":5,"./Share":7,"./UserAgent":8,"./Util":9}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

var _PixiView = require('./PixiView');

var _PixiView2 = _interopRequireDefault(_PixiView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function () {
  function Map() {
    _classCallCheck(this, Map);

    this.zoom = 13;
    this.debugFlag = false;
    this.ajaxData = {};

    this.element = document.querySelector('.map');
    this.container = document.querySelector('.map .leaflet');

    //ドラッグ後に、この半径内に存在する質問をサーバーから取得する
    this.searchRadius = 500;

    L.Icon.Default.imagePath = '/assets/leaflet/';
    var latlng = [35.67848924554223, 139.76272863769532];
    this.map = L.map('leafletMap').setView(latlng, this.zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

    //なぜかRetina対応タイルが存在しない
    //'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}{r}.png',
    {
      attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
      minZoom: 3,
      maxZoom: 18
      //detectRetina:true
    }).addTo(this.map);

    this.leafletControlZoom = document.getElementsByClassName('leaflet-control-zoom')[0];

    //移動範囲を限定させる
    this.map.setMaxBounds(new L.LatLngBounds([-90, -180], [90, 180]));

    this.map.on('moveend', this.mapMoved.bind(this));
    this.map.on('zoomstart', this.mapZoomStart.bind(this));
    this.map.on('zoomend', this.mapZoomEnd.bind(this));

    this.cover = this.element.getElementsByClassName('cover')[0];
    this.copy = document.getElementsByClassName('leaflet-control-attribution')[0];

    this.pixiView = new _PixiView2.default();
    this.pixiView.element.addEventListener('ysdCallback', function (e) {
      var obj = e.detail.value;
      var latlng = this.map.getCenter();
      obj.lat = latlng.lat;
      obj.lng = latlng.lng;
      this.element.dispatchEvent(new CustomEvent('ysdCallback', { detail: { value: obj } }));
    }.bind(this));

    //ユーザーの現在地を取得
    this.checkGps();
    this.gpsIntervalId = setInterval(this.checkGps.bind(this), 5000);
  }

  _createClass(Map, [{
    key: 'show',
    value: function show() {

      this.element.style.display = 'block';
    }
  }, {
    key: 'hide',
    value: function hide() {

      this.element.style.display = 'none';
    }
  }, {
    key: 'setHeight',
    value: function setHeight(h) {

      this.element.style.height = h + 'px';

      if (h == 320) {
        this.container.style.transform = 'translateY(0px)';
      } else if (h == 150) {
        this.container.style.transform = 'translateY(-75px)';
      }
    }
  }, {
    key: 'mapMoved',
    value: function mapMoved() {}
  }, {
    key: 'mapZoomStart',
    value: function mapZoomStart() {}
  }, {
    key: 'mapZoomEnd',
    value: function mapZoomEnd() {}
  }, {
    key: 'setInterface',
    value: function setInterface(type) {

      switch (type) {

        case 'about':
          this.leafletControlZoom.style.display = 'none';
          this.cover.style.display = 'block';
          break;

        case 'map':
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
  }, {
    key: 'capture',
    value: function capture() {

      this.copy.style.display = 'none';

      html2canvas(this.container, { useCORS: true }).then(function (canvas) {
        var img = new Image();
        img.src = canvas.toDataURL();
        img.onload = function (img) {

          this.copy.style.display = 'block';
          this.pixiView.addMap(img);
        }.bind(this, img);
      }.bind(this));
    }
  }, {
    key: 'addStamp',
    value: function addStamp(img, index) {

      this.pixiView.drawStamp(img, index);
    }
  }, {
    key: 'addDecoration',
    value: function addDecoration(img, index) {

      this.pixiView.drawDecoration(img, index);
    }
  }, {
    key: 'addFilter',
    value: function addFilter(img, index) {

      this.pixiView.drawFilter(img, index);
    }
  }, {
    key: 'addText',
    value: function addText(text) {

      this.pixiView.drawText(text);
    }
  }, {
    key: 'addAnimation',
    value: function addAnimation(data) {

      this.pixiView.animation(data);
    }

    //ポップアップを作成

  }, {
    key: 'createPopup',
    value: function createPopup(data) {

      var content = L.DomUtil.create('div', 'popup');
      //content.innerHTML = data.title;

      var popup = L.popup({ autoPan: false, keepInView: true, autoClose: false, closeOnEscapeKey: false, closeOnClick: false }).setLatLng([Number(data.lat), Number(data.lng)]).setContent(content).openOn(this.map);

      var element = popup.getElement();

      //flickrだったら
      if (data.type == 'flickr') {

        var img = document.createElement('img');
        img.setAttribute('src', data.thumbnailSrc);
        content.appendChild(img);
        element.setAttribute('class', element.className + ' flickr');
      } else {
        //questionだったら

        this.addUserIcon(data.user_id, content);
        var span = document.createElement('span');
        span.innerHTML = data.title;
        content.appendChild(span);

        var rank = this.getRank(data);
        element.setAttribute('class', element.className + rank);
      }

      // var draggable = new L.Draggable(popup._container, popup._wrapper);
      // draggable.enable();

      L.DomEvent.on(element, 'click', this.popupClickHandler.bind(this, data));

      return popup;
    }
  }, {
    key: 'removeBoundsPopup',
    value: function removeBoundsPopup(key) {

      var length = this.popups[key].length;
      for (var i = 0; i < length; i++) {
        //var content = this.popups[ key ][i].getContent();
        var element = this.popups[key][i].getElement();
        L.DomEvent.off(element, 'click', this.popupClickHandler.bind(this));
        this.popups[key][i].remove();
        this.allPopupLength--;
      }

      if (this.allPopupLength < 0) this.allPopupLength = 0;

      delete this.popups[key];
    }
  }, {
    key: 'popupClickHandler',
    value: function popupClickHandler(data) {

      this.element.dispatchEvent(new CustomEvent('ysdCallback', { detail: { value: { type: 'popupClick', data: data } } }));
    }
  }, {
    key: 'checkGps',
    value: function checkGps() {

      navigator.geolocation.getCurrentPosition(function (pos) {

        var latLng = L.latLng(pos.coords.latitude, pos.coords.longitude);
        //console.log( latLng );

        if (this.userMaker) {

          this.userMaker.setLatLng(latLng);
        } else {
          //初回アクセス

          this.map.setView(latLng, 13);
          this.userMaker = L.marker([latLng.lat, latLng.lng]).addTo(this.map);
        }
      }.bind(this), function (error) {

        console.log(error);
        if (error.code == 1) {
          alert("位置情報の利用が許可されていません");
        }

        clearInterval(this.gpsIntervalId);
      }.bind(this), {
        enableHighAccuracy: true
      });
    }
  }, {
    key: 'generateGif',
    value: function generateGif() {

      this.pixiView.encodeGifAnimation(function () {
        this.pixiView.generateGifAnimation();
      }.bind(this));
    }
  }, {
    key: 'resize',
    value: function resize() {

      this.width = this.element.clientWidth;
      this.height = this.element.clientHeight;
      this.halfWidth = this.width * 0.5;
      this.halfHeight = this.height * 0.5;
    }
  }]);

  return Map;
}();

exports.default = Map;

},{"./PixiView":6,"./Util":9}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PixiView = function () {
	function PixiView() {
		_classCallCheck(this, PixiView);

		this.element = document.querySelector('.map .pixi');

		this.stage = new PIXI.Stage();
		this.renderer = PIXI.autoDetectRenderer(320, 320, { transparent: true, antialias: true, resolution: 2, backgroundColor: 0x00000000, preserveDrawingBuffer: true });
		this.element.appendChild(this.renderer.view);
		this.renderer.view.style.cssText = 'touchAction:auto;';
		this.renderer.plugins.interaction.autoPreventDefault = false;

		this.renderer.view.ontouchmove = function (e) {
			if (this.dragFlag) e.preventDefault();
		}.bind(this);

		setInterval(this.animate.bind(this), 1000 / 30);

		this.container = new PIXI.Container();
		this.container.x = 160;
		this.container.y = 160;
		this.stage.addChild(this.container);

		this.bg = new PIXI.Sprite();
		this.bg.anchor.x = 0.5;
		this.bg.anchor.y = 0.5;
		this.container.addChild(this.bg);

		this.stamps = [];
		this.decorations = [];
		this.filters = [null, new PIXI.filters.OldFilmFilter(), new PIXI.filters.ZoomBlurFilter(),
		//new PIXI.filters.AsciiFilter(),
		new PIXI.filters.DotFilter(), new PIXI.filters.PixelateFilter(),
		//new PIXI.filters.AdvancedBloomFilter({ threshold:0.5, brightness:0.3 }),
		new PIXI.filters.ColorMatrixFilter()];
		this.filters[2].center = [160, 160];
		//this.filters[3].size = 10; //ascii


		this.filterNames = ['なし', 'フィルム', 'ズーム', /*'Ascii',*/'ドット', 'モザイク', /*'Bloom',*/'グレー'];

		var _filters = document.querySelector('.editor .filters');
		var length = this.filters.length;
		for (var i = 0; i < length; i++) {
			var li = document.createElement('li');
			li.innerHTML = this.filterNames[i];
			_filters.appendChild(li);
		}
		_filters.style.width = length * 90 + 'px';

		this.stage.interactive = true;
		if (_Util2.default.ua.platform == 'pc') {
			this.stage.on('mousemove', this.moveHandler.bind(this));
			this.stage.on('mousedown', this.downHandler.bind(this));
			document.body.onmouseup = this.upHandler.bind(this);
		} else {
			this.stage.on('touchmove', this.moveHandler.bind(this));
			this.stage.on('touchstart', this.downHandler.bind(this));
			document.body.ontouchend = this.upHandler.bind(this);
		}

		this.text = new PIXI.Text('', { fontFamily: 'Arial', fontSize: 24, fill: 0xff6744, align: 'center' });
		this.text.y = 320 - 50;
		this.text.style.stroke = 0xffffff;
		this.text.style.strokeThickness = 10;
		this.stage.addChild(this.text);

		//osm copy
		this.copy = new PIXI.Container();
		this.copy.x = 172;
		this.copy.y = 304;
		this.stage.addChild(this.copy);

		var graphics = new PIXI.Graphics();
		graphics.beginFill(0xffffff, 0.7);
		graphics.drawRect(0, 0, 150, 16);
		graphics.endFill();
		this.copy.addChild(graphics);

		var text = new PIXI.Text('Map data © OpenStreetMap', { fontSize: 11, fill: 0x0078A8 });
		text.x = 5;
		text.y = 1;
		this.copy.addChild(text);

		//gif animation -----------------
		//インスタンスの生成
		this.refreshGifanimation();

		var canvas = document.createElement('canvas');
		canvas.setAttribute('width', 320);
		canvas.setAttribute('height', 320);
		this.gifCtx = canvas.getContext('2d');

		//カメラ　アニメーション用
		this.animationData = { frames: [] };
	}

	_createClass(PixiView, [{
		key: 'show',
		value: function show() {

			this.element.style.display = 'block';
		}
	}, {
		key: 'hide',
		value: function hide() {

			this.element.style.display = 'none';
		}
	}, {
		key: 'moveHandler',
		value: function moveHandler() {}
	}, {
		key: 'downHandler',
		value: function downHandler(e) {

			if (e.data.originalEvent.touches) {
				_Util2.default.mouseX = e.data.originalEvent.touches[0].pageX;
				_Util2.default.mouseY = e.data.originalEvent.touches[0].pageY;
			} else {
				_Util2.default.mouseX = e.data.originalEvent.pageX;
				_Util2.default.mouseY = e.data.originalEvent.pageY;
			}
		}
	}, {
		key: 'upHandler',
		value: function upHandler() {}
	}, {
		key: 'refreshGifanimation',
		value: function refreshGifanimation() {

			this.gifAnimation = new GIFEncoder(320, 320);
			this.gifAnimation.setRepeat(0);
			this.gifAnimation.setDelay(100);
			this.gifAnimation.start();
		}
	}, {
		key: 'addMap',
		value: function addMap(img) {

			var texture = new PIXI.Texture(new PIXI.BaseTexture(img));
			this.bg.texture = texture;
			if (_Util2.default.ua.platform != "pc") {
				this.bg.scale.set(0.5, 0.5);
			}
			// this.bg.width = 320;
			// this.bg.height = 320;

			console.log("add map...");
		}
	}, {
		key: 'drawStamp',
		value: function drawStamp(img) {

			if (!img) {
				for (var i = 0; i < this.stamps.length; i++) {
					this.container.removeChild(this.stamps[i]);
				}
				this.stamps = [];
				return;
			}

			var texture = new PIXI.Texture(new PIXI.BaseTexture(img));
			var stamp = new PIXI.Sprite(texture);
			stamp.anchor.x = 0.5;
			stamp.anchor.y = 0.5;
			stamp.x = 0;
			stamp.y = 0;
			stamp.scale.set(0.9);
			stamp.on('pointerdown', this.onDragStart.bind(this)).on('pointerup', this.onDragEnd.bind(this)).on('pointerupoutside', this.onDragEnd.bind(this)).on('pointermove', this.onDragMove);
			stamp.interactive = true;
			stamp.buttonMode = true;
			this.stamps.push(stamp);
			this.container.addChild(stamp);
		}
	}, {
		key: 'drawDecoration',
		value: function drawDecoration(img, index) {

			if (!img) {
				for (var i = 0; i < this.decorations.length; i++) {
					this.container.removeChild(this.decorations[i]);
				}
				this.decorations = [];
				return;
			}

			var texture = new PIXI.Texture(new PIXI.BaseTexture(img));
			this.decoration = new PIXI.Sprite(texture);
			this.decoration.y = 320 - this.decoration.height;
			// this.decoration.anchor.x = 0.5;
			// this.decoration.anchor.y = 0.5;
			this.decorations.push(this.decoration);
			this.stage.addChild(this.decoration);

			this.stage.addChild(this.text);
		}
	}, {
		key: 'drawFilter',
		value: function drawFilter(img, index) {

			if (this.filterNames[index] == 'なし') {
				this.container.filters = [];
				return;
			}

			this.container.filters = [this.filters[index]];

			if (this.filterNames[index] == 'Gray') {
				this.container.filters[0].desaturate();
			}
		}
	}, {
		key: 'drawText',
		value: function drawText(text) {

			this.text.text = text;
			this.text.x = (320 - this.text.width) * 0.5;
			this.stage.addChild(this.text);
		}
	}, {
		key: 'animation',
		value: function animation(data) {

			var count = 0;
			var length = data.frames.length;

			this.animationData = data;
			this.container.x = 160;
			this.container.y = 160;
			this.container.scale.set(1);

			clearInterval(this.animationSampleInterval);
			if (length == 0) {
				return;
			}

			this.animationSampleInterval = setInterval(function () {

				var s = data.frames[count].scale;
				this.container.scale.set(s);

				count++;
				if (count == length) count = 0;
			}.bind(this), 100);
		}

		//-------------------------------

	}, {
		key: 'stageScaleAnimation0',
		value: function stageScaleAnimation0(count, length) {

			var rot = 180 * (count / length);
			var s = 1 + Math.sin(Math.PI / 180 * rot);
			this.container.scale.set(s);
		}

		//--------------generate gif animation-----------------

	}, {
		key: 'encodeGifAnimation',
		value: function encodeGifAnimation(callback) {

			if (this.encodeInterval) return;

			clearInterval(this.animationSampleInterval);
			this.container.x = 160;
			this.container.y = 160;
			this.container.scale.set(1);

			var frameLength = this.animationData.frames.length;
			if (frameLength == 0) {
				callback();
				return;
			}

			var count = 0;
			this.encodeInterval = setInterval(function () {

				//this.stageScaleAnimation0( count, frameLength-1 );
				var frame = this.animationData.frames[count];
				var s = frame.scale;
				this.container.scale.set(s);
				this.addGifFrame();

				count++;
				if (count == frameLength) {
					clearInterval(this.encodeInterval);
					this.encodeInterval = null;
					callback();
				}
			}.bind(this), 100);
		}
	}, {
		key: 'addGifFrame',
		value: function addGifFrame() {

			// this.renderer.view.style.width = '320px';
			// this.renderer.view.style.height = '320px';

			this.gifCtx.drawImage(this.renderer.view, 0, 0, 320, 320);
			// this.drawCopy( this.gifCtx );
			this.gifAnimation.addFrame(this.gifCtx);

			// this.renderer.view.style.width = '320px';
			// this.renderer.view.style.height = '320px';
		}
	}, {
		key: 'drawCopy',
		value: function drawCopy(ctx) {

			ctx.beginPath();
			ctx.fillStyle = 'rgba(255, 255, 255, 0.7 )';
			ctx.rect(160, 304, 160, 16);
			ctx.fill();
			ctx.font = '11px';
			ctx.fillStyle = '#0078A8';
			ctx.fillText('Map data © OpenStreetMap', 165, 307);
		}
	}, {
		key: 'generateGifAnimation',
		value: function generateGifAnimation() {

			var image = document.createElement('img');

			var frameLength = this.animationData.frames.length;
			//0フレームのときはただのPNG
			if (frameLength == 0) {

				this.addCopy();
				var url = this.renderer.view.toDataURL("image/png");
				//image.src = url;
				blob = this.dataURLtoBlob(url);

				//フレームがあるときはgifアニメ
			} else {

				//GIFアニメーションの生成終了
				this.gifAnimation.finish();

				var bin = new Uint8Array(this.gifAnimation.stream().bin);
				var blob = new Blob([bin.buffer], { type: 'image/gif' });
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
			if (frameLength == 0) imgType = 'png';
			this.element.dispatchEvent(new CustomEvent('ysdCallback', { detail: { value: { type: 'generateBlob', blob: blob, content: this.text.text, imgType: imgType } } }));
		}
	}, {
		key: 'dataURLtoBlob',
		value: function dataURLtoBlob(dataurl) {
			var bin = atob(dataurl.split("base64,")[1]);
			var len = bin.length;
			var barr = new Uint8Array(len);
			for (var i = 0; i < len; i++) {
				barr[i] = bin.charCodeAt(i);
			}
			return new Blob([barr], {
				type: 'image/jpeg'
			});
		}

		//----------------mouse event---------------------

	}, {
		key: 'onDragStart',
		value: function onDragStart(e) {
			this.dragFlag = true;
			var target = e.currentTarget;
			target.data = e.data;
			target.alpha = 0.8;
			target.dragging = true;
		}
	}, {
		key: 'onDragEnd',
		value: function onDragEnd(e) {
			this.dragFlag = false;
			var target = e.currentTarget;
			target.data = null;
			target.alpha = 1;
			target.dragging = false;
		}
	}, {
		key: 'onDragMove',
		value: function onDragMove() {
			if (this.dragging) {
				var newPosition = this.data.getLocalPosition(this.parent);
				this.x = newPosition.x;
				this.y = newPosition.y;
			}
		}
	}, {
		key: 'animate',
		value: function animate() {

			this.renderer.render(this.stage);
		}
	}]);

	return PixiView;
}();

exports.default = PixiView;

},{"./Util":9}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Share = function () {
  function Share() {
    _classCallCheck(this, Share);

    this.element = document.querySelector('.share');

    var btns = this.element.getElementsByClassName('btn0');
    btns[0].addEventListener(_Util2.default.clickEventName, this.btnClickHandler.bind(this, 'twitter'));
    btns[1].addEventListener(_Util2.default.clickEventName, this.btnClickHandler.bind(this, 'facebook'));
    btns[2].addEventListener(_Util2.default.clickEventName, this.btnClickHandler.bind(this, 'download'));

    this.authenticity_token = document.getElementById('authenticity_token').value;

    //FaceBookのSDKをロード
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function () {
      FB.init({
        appId: '1604539589666300',
        version: 'v2.7' // or v2.1, v2.2, v2.3, ...
      });

      FB.getLoginStatus(function (e) {
        if (e.authResponse) {
          _Util2.default.faceBookLoginFlag = true;
          _Util2.default.faceBookUserId = e.authResponse.userID;
          _Util2.default.faceBookToken = e.authResponse.accessToken;
        }
      });
    });

    if (localStorage.getItem('twitterImgBase64') && _Util2.default.loginProvider == 'twitter') {
      _Util2.default.loading.showLoading('Twitterに投稿しています。');
      var base64 = localStorage.getItem('twitterImgBase64');
      var type = localStorage.getItem('twitterImgType');
      var message = localStorage.getItem('twitterMessage');
      var blob = this.dataURLtoBlob(base64, type);
      this.postTwitter(blob, type, message);
      localStorage.removeItem('twitterImgBase64');
      localStorage.removeItem('twitterImgType');
      localStorage.removeItem('twitterMessage');
    }
  }

  _createClass(Share, [{
    key: 'show',
    value: function show(img) {

      this.element.style.display = 'block';
    }
  }, {
    key: 'hide',
    value: function hide() {

      this.element.style.display = 'none';
    }
  }, {
    key: 'btnClickHandler',
    value: function btnClickHandler(provider, e) {

      if (_Util2.default.ua.platform != 'pc') {
        if (new Date().getTime() - _Util2.default.downTime > 200) return;
      }

      this.provider = provider;
      _Util2.default.loading.showLoading('Gifアニメを生成しています。');
      this.element.dispatchEvent(new CustomEvent('ysdCallback', { detail: { value: { type: 'generateGif' } } }));
    }
  }, {
    key: 'submit',
    value: function submit(blob, lat, lng, content, imgType) {

      this.blob = blob;

      var formData = new FormData();
      formData.append('upfile', blob, 'anime.gif');
      formData.append('title', content);
      formData.append('content', content);
      formData.append('lat', lat);
      formData.append('lng', lng);
      formData.append('user_id', _Util2.default.userId);
      formData.append('image_type', imgType);
      formData.append('provider', this.provider);
      formData.append('authenticity_token', this.authenticity_token);

      var url = _Util2.default.apiHeadUrl + '/post_images/create.json';
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
          this.submitStep2(result.id, imgType, result.content);
        }.bind(this),
        error: function (result) {
          _Util2.default.loading.hideLoading();
          alert('あれれ、エラーです。もう一度試してみよう！');
        }.bind(this)
      });
    }
  }, {
    key: 'submitStep2',
    value: function submitStep2(postImageId, imgType, content) {

      this.postImageId = postImageId;

      //ダウンロード
      if (this.provider == 'download') {

        var a = document.createElement('a');
        var url = window.URL.createObjectURL(this.blob);
        a.href = url;
        a.download = "mappop.gif";
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        _Util2.default.loading.hideLoading();
      } else if (this.provider == 'facebook') {

        // var mobileFlag = false;
        // if( Util.ua.platform != 'pc' ) mobileFlag = true;
        if (_Util2.default.ua.browser == 'safari') {
          _Util2.default.loading.setText('投稿ボタンを押して下さい。');
          _Util2.default.loading.showFaceBookShareBtn(this.shareFaceBook.bind(this, content));
        } else {
          _Util2.default.loading.setText('FaceBookに投稿しています。');
          this.shareFaceBook(content);
        }
      } else if (this.provider == 'twitter') {

        _Util2.default.loading.setText('Twitterに投稿しています。');

        //Twitterでログインしていない場合はログインさせる
        //画像データを一時保存
        if (_Util2.default.loginProvider != 'twitter') {
          var reader = new FileReader();
          reader.readAsDataURL(this.blob);
          reader.onloadend = function () {
            var dataURI = reader.result;
            localStorage.setItem('twitterImgBase64', dataURI);
            localStorage.setItem('twitterImgType', imgType);
            localStorage.setItem('twitterMessage', content);
            location.href = '/auth/twitter';
          };
          return;
        }

        this.postTwitter(this.blob, imgType, content);
      }
    }
  }, {
    key: 'postTwitter',
    value: function postTwitter(blob, type, message) {

      var formData = new FormData();
      var name = 'anime.' + type;
      formData.append('upfile', blob, name);
      formData.append('provider', 'twitter');
      message += ' | スタンプでデコって現在地を共有できるwebサービスMapPop！ #MapPop Map data openstreetmap.org';
      formData.append('message', message);

      var url = _Util2.default.apiHeadUrl + '/home/post_sns';
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
          _Util2.default.loading.hideLoading();
          alert('投稿完了！');
        }.bind(this),
        error: function (result) {
          _Util2.default.loading.hideLoading();
          alert('あれれ、エラーです。もう一度試してみよう！');
        }.bind(this)
      });
    }
  }, {
    key: 'shareFaceBook',
    value: function shareFaceBook(message) {

      message += 'スタンプでデコって現在地を共有できるwebサービスMapPop！ Map data openstreetmap.org';
      var postImageUrl = 'https://www.mappop.me/post_images/' + this.postImageId;
      FB.ui({
        method: 'share',
        href: postImageUrl,
        hashtag: '#MapPop',
        // quote:message,
        app_id: 1604539589666300
        // redirect_uri:Util.apiHeadUrl,
        // mobile_iframe: mobileFlag
      }, function (response) {
        if (response) alert('投稿完了！');
        _Util2.default.loading.hideLoading();
      }.bind(this));
    }

    // refreshFacebookDebugger( postImageId ){

    //   var url = Util.apiHeadUrl + '/home/refresh_facebook_debugger';
    //   $.ajax({
    //       url:url,
    //       type:'POST',
    //       data:{
    //         post_image_id:postImageId
    //       },
    //       success:function( result ){
    //           console.log( result );
    //       }.bind( this ),
    //       error:function( result ){
    //           console.log( result );
    //       }.bind( this )
    //   });

    // }


  }, {
    key: 'getFormData',
    value: function getFormData(filename, mimeType, imageData, message) {

      // this is the multipart/form-data boundary we'll use
      var boundary = '----ThisIsTheBoundary1234567890';

      // let's encode our image file, which is contained in the var
      var formData = '--' + boundary + '\r\n';
      formData += 'Content-Disposition: form-data; name="source"; filename="' + filename + '"\r\n';
      formData += 'Content-Type: ' + mimeType + '\r\n\r\n';
      for (var i = 0; i < imageData.length; ++i) {
        formData += String.fromCharCode(imageData[i] & 0xff);
      }
      formData += '\r\n';
      formData += '--' + boundary + '\r\n';
      formData += 'Content-Disposition: form-data; name="message"\r\n\r\n';
      formData += message + '\r\n';
      formData += '--' + boundary + '--\r\n';

      return formData;
    }
  }, {
    key: 'getFormData2',
    value: function getFormData2(dataURI) {

      var byteString = atob(dataURI.split(',')[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], {
        type: 'image/gif'
      });
    }
  }, {
    key: 'dataURLtoBlob',
    value: function dataURLtoBlob(dataurl, type) {
      var bin = atob(dataurl.split("base64,")[1]);
      var len = bin.length;
      var barr = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        barr[i] = bin.charCodeAt(i);
      }
      return new Blob([barr], {
        type: 'image/' + type
      });
    }
  }, {
    key: 'resize',
    value: function resize() {

      this.width = this.element.clientWidth;
      this.height = this.element.clientHeight;
      this.halfWidth = this.width * 0.5;
      this.halfHeight = this.height * 0.5;
    }
  }]);

  return Share;
}();

exports.default = Share;

},{"./Util":9}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/****************************************************************/
//UserAgent
/****************************************************************/

var UserAgent = function UserAgent() {
	_classCallCheck(this, UserAgent);

	var ua = navigator.userAgent.toLowerCase();
	var ver = window.navigator.appVersion.toLowerCase();
	var browser = '';
	var ieVer = 9999;
	if (ua.indexOf("msie") != -1) {
		browser = 'ie';
		if (ver.indexOf("msie 6.") != -1) {
			ieVer = 6;
		} else if (ver.indexOf("msie 7.") != -1) {
			ieVer = 7;
		} else if (ver.indexOf("msie 8.") != -1) {
			ieVer = 8;
		} else if (ver.indexOf("msie 9.") != -1) {
			ieVer = 9;
		} else if (ver.indexOf("msie 10.") != -1) {
			ieVer = 10;
		}
	} else if (ua.indexOf('trident/7') != -1) {
		browser = 'ie';
		ieVer = 11;
	} else if (ua.indexOf('chrome') != -1) {
		browser = 'chrome';
	} else if (ua.indexOf('safari') != -1) {
		browser = 'safari';
	} else if (ua.indexOf('firefox') != -1) {
		browser = 'firefox';
	} else if (ua.indexOf('opera') != -1) {
		browser = 'opera';
	}

	ua = navigator.userAgent;
	var twitterFlag = false;
	if (ua.search(/Twitter/) != -1) twitterFlag = true;
	var platform = 'pc';
	if (ua.search(/iPhone/) != -1) {
		platform = "sp";
	} else if (ua.search(/Android/) != -1 && ua.search(/Mobile/) != -1) {
		platform = "sp";
	} else if (ua.search(/iPad/) != -1 || ua.search(/Android/) != -1) {
		platform = "ipad";
	}

	this.browser = browser;
	this.ieVer = ieVer;
	this.platform = platform;

	this.isAndroid = navigator.userAgent.search(/Android/) > 0 ? true : false;
	this.androidVersion = -1;
	if (this.isAndroid) this.androidVersion = parseFloat(ua.slice(ua.indexOf("Android") + 8));

	this.is_iOS = navigator.userAgent.search(/iPhone/) > 0 || navigator.userAgent.search(/iPod/) > 0 || navigator.userAgent.search(/iPad/) > 0 ? true : false;
	this.iosVersion = -1;
	if (this.is_iOS) {
		var v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
		this.iosVersion = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
	}
};

exports.default = UserAgent;

},{}],9:[function(require,module,exports){
'use strict';

module.exports = {

	ua: null,
	mouseX: 0,
	mouseY: 0,

	userId: -1,

	loading: null,

	downTime: 0,
	faceBookUserId: '',
	faceBookToken: '',

	//apiHeadUrl : 'http://localhost:3000',
	apiHeadUrl: 'https://www.mappop.me'

};

},{}]},{},[4]);
