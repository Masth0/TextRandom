(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./Textrandom.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Textrandom.ts":
/*!***********************!*\
  !*** ./Textrandom.ts ***!
  \***********************/
/*! exports provided: Textrandom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Textrandom\", function() { return Textrandom; });\nclass Textrandom {\n  constructor(config) {\n    this.isRunning = false;\n    this.stepInterval = 500;\n    this.raf = 0;\n    this.spans = [];\n    this.current = 0; // Current word index\n\n    this.last = -1;\n    const defaults = {\n      selector: 'js-textrandom',\n      alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'i', 'u', 'v', 'w', 'x', 'y', 'z', '~', '&', '|', '^', 'ç', '@', ']', '[', '{', '}', 'ù', '*', 'µ', '¤', '$', '£', '€', '°', ')', '(', '+', '-', '/', '<', '>', '²', '`', 'é', 'è', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],\n      wordTime: 3000,\n      letterRefreshTime: 16.5,\n      words: ['Hello', 'azeezaezaeazeazeaze']\n    };\n    this.config = Object.assign({}, defaults, config);\n    this.container = document.getElementById(this.config.selector); // Create the span inside container before start.\n\n    this.addSpan();\n  }\n\n  static createSpan(attributes) {\n    let span = document.createElement('span');\n\n    for (const key in attributes) {\n      if (attributes.hasOwnProperty(key)) {\n        span.setAttribute(key, attributes[key]);\n      }\n    }\n\n    return span;\n  }\n  /**\n   * Start the loop (ô_Ô)\n   */\n\n\n  start() {\n    this.lastStep = performance.now();\n    this.nextStep = this.lastStep + this.stepInterval;\n    this.loop(performance.now());\n    setTimeout(() => {\n      this.stop();\n    }, 1000);\n  }\n  /**\n   * Stop the loop\n   */\n\n\n  stop() {\n    window.cancelAnimationFrame(this.raf);\n  }\n  /**\n   * Main loop\n   * @param t {number}\n   */\n\n\n  loop(t) {\n    this.raf = window.requestAnimationFrame(this.loop.bind(this));\n\n    if (t > this.nextStep) {\n      this.nextStep = this.lastStep + this.stepInterval;\n      this.update(t);\n    }\n\n    this.lastStep = performance.now();\n  }\n  /**\n   * Update each stepInterval defined.\n   * @param t {number}\n   */\n\n\n  update(t) {\n    console.log('Update', t);\n  }\n\n  addSpan() {\n    const spans = this.container.querySelectorAll('span');\n    const currentWordLength = this.config.words[this.current].length;\n    const spansLength = spans !== null ? spans.length : 0;\n    const delta = currentWordLength - spansLength;\n\n    if (delta < 0) {\n      // Remove n spans\n      const count = Math.abs(delta - (spansLength - 1));\n      this.spans.splice(count);\n    } else {\n      // Add n spans\n      for (let i = 0; i < delta; i++) {\n        this.container.appendChild(Textrandom.createSpan());\n      }\n    }\n  }\n\n  next() {\n    this.current++;\n\n    if (this.last < this.current) {} else {\n      this.current = this.config.words.length;\n    }\n  }\n\n}\nwindow.Textrandom = Textrandom;\n\n//# sourceURL=webpack:///./Textrandom.ts?");

/***/ })

/******/ });
});