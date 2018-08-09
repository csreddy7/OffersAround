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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var obj = {
	getTemplate: function getTemplate(templateUrl) {
		var request = new XMLHttpRequest();
		request.open("GET", templateUrl, true);
		request.send();
		return request;
	},
	loginUser: function loginUser(mobileNumber, passWord) {
		var data = {
			"mobileNumber": mobileNumber,
			"passWord": passWord
		};
		return this.post("/login", data);
	},
	registerUser: function registerUser(userName, mobileNumber, passWord) {
		var data = {
			"mobileNumber": mobileNumber,
			"passWord": passWord,
			"userName": userName
		};
		return this.post("/register", data);
	},
	getOffers: function getOffers() {
		return this.get("/getOffers?location=" + localStorage.getItem("location"));
	},
	addOffer: function addOffer(offerName, offerContent) {
		var data = {
			"offerName": offerName,
			"locationName": localStorage.getItem("location"),
			"offerContent": offerContent,
			"createdBy": localStorage.getItem("userId")
		};
		return this.post("/addOffer", data);
	},
	editOffer: function editOffer(offerId, offerName, offerContent) {
		var data = {
			"offerId": offerId,
			"offerName": offerName,
			"locationName": localStorage.getItem("location"),
			"offerContent": offerContent
		};
		return this.put("/editOffer", data);
	},
	deleteOffer: function deleteOffer(offer) {
		return this.delete("/deleteOffer", offer);
	},
	makeFavourite: function makeFavourite(offer) {
		return this.post("/makeFavourite", offer);
	},
	createComment: function createComment(offer, comment) {
		var data = {
			"offerId": offer._id,
			"comment": comment,
			"createdBy": localStorage.getItem("userId")
		};
		return this.post("/addComment", data);
	},
	saveComment: function saveComment(id, comment) {
		var data = {
			"id": id,
			"comment": comment
		};
		return this.put("/saveComment", data);
	},
	deleteComment: function deleteComment(comment) {
		return this.delete("/deleteComment", comment);
	},
	post: function post(url, data) {
		var promise = new Promise(function (resolve, reject) {
			var request = new XMLHttpRequest();
			request.open("POST", url, true);
			request.onload = function () {
				if (request.status === 200) {
					resolve(request.responseText);
				} else {
					reject(request.responseText);
				}
			};
			request.onerror = function () {
				console.log("error while login");
			};
			request.setRequestHeader("Content-Type", "application/json");
			request.send(JSON.stringify(data));
		});
		return promise;
	},
	get: function get(url) {
		var promise = new Promise(function (resolve, reject) {
			var request = new XMLHttpRequest();
			request.open("GET", url, true);
			request.onload = function () {
				if (request.status === 200) {
					resolve(request.responseText);
				} else {
					reject(request.responseText);
				}
			};
			request.onerror = function (err) {
				console.log(err);
			};
			request.send();
		});
		return promise;
	},
	delete: function _delete(url, data) {
		console.log(data);
		var promise = new Promise(function (resolve, reject) {
			var request = new XMLHttpRequest();
			request.open("DELETE", url, true);
			request.onload = function () {
				if (request.status === 200) {
					resolve(request.responseText);
				} else {
					reject(request.responseText);
				}
			};
			request.onerror = function () {
				console.log("error while login");
			};
			request.setRequestHeader("Content-Type", "application/json");
			request.send(JSON.stringify(data));
		});
		return promise;
	},
	put: function put(url, data) {
		console.log(data);
		var promise = new Promise(function (resolve, reject) {
			var request = new XMLHttpRequest();
			request.open("PUT", url, true);
			request.onload = function () {
				if (request.status === 200) {
					resolve(request.responseText);
				} else {
					reject(request.responseText);
				}
			};
			request.onerror = function () {
				console.log("error while login");
			};
			request.setRequestHeader("Content-Type", "application/json");
			request.send(JSON.stringify(data));
		});
		return promise;
	}
};

exports.obj = obj;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.commonService = undefined;

var _ajax = __webpack_require__(0);

var logoutIcon = document.querySelectorAll("#logout")[0],
    geomapUrl = "https://maps.googleapis.com/maps/api/geocode/json";
var commonService = {
	offers: null,
	getLocation: function getLocation() {
		var coords = null;
		var geoPromise = new Promise(function (resolve, reject) {
			navigator.geolocation.getCurrentPosition(function (obj) {
				coords = obj.coords;
				if (coords) {
					geomapUrl += "?latlng=" + coords.latitude + "," + coords.longitude + "&key=AIzaSyDhJ8p3h0utLDPejbfHNAB0-lkFqrf1V60";
				} else {
					alert("please allow location access");
					return;
				}
				_ajax.obj.get(geomapUrl).then(function (response) {
					var data = JSON.parse(response);
					var locationData = data.results[0].address_components,
					    n = locationData.length,
					    locationObj = null;
					for (var i = 0; i < n; i++) {
						var types = locationData[i].types.join(",");
						if (types.indexOf("sublocality_level_1") != -1) {
							locationObj = locationData[i];
							break;
						}
					}
					resolve(locationObj);
				}, function (err) {
					reject(err);
					console.log(err);
				});
			}, function (err) {
				reject(err);
				// alert("can't access your location this time,please try after some time ");
			}, { timeout: 5000 });
		});
		return geoPromise;
	},
	filterOffers: function filterOffers(query, offers) {
		if (offers) {
			var arr = offers.filter(function (e) {
				return e.title.indexOf(query) != -1;
			});
			return arr;
		}
	},
	validatePhoneNumber: function validatePhoneNumber(no) {
		var nullValue = parseInt(no); // checking if value has characters
		if (isNaN(nullValue)) {
			alert("mobile no must contain numbers");
			return false;
		} else if (("" + nullValue).length != 10) {
			alert("Please enter 10 digit mobile no");
			return false;
		}
		return true;
	},
	validatePassword: function validatePassword(password) {
		var atleastOneCapitalChar = /[A-Z]/;
		var atleastOneSmallChar = /[a-z]/;
		var atleastOneSpecialChar = /[/$@_&]/;
		var atleastOneDigit = /[0-9]/;
		if (password.length < 8) {
			alert("Password must contain atleast 8 chars");
			return false;
		} else if (!atleastOneCapitalChar.test(password)) {
			alert("Password must contain atleast one capital letter");
			return false;
		} else if (!atleastOneDigit.test(password)) {
			alert("Password must contain atleast one digit");
			return false;
		} else if (!atleastOneSmallChar.test(password)) {
			alert("Password must contain atleast one small char");
			return false;
		} else if (!atleastOneSpecialChar.test(password)) {
			alert("Password must contain atleast one special char");
			return false;
		}
		return true;
	}
};
exports.commonService = commonService;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(12);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ajax = __webpack_require__(0);

var _commonService = __webpack_require__(1);

var _main = __webpack_require__(5);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
    var loginButton = document.querySelector("#login");
    var registerButton = document.querySelector("#registerButton");
    if (loginButton) {
        loginButton.addEventListener("click", function (e) {
            e.preventDefault();
            login();
        });
    } else if (registerButton) {
        registerButton.addEventListener("click", function (e) {
            e.preventDefault();
            register();
        });
    } else {
        (0, _main2.default)();
    }
};

function login() {
    var mobileNumber = document.querySelector("#mobileNumber").value;
    if (!_commonService.commonService.validatePhoneNumber(mobileNumber)) {
        return;
    }
    var passWord = document.querySelector("#passWord").value;
    if (!_commonService.commonService.validatePassword(passWord)) {
        return;
    }
    _ajax.obj.loginUser(mobileNumber, passWord).then(function (res) {
        res = JSON.parse(res);
        if (res.validUser) {
            document.cookie = "token=" + res.token;
            localStorage.setItem("userId", mobileNumber);
            location.replace("/src/main/main.html");
        } else {
            alert("invalid user");
        }
    }, function (err) {
        console.log(err);
    });
}

function register() {
    var userName = document.querySelector("#userName").value;
    var mobileNumber = document.querySelector("#mobileNumber").value;
    if (!_commonService.commonService.validatePhoneNumber(mobileNumber)) {
        return;
    }
    var passWord = document.querySelector("#passWord").value;
    if (!_commonService.commonService.validatePassword(passWord)) {
        return;
    }
    _ajax.obj.registerUser(userName, mobileNumber, passWord).then(function (res) {
        console.log(res);
        if (res == "success") {
            alert("registration success");
        } else {
            alert("registration failed");
        }
    });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _commonService = __webpack_require__(1);

var _ajax = __webpack_require__(0);

var _offer = __webpack_require__(6);

var offers = [];
var offersList = document.querySelector("#offersList");

function initMainView() {

    var locationObj = null;
    _commonService.commonService.getLocation().then(function (res) {
        locationObj = res;
        var titleArray = document.querySelectorAll(".location-title");
        titleArray.forEach(function (e) {
            e.innerHTML = "Offers Around " + locationObj.short_name;
        });
        console.log("locationName---->", locationObj.short_name);
        localStorage.setItem("location", locationObj.short_name);
        showOffers();
    }, function (err) {
        localStorage.setItem("location", "unknown");
        showOffers();
        console.log(err);
    });
    initializeHandlers();
}

function showOffers() {
    _ajax.obj.getOffers().then(function (response) {
        var res = JSON.parse(response);
        var arr = offers = res;
        if (arr.length > 0) {
            offersList.innerHTML = "";
            arr.forEach(function (offer) {
                var obj = new _offer.CreateOffer(offer);
            });
        } else {
            offersList.innerHTML = "";
        }
    }, function (err) {
        alert("session timeout.please login again");
        console.error(JSON.parse(err));
    });
}

function initializeHandlers() {
    // initializing event handlers

    var logoutIcon = document.querySelector("#logout"),
        showAddOfferButton = document.querySelector("#showAddOfferButton"),
        searchBox = document.querySelector("#searchBox"),
        searchButton = document.querySelector("#searchButton"),
        offersAround = document.querySelector(".offersAround"),
        addOfferButton = document.querySelector("#addOfferButton"),
        addOfferDialog = document.querySelector("#addOffer");

    searchButton.addEventListener("click", function () {
        filterOffers();
    });

    searchBox.addEventListener("keyup", function (event) {
        if (event.keyCode == 13) {
            filterOffers();
        }
    });

    function filterOffers() {
        var searchValue = searchBox.value;
        var arr = _commonService.commonService.filterOffers(searchValue, offers);
        if (arr.length > 0) {
            offersList.innerHTML = "";
            arr.forEach(function (offer) {
                var obj = new _offer.CreateOffer(offer);
            });
        }
    }

    showAddOfferButton.addEventListener("click", function () {
        showDialog(addOfferDialog);
    });

    addOfferButton.addEventListener("click", function () {
        var offerTitle = document.querySelector("#addOffer .offer-title-input").value;
        var offerContent = document.querySelector("#addOffer .offer-content-textarea").value;

        _ajax.obj.addOffer(offerTitle, offerContent).then(function (response) {
            console.log("offer added successfully");
            hideDialog(addOfferDialog);
            document.location.reload();
        }, function (err) {

            console.error("error while adding offer");
        });
    });

    document.querySelector("#addOffer .close-icon").addEventListener("click", function () {
        hideDialog(addOfferDialog);
    });

    document.querySelector("#editOffer .close-icon").addEventListener("click", function () {
        var editDialog = document.querySelector("#editOffer");
        hideDialog(editDialog);
    });

    document.querySelector("#showOffer .close-icon").addEventListener("click", function () {
        var showOfferDialog = document.querySelector("#showOffer");
        hideDialog(showOfferDialog);
    });

    function showDialog(node) {
        offersAround.classList.remove("showDiv");
        node.classList.remove("hideDiv");
        offersAround.classList.add("hideDiv");
        node.classList.add("showDiv");
    }

    function hideDialog(node) {
        offersAround.classList.remove("hideDiv");
        node.classList.remove("showDiv");
        offersAround.classList.add("showDiv");
        node.classList.add("hideDiv");
    }

    var saveOfferButton = document.querySelector("#saveOfferButton");
    saveOfferButton.addEventListener("click", function (e) {
        var editDialog = document.querySelector("#editOffer");
        var offerTitle = document.querySelector("#editOffer .offer-title-input").value;
        var offerContent = document.querySelector("#editOffer .offer-content-textarea").value;
        var offerId = localStorage.getItem("selectedOfferId");
        _ajax.obj.editOffer(offerId, offerTitle, offerContent).then(function (response) {
            console.log("offer edited successfully");
            hideDialog(editDialog);
            document.location.reload();
        }, function (err) {
            console.error("error while adding offer");
        });
    });
}

exports.default = initMainView;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CreateOffer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ajax = __webpack_require__(0);

var _commonService = __webpack_require__(1);

__webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreateOffer = function () {
	function CreateOffer(offer) {
		_classCallCheck(this, CreateOffer);

		this.offer = offer;
		this.id = offer._id;
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
			request.open("GET", "/src/Offer/offer.html", true);
			request.send();

			var render = function render() {
				var template = "" + response;
				offer.innerHTML = template;
				offer.id = _this.id;
				offer.className = "offer clear-fix";
				document.getElementById("offersList").appendChild(offer);
				offer.querySelector(".offerName").innerHTML = _this.offer.title;
				_this.initializeEventHanders(offer);
			};
		}
	}, {
		key: "initializeEventHanders",
		value: function initializeEventHanders(offer) {
			var _this2 = this;

			offer.addEventListener("click", function (event) {
				event.stopPropagation();
				var target = event.target;
				if (target.className.indexOf("view-icon") != -1) {
					_this2.showOfferInfo();
				} else if (target.className.indexOf("edit-icon") != -1) {
					_this2.showEditDialog();
				} else if (target.className.indexOf("delete-icon") != -1) {
					_this2.deleteOffer();
				}
			});
		}
	}, {
		key: "showOfferInfo",
		value: function showOfferInfo() {
			document.querySelector("#showOffer .offer-content-textarea").innerHTML = this.offer.details;
			document.querySelector("#showOffer .offer-title-input").innerHTML = this.offer.title;
			var showOfferDialog = document.querySelector("#showOffer");
			this.showDialog(showOfferDialog);
		}
	}, {
		key: "showEditDialog",
		value: function showEditDialog() {
			localStorage.setItem("selectedOfferId", this.offer._id);
			document.querySelector("#editOffer .offer-content-textarea").value = this.offer.details;
			document.querySelector("#editOffer .offer-title-input").value = this.offer.title;
			var editDialog = document.querySelector("#editOffer");
			this.showDialog(editDialog);
		}
	}, {
		key: "showDialog",
		value: function showDialog(node) {
			var offersAround = document.querySelector(".offersAround");

			offersAround.classList.remove("showDiv");
			node.classList.remove("hideDiv");
			offersAround.classList.add("hideDiv");
			node.classList.add("showDiv");
		}
	}, {
		key: "hideDialog",
		value: function hideDialog(node) {
			var offersAround = document.querySelector(".offersAround");
			offersAround.classList.remove("hideDiv");
			node.classList.remove("showDiv");
			offersAround.classList.add("showDiv");
			node.classList.add("hideDiv");
		}
	}, {
		key: "deleteOffer",
		value: function deleteOffer() {
			var result = confirm("Are you sure to delete this offer?");
			if (result) {
				_ajax.obj.deleteOffer(this.offer).then(function (response) {
					console.log("offer deleted successfully");
					document.location.reload();
				}, function (err) {
					console.error("error while deleting offer");
				});
			}
		}
	}, {
		key: "showError",
		value: function showError(error) {
			var err = JSON.parse(error);
			if (err.status && err.status == 401) {
				alert("session expired");
				_commonService.commonService.clearScreen();
			}
		}
	}]);

	return CreateOffer;
}();

exports.CreateOffer = CreateOffer;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./offer.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./offer.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n/*** offer style ****/\n#offersList{\n\theight: calc(100% - 5rem);\n    overflow-y: auto;\n}\n\n.offer{\n    width: 90%;\n    margin: 0 auto;\n    box-shadow: 0px 0px 1px 2px #ddd;\n    margin-top: 1rem;\n    display: flex;\n    padding: 0.8rem 0.3rem;\n}\n\n\n.offer .offerName{\n    width: 70%;\n    font-size: 1.4rem;\n    color: #9E9E9E;\n    text-transform: capitalize;\n    border-right: 2px solid #ccc;\n    margin-right: 0.2rem;\n}\n\n.offer .actions{\n    display: flex;\n    align-items: center;\n    width: 30%;\n    justify-content: space-around;\n}\n\n\n.edit-icon{\n    background-image: url(" + __webpack_require__(9) + ");\n    height:1rem;\n    width:1rem;\n}\n\n\n.view-icon{\n    background-image: url(" + __webpack_require__(10) + ");\n    height:1.1rem;\n    width:1.1rem;\n}\n\n.delete-icon{\n    background-image: url(" + __webpack_require__(11) + ");\n    height:1rem;\n    width:1rem;\n}\n\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSI1MjguODk5IiBoZWlnaHQ9IjUyOC44OTkiIHN0eWxlPSIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxyZWN0IGlkPSJiYWNrZ3JvdW5kcmVjdCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgeD0iMCIgeT0iMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJub25lIi8+CgoKCgoKCgoKCgoKCgoKCgo8ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PGcgaWQ9InN2Z18xIiBjbGFzcz0iIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGw9IiNhOTNlNWIiPgoJPHBhdGggZD0iTTMyOC44ODMsODkuMTI1bDEwNy41OSwxMDcuNTg5bC0yNzIuMzQsMjcyLjM0TDU2LjYwNCwzNjEuNDY1TDMyOC44ODMsODkuMTI1eiBNNTE4LjExMyw2My4xNzdsLTQ3Ljk4MS00Ny45ODEgICBjLTE4LjU0My0xOC41NDMtNDguNjUzLTE4LjU0My02Ny4yNTksMGwtNDUuOTYxLDQ1Ljk2MWwxMDcuNTksMTA3LjU5bDUzLjYxMS01My42MTEgICBDNTMyLjQ5NSwxMDAuNzUzLDUzMi40OTUsNzcuNTU5LDUxOC4xMTMsNjMuMTc3eiBNMC4zLDUxMi42OWMtMS45NTgsOC44MTIsNS45OTgsMTYuNzA4LDE0LjgxMSwxNC41NjVsMTE5Ljg5MS0yOS4wNjkgICBMMjcuNDczLDM5MC41OTdMMC4zLDUxMi42OXoiIGlkPSJzdmdfMiIgZmlsbD0iI2E5M2U1YiIvPgo8L2c+PGcgaWQ9InN2Z18zIj4KPC9nPjxnIGlkPSJzdmdfNCI+CjwvZz48ZyBpZD0ic3ZnXzUiPgo8L2c+PGcgaWQ9InN2Z182Ij4KPC9nPjxnIGlkPSJzdmdfNyI+CjwvZz48ZyBpZD0ic3ZnXzgiPgo8L2c+PGcgaWQ9InN2Z185Ij4KPC9nPjxnIGlkPSJzdmdfMTAiPgo8L2c+PGcgaWQ9InN2Z18xMSI+CjwvZz48ZyBpZD0ic3ZnXzEyIj4KPC9nPjxnIGlkPSJzdmdfMTMiPgo8L2c+PGcgaWQ9InN2Z18xNCI+CjwvZz48ZyBpZD0ic3ZnXzE1Ij4KPC9nPjxnIGlkPSJzdmdfMTYiPgo8L2c+PGcgaWQ9InN2Z18xNyI+CjwvZz48L2c+PC9zdmc+"

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMjAwLjAwMDAwMHB0IiBoZWlnaHQ9IjIwMC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDIwMC4wMDAwMDAgMjAwLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgo8bWV0YWRhdGE+CkNyZWF0ZWQgYnkgcG90cmFjZSAxLjE1LCB3cml0dGVuIGJ5IFBldGVyIFNlbGluZ2VyIDIwMDEtMjAxNwo8L21ldGFkYXRhPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwyMDAuMDAwMDAwKSBzY2FsZSgwLjEwMDAwMCwtMC4xMDAwMDApIgpmaWxsPSIjYTkzZTViIiBzdHJva2U9Im5vbmUiPgo8cGF0aCBkPSJNODMzIDE1NTYgYy0yNjEgLTUwIC01NDkgLTIxOCAtNzcxIC00NDkgLTU2IC01OSAtNjIgLTY5IC02MiAtMTA4IDAKLTQyIDQgLTQ4IDkzIC0xMzQgMzgzIC0zNzYgODA2IC01MTMgMTIwMSAtMzg4IDE3OSA1NyAzNzcgMTc1IDU0OCAzMjcgMTMwCjExNiAxNTggMTUxIDE1OCAyMDAgMCAzNiAtNyA0NiAtOTIgMTMwIC0yMDggMjA0IC00NDMgMzQ2IC02NzUgNDA3IC0xMDEgMjcKLTI5OSAzNCAtNDAwIDE1eiBtMjc4IC0xOTYgYzI0NiAtNzcgMzQ1IC0zNzUgMTk0IC01ODIgLTE4MiAtMjQ5IC01NzMgLTE4NAotNjY1IDExMSAtMjUgODAgLTI1IDE0MiAwIDIyMiA2MyAyMDEgMjcyIDMxMSA0NzEgMjQ5eiIvPgo8cGF0aCBkPSJNOTI5IDExMTMgYy0zOCAtMjMgLTU5IC02NCAtNTkgLTExMyAwIC04MCA1MiAtMTMwIDEzNSAtMTMwIDQyIDAgNTIKNSA4NiAzOSAzNCAzNCAzOSA0NCAzOSA4NiAwIDg0IC01MCAxMzUgLTEzMiAxMzUgLTIzIDAgLTU1IC04IC02OSAtMTd6Ii8+CjwvZz4KPC9zdmc+Cg=="

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB3aWR0aD0iMTc5MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjYTkzZTViIiBkPSJNNzA0IDEzNzZ2LTcwNHEwLTE0LTktMjN0LTIzLTloLTY0cS0xNCAwLTIzIDl0LTkgMjN2NzA0cTAgMTQgOSAyM3QyMyA5aDY0cTE0IDAgMjMtOXQ5LTIzem0yNTYgMHYtNzA0cTAtMTQtOS0yM3QtMjMtOWgtNjRxLTE0IDAtMjMgOXQtOSAyM3Y3MDRxMCAxNCA5IDIzdDIzIDloNjRxMTQgMCAyMy05dDktMjN6bTI1NiAwdi03MDRxMC0xNC05LTIzdC0yMy05aC02NHEtMTQgMC0yMyA5dC05IDIzdjcwNHEwIDE0IDkgMjN0MjMgOWg2NHExNCAwIDIzLTl0OS0yM3ptLTU0NC05OTJoNDQ4bC00OC0xMTdxLTctOS0xNy0xMWgtMzE3cS0xMCAyLTE3IDExem05MjggMzJ2NjRxMCAxNC05IDIzdC0yMyA5aC05NnY5NDhxMCA4My00NyAxNDMuNXQtMTEzIDYwLjVoLTgzMnEtNjYgMC0xMTMtNTguNXQtNDctMTQxLjV2LTk1MmgtOTZxLTE0IDAtMjMtOXQtOS0yM3YtNjRxMC0xNCA5LTIzdDIzLTloMzA5bDcwLTE2N3ExNS0zNyA1NC02M3Q3OS0yNmgzMjBxNDAgMCA3OSAyNnQ1NCA2M2w3MCAxNjdoMzA5cTE0IDAgMjMgOXQ5IDIzeiIvPjwvc3ZnPg=="

/***/ }),
/* 12 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map