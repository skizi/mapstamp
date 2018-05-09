(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _UserAgent = require('./UserAgent');

var _UserAgent2 = _interopRequireDefault(_UserAgent);

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } //import MainMenu from './MainMenu';


document.addEventListener("DOMContentLoaded", function () {
		new Common();
});

var Common = function Common() {
		_classCallCheck(this, Common);

		_Util2.default.ua = new _UserAgent2.default();

		// this.mainMenuBtn = document.getElementsByClassName( 'main_menu_btn' )[0];
		// this.mainMenuBtn.addEventListener( 'click', this.mainMenuBtnClickHandler.bind( this ) );
		//this.mainMenu = new MainMenu();

		//拡大禁止
		// var inputs = document.getElementsByTagName( 'input' );
		// for( var i = 0; i < inputs.length; i++ ){
		// 	if( inputs[i].getAttribute( 'type' ) == 'text' ){
		// 		inputs[i].addEventListener('touchstart', event => {
		// 			event.preventDefault();
		// 		}, false);
		// 	}
		// }

		// var textareas = document.getElementsByTagName( 'textarea' );
		// for( var i = 0; i < textareas.length; i++ ){
		// 	textareas[i].addEventListener('touchstart', event => {
		// 		event.preventDefault();
		// 	}, false);
		// }

		// if( Util.ua.platform == 'sp' ){
		// 	var wrapper = document.getElementsByClassName( 'wrapper' )[0];
		// 	wrapper.style.zoom = window.innerWidth / 375;
		// }
}

// mainMenuBtnClickHandler(){

// 	this.mainMenu.show();

// }
;

},{"./UserAgent":2,"./Util":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

module.exports = {

	ua: null,
	mouseX: 0,
	mouseY: 0,

	loading: null,

	apiHeadUrl: 'http://localhost:3000'
	//apiHeadUrl : 'https://www.mappop.me',

};

},{}]},{},[1]);
