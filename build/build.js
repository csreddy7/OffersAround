/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"use strict;";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dialog;
function dialog(params) {
  this.params = params;
  this.init = function () {
    var request = new XMLHttpRequest(),
        response = "",
        _this = this;
    request.onreadystatechange = function () {
      if (this.readyState == 4) {
        response = this.responseText;
        render();
      }
    };
    request.open("GET", this.params.templateUrl, true);
    request.send();

    function render() {
      var ch = response;
      var template = '<section class="offer-details-dialog">' + '<div class="offer-dialog-header"><span><h8>' + _this.params.title + '</h8></span><span ><i class="fa fa-window-close close-dialog" aria-hidden="true"></i></span></div>' + '<div>' + ch + '</div>' + '</section>';
      var keys = Object.keys(params);
      keys.forEach(function (e) {
        template = template.replace("{{params." + e + "}}", params[e]);
      });

      var offer = document.createElement("div"),
          parent = document.getElementById("offersAround");
      offer.innerHTML = template;
      parent.appendChild(offer);
      offer.addEventListener("click", function () {
        var target = event.target;
        if (target.className.indexOf("close-dialog") != -1) {
          +parent.removeChild(offer);
        }
      });
    }
  };
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _offer = __webpack_require__(2);

var _offer2 = _interopRequireDefault(_offer);

var _dialog = __webpack_require__(0);

var _dialog2 = _interopRequireDefault(_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var offers = 0;
window.onload = function () {
  /*var location=document.getElementsByClassName("location"),locationName="";
  navigator.geolocation.getCurrentPosition(function(data){
  location[0].innerHTML="Location coordinates:"+data.coords.latitude+","+data.coords.longitude;
  });*/

  var obj = new _offer2.default("two jeans at 300rs", "k r puram");
  obj.init();

  var menuIcon = document.getElementById("menu-icon"),
      menu = document.getElementById("offer-menu");

  menuIcon.addEventListener("click", function () {
    if (menuIcon.className.indexOf("rotate-menu") != -1) {
      menuIcon.setAttribute("class", "menu-icon");
    } else {
      menuIcon.setAttribute("class", "menu-icon rotate-menu");
    }
    if (menu.className.indexOf("show-menu") == -1) {
      menu.setAttribute("class", "offer-menu show-menu");
    } else {
      menu.setAttribute("class", "offer-menu hide-menu");
    }
  });

  document.getElementsByClassName("main-content")[0].addEventListener("click", function () {
    if (menuIcon.className.indexOf("rotate-menu") != -1) {
      menuIcon.setAttribute("class", "menu-icon");
    }
    if (menu.className.indexOf("show-menu") != -1) {
      menu.setAttribute("class", "offer-menu hide-menu");
    }
  });

  document.getElementById("register").addEventListener("click", function () {
    this.dialog = new _dialog2.default({
      title: "User Registration",
      templateUrl: "Registration.html"
    });
    this.dialog.init();
  });
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = CreateOffer;

var _dialog = __webpack_require__(0);

var _dialog2 = _interopRequireDefault(_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var offerNumber = 0;
function CreateOffer(offerName, locationName, offerDetails, comments) {
	this.offerName = offerName;
	this.offerLocation = locationName;
	this.offerDetails = offerDetails || "No offer details";
	this.comments = comments || [];
	this.id = "offer-item-" + ++offerNumber;
	this.init = function () {
		var template = '<div class="offer">' + '<div class="offerLeftPart">' + '<div class="offer-name"><i class="fa fa-tags" aria-hidden="true"></i> <span>' + this.offerName + '</span></div>' + '<div class="offer-location"><i class="fa fa-map-marker" aria-hidden="true"></i> <span>' + this.offerLocation + '</span></div>' + '</div>' + '<div class="offerRightPart">' + '<div class="offerRightTop"><span>Expires in :</span><span class="expire-time">2 hr 59 mins</span><span ><i class="fa fa-window-close close-offer" aria-hidden="true"></i></span></div>' + '<div class="offerRightBottom"><span class="offerlink view-details-link">view details</span><span class="offerlink add-comment-link">add comment</span><span class="offerlink view-comments-link">view comments</span></div>' + '</div>' + '<div>' + '<div class="add-comment">' + '<input type="text" class="comment-box" tabindex="4" id="comment-box" value="" placeholder="type comment" /><span><i tabindex="5" class="fa fa-plus add-comment-button" aria-hidden="true"></i></span>' + '</div>' + '<div class="comment-list" id="comment-list">' + '<div><i class="fa fa-window-close close-comments" aria-hidden="true"></i></div>' + '<div id="comment-content"></div>';
		'</div>' + '</div>' + '</div>';
		var offer = document.createElement("div");
		offer.innerHTML = template;
		offer.id = this.id;
		document.getElementById("offer-list").appendChild(offer);
		this.initializeEventHanders(offer);
		this.addComments();
	};
	this.addComment = function () {
		var target = document.querySelector("#" + this.id + " .add-comment");
		target.style.display = "block";
	};
	this.showComments = function () {
		var target = document.querySelector("#" + this.id + " .comment-list");
		target.style.display = "block";
	};
	this.showDetails = function () {
		this.dialog = new _dialog2.default({ title: "Offer Details", name: this.offerName, locationName: this.offerLocation, details: this.offerDetails, templateUrl: "offer-details.html" });
		this.dialog.init();
	};
	this.createComment = function () {
		var value = document.getElementById("comment-box").value,
		    obj = {};
		obj.username = "chandu";
		obj.comment = value;
		var comment = this.getComment(obj);
		document.getElementById("comment-content").appendChild(comment);
		document.getElementById("comment-box").value = "";
		document.querySelector("#" + this.id + " .add-comment").style.display = "none";
	};
	this.addComments = function () {
		var _this = this;
		this.comments.forEach(function (e) {
			var comment = _this.getComment(e);
			document.getElementById("comment-content").appendChild(comment);
		});
	};
	this.getComment = function (obj) {
		var template = "<span class='username'>" + obj.username + ":</span><span>" + obj.comment + "</span>";
		var comment = document.createElement("div");
		comment.className = "offer-comment";
		comment.innerHTML = template;
		return comment;
	};
	this.initializeEventHanders = function (offer) {
		var _this = this;
		offer.addEventListener("click", function (event) {
			var target = event.target;
			if (target.className.indexOf("view-details-link") != -1) {
				_this.showDetails();
			} else if (target.className.indexOf("add-comment-link") != -1) {
				_this.addComment();
			} else if (target.className.indexOf("view-comments-link") != -1) {
				_this.showComments();
			} else if (target.className.indexOf("close-offer") != -1) {
				document.getElementById(_this.id).style.display = "none";
			} else if (target.className.indexOf("add-comment-button") != -1) {
				_this.createComment();
			} else if (target.className.indexOf("close-comments") != -1) {
				document.getElementById("comment-list").style.display = "none";
			}
		});
	};
}

/***/ })
/******/ ]);