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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dialog = function () {
  function Dialog(params) {
    _classCallCheck(this, Dialog);

    this.params = params;
    this.parent = document.querySelectorAll(".offersAround")[0];
    this.init();
  }

  _createClass(Dialog, [{
    key: "init",
    value: function init() {
      var _this = this;

      // getting dialog template using ajax call
      var firstPromise = new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open("GET", "resources/utilities/Dialog/dialog.html", true);
        request.onload = function () {
          return resolve(request.responseText);
        };
        request.onerror = function () {
          return reject(request.statusText);
        };
        request.send();
      });

      firstPromise.then(function (response) {
        return renderDialogTemplate(response);
      }, function (error) {
        console.error("error while loading dialog template");
      }).then(function (dialog) {
        var secondPromise = new Promise(function (resolve, reject) {
          var request = new XMLHttpRequest();
          request.open("GET", _this.params.templateUrl, true);
          request.onload = function () {
            return resolve(request.responseText);
          };
          request.onerror = function () {
            return reject(request.statusText);
          };
          request.send();
        });
        secondPromise.then(function (dialogContent) {
          renderDialogContent(dialog, dialogContent);
        }, function (error) {
          console.error("error while loading dialog content template");
        });
      });

      // rendering the dialog template
      var renderDialogTemplate = function renderDialogTemplate(dialogTemplate) {
        var dialog = document.createElement("div");
        dialog.innerHTML = dialogTemplate;
        _this.parent.appendChild(dialog);
        return dialog;
      };

      // rendering the dialog template with given parameters and content
      var renderDialogContent = function renderDialogContent(dialog, dialogContent) {
        var keys = Object.keys(_this.params);
        keys.forEach(function (e) {
          dialogContent = dialogContent.replace("{{params." + e + "}}", _this.params[e]);
        });
        dialog.querySelectorAll(".dialog-title")[0].innerHTML = _this.params.title;
        dialog.querySelectorAll(".dialog-content")[0].innerHTML = dialogContent;
        _this.initializeEventHandlers(dialog);
      };
    }
  }, {
    key: "initializeEventHandlers",
    value: function initializeEventHandlers(dialog) {
      var _this2 = this;

      dialog.addEventListener("click", function (event) {
        var target = event.target;
        if (target.className.indexOf("close-dialog") != -1) {
          _this2.parent.removeChild(dialog);
        }
      });
    }
  }]);

  return Dialog;
}();

exports.Dialog = Dialog;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _offer = __webpack_require__(2);

var _dialog = __webpack_require__(0);

var offers = 0;
window.onload = function () {
  var _this = this;

  // adding offers to main content
  for (var i = 0; i < 2; i++) {
    var obj = new _offer.CreateOffer("Two jeans at 300rs", "k r puram" + i);
    obj.init();
  }

  // initializing event handlers
  var menuIcon = document.querySelectorAll(".fa-bars")[0],
      menu = document.querySelectorAll(".menu-list")[0],
      registerIcon = document.querySelectorAll("#register")[0],
      loginIcon = document.querySelectorAll("#login")[0],
      logoutIcon = document.querySelectorAll("#logout")[0],
      addOfferIcon = document.querySelectorAll("#addoffer")[0],
      main = document.querySelectorAll("main")[0],
      register = document.querySelectorAll("#register")[0],
      login = document.querySelectorAll("#login")[0];

  logoutIcon.style.display = "none";
  addOfferIcon.style.display = "none";

  menuIcon.addEventListener("click", function () {
    if (menuIcon.className.indexOf("rotate-menu") != -1) {
      menuIcon.setAttribute("class", "fa fa-bars");
    } else {
      menuIcon.setAttribute("class", "fa fa-bars rotate-menu");
    }
    if (menu.className.indexOf("show-menu") == -1) {
      menu.setAttribute("class", "menu-list show-menu");
    } else {
      menu.setAttribute("class", "menu-list hide-menu");
    }
  });

  main.addEventListener("click", function () {
    if (menuIcon.className.indexOf("rotate-menu") != -1) {
      menuIcon.setAttribute("class", "fa fa-bars");
    }
    if (menu.className.indexOf("show-menu") != -1) {
      menu.setAttribute("class", "menu-list hide-menu");
    }
  });

  register.addEventListener("click", function () {
    _this.dialog = new _dialog.Dialog({
      title: "User Registration",
      templateUrl: "app_modules/registration/Registration.html"
    });
  });

  login.addEventListener("click", function () {
    _this.dialog = new _dialog.Dialog({
      title: "Login",
      templateUrl: "app_modules/login/login.html"
    });
  });
};

/*location code
var location=document.getElementsByClassName("location"),locationName="";
navigator.geolocation.getCurrentPosition(function(data){
location[0].innerHTML="Location coordinates:"+data.coords.latitude+","+data.coords.longitude;
});*/

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CreateOffer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dialog = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreateOffer = function () {
	function CreateOffer(offerName, offerDetails, offerLocation) {
		_classCallCheck(this, CreateOffer);

		this.offerDetails = offerDetails || "No offer details";
		this.offerLocation = offerLocation || "location unknown";
		this.offerName = offerName;
		this.id = "offer-item-" + ++CreateOffer.offerNumber;
		this.init();
	}

	_createClass(CreateOffer, [{
		key: "init",
		value: function init() {
			var _this = this;

			var request = new XMLHttpRequest(),
			    offer = document.createElement("div");
			var response = "";

			request.onreadystatechange = function () {
				if (this.readyState == 4) {
					response = this.responseText;
					render();
				}
			};
			request.open("GET", "resources/utilities/Offer/offer.html", true);
			request.send();

			var render = function render() {
				var template = "" + response;
				offer.innerHTML = template;
				offer.id = _this.id;
				offer.className = "offer clear-fix";
				document.getElementById("offersList").appendChild(offer);
				offer.querySelectorAll(".offerName")[0].innerHTML = _this.offerName;
				offer.querySelectorAll(".offerContent")[0].innerHTML = _this.offerDetails;
				_this.initializeEventHanders(offer);
			};
		}
	}, {
		key: "initializeEventHanders",
		value: function initializeEventHanders(offer) {
			var _this2 = this;

			/*offer.addEventListener("mouseenter",function(event){
   	offer.querySelector(".sideBar").style.display="block";
   	console.log("mouseenter")
   });
   offer.addEventListener("mouseleave",function(event){
   	console.log("mousout")
   	offer.querySelector(".sideBar").style.display="none";
   });*/
			offer.addEventListener("click", function (event) {
				var target = event.target;
				if (target.className.indexOf("view-details-link") != -1) {
					_this2.showOfferDetails();
				} else if (target.className.indexOf("add-comment-link") != -1) {
					_this2.showAddCommentBox();
				} else if (target.className.indexOf("view-comments-link") != -1) {
					_this2.showCommentsBox();
				} else if (target.className.indexOf("add-comment-button") != -1) {
					_this2.createComment();
				} else if (target.className.indexOf("close-comments") != -1) {
					document.querySelectorAll("#" + _this2.id + " .comment-list")[0].style.display = "none";
				}
			});
		}
	}, {
		key: "showOfferDetails",
		value: function showOfferDetails() {
			this.dialog = new _dialog.Dialog({ title: "Offer Details", name: this.offerName, locationName: this.offerLocation, details: this.offerDetails, templateUrl: "app_modules/main/offer-details.html" });
		}
	}, {
		key: "showAddCommentBox",
		value: function showAddCommentBox() {
			var target = document.querySelector("#" + this.id + " .add-comment");
			target.style.display = "block";
		}
	}, {
		key: "showCommentsBox",
		value: function showCommentsBox() {
			var target = document.querySelector("#" + this.id + " .comment-list");
			target.style.display = "block";
		}
	}, {
		key: "createComment",
		value: function createComment() {
			var value = document.getElementById("comment-box").value,
			    obj = {};
			obj.username = "chandu";
			obj.comment = value;
			var comment = this.getComment(obj);
			document.getElementById("comment-content").appendChild(comment);
			document.getElementById("comment-box").value = "";
			document.querySelector("#" + this.id + " .add-comment").style.display = "none";
		}
	}, {
		key: "getComment",
		value: function getComment(obj) {
			var template = "<span class='username'>" + obj.username + ":</span><span>" + obj.comment + "</span>";
			var comment = document.createElement("div");
			comment.className = "offer-comment";
			comment.innerHTML = template;
			return comment;
		}
	}]);

	return CreateOffer;
}();

CreateOffer.offerNumber = 0;

exports.CreateOffer = CreateOffer;

/***/ })
/******/ ]);