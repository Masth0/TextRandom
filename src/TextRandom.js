/*@license
 * TextRandom
 *
 * Copyright Masth0
 * Released under the MIT license.
 * https://masth0.github.io/TextRandom/
 *
 */

var TextRandom = (function () {

	/*---- Helpers ----------------------------------------------------------*/

	// shim layer with setTimeout fallback (Paul Irish)
	window.requestAnimFrame = (function (){
		return  window.requestAnimationFrame ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						function( callback ){
							window.setTimeout(callback, 1000 / 60);
						};
	})();

	var cancelAnimationFrame = 	window.cancelAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		window.mozCancelAnimationFrame;

	/**
	 * setInterval with requestAnimationFrame
	 * @param callback
	 * @param time
	 * @returns {*}
	 */
	var requestInterval = function (callback, time) {
		var start = +new Date;
		var timer;
		var callbackRunning;

		function interval () {
			var now = +new Date;
			var delta = now - start;
			if (delta > time) {
				// reset start
				start = +new Date;
				callbackRunning = callback.call();
			}
			// if callback return false then stop the request
			if (!callbackRunning && callbackRunning != undefined) {
				cancelAnimationFrame(timer);
			} else {
				timer = requestAnimFrame(interval);
			}
		}
		 return timer = requestAnimFrame(interval);
	};

	/**
	 * Simple merge between two objects
	 * @param objA
	 * @param objB
	 * @returns {{}}
	 */
	var mergeOptions = function (objA, objB) {
		var objC = {};
		for (var key in objA) {
			objC[key] = objA[key];
		}
		for (var key in objB) {
			objC[key] = objB[key];
		}
		return objC;
	};

	/**
	 * Generate random number, min include, max not include
	 * @param min
	 * @param max
	 * @returns {number}
	 */
	var mathRandom = function (min, max) {
		var random = Math.random() * (max - min) + min;
		return Math.floor(random);
	};

	/**
	 * Choose how many letters should be refreshed in minimum interval 16ms
	 * @param interval
	 * @returns {*}
	 */
	var changeNLetters = function (time, word) {
		var counter = 1;
		var interval = (time / word.length);
		var _interval = interval;
    while (_interval < 16) {
      _interval += interval;
      counter++;
    };
		return {
			interval: _interval,
			count: counter
		};
	};

	/**
	 * Remove array item with index
	 * @param array
	 * @param item
	 */
	var removeArrayItem = function (array, item) {
		var index = array.indexOf(item);
		if (index > -1) {
			array.splice(index, 1);
		}
	};

	/*---- TextRandom ----------------------------------------------------------*/
	// private vars
	var _this;

	var defaults = {
		container: document.body, // node DOM
		alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "i", "k", "l",
			"m", "n", "o", "p", "q", "r", "s", "t", "i", "u", "v", "w", "x", "y", "z", "~", "&",
			"|", "^", "ç", "@", "]", "[", "{", "}", "ù", "*", "µ", "¤", "$", "£", "€", "°", ")",
			"(", "+", "-", "/", "<", ">", "²", "`", "é", "è", "1", "2", "3", "4", "5", "6", "7",
			"8", "9", "0"],
		words: ['hello', 'world'],
		randomLettersFrequence: 50, // Refresh random characters (ms)
		timeToSetWord: 3000, // Set final characters (ms)
		timeBetweenWords: 3000, // Set final characters (ms)
		playOnce: false // play each words once
	};

	/**
	 * Constructor, options obiect
	 * @param options
	 * @constructor
	 */
	function TextRandom (options) {
		_this = this;
		this.current = 0;
		this.changeLetters = null;
		this.letterIndexNotAssigned = [];
	  this.letterIndexAssigned = [];
		this.options = mergeOptions (defaults, options);
	}

	/**
	 * Return letter randomly selected in options[alphabet]
	 * @returns {*}
	 */
	TextRandom.prototype.getRandomLetter = function () {
		var alphabetLength = this.options.alphabet.length;
		var index = mathRandom(0, alphabetLength);
		return this.options.alphabet[index];
	};

	/**
	 * Create or remove span in relation to the existing spans
	 * @param word
	 * @param container
	 */
	TextRandom.prototype.generateSpan = function (word, container) {
		var spans = container.querySelectorAll('.is-TextRandom-span');
		var wordLength = word.length;
		var spansLength = (spans != null) ? spans.length : 0;
		var newSpans = (wordLength - spansLength);

		var addSpans = function () {
			for (var i = 0; i < newSpans; i++) {
				var span = document.createElement('SPAN');
				span.classList.add('is-TextRandom-span');
				container.appendChild(span);
			}
		};

		var removeSpans = function () {
			var oldSpans = Math.abs(newSpans);
			for (var i = 0; i < oldSpans; i++) {
				container.removeChild(spans[i]);
			}
		};

		if (newSpans < 0) {
			removeSpans();
		} else {
			addSpans();
		}
	};

	/**
	 * Catch a random span that is not in [letterIndex] to set a random letter
	 */
	TextRandom.prototype.setRandomLetter = function () {
		if (this.letterIndexNotAssigned.length != 0) {
			var alphabetLength = this.options.alphabet.length;
			for (var i = 0; i < this.options.words[this.current].length; i++) {
				if (this.letterIndexNotAssigned.indexOf(i) != -1) {
					var randomLetter = mathRandom(0, alphabetLength);
					this.options.container.getElementsByTagName('span')[i].innerHTML = this.options.alphabet[randomLetter];
				}
			}
			return true;
		} else {
			return false;
		}
	};

	/**
	 * put in span the good letter of current word
	 * @param word
	 * @param n (is nLetters)
	 */
	TextRandom.prototype.setFinalLetter = function (word, n) {
    if (this.letterIndexNotAssigned.length != 0) {
      for (var i = 0; i < n; i++) {
        var value = this.letterIndexNotAssigned[i];
				if (value != undefined) {
					removeArrayItem(this.letterIndexNotAssigned, value);
					this.letterIndexAssigned.push(value);
					var letter = word.substr(value, 1);
					this.options.container.getElementsByTagName('span')[value].innerHTML = letter;
				}
      }
      return true;
    } else{
			return false;
		}
  };

	/**
	 * increment current var ...
	 * @returns {number}
	 */
	TextRandom.prototype.next = function () {
		this.current = (this.current++ < this.options.words.length - 1)? this.current++ : 0;
		return this.current;
	};

	/**
	 * define an Array with random index
	 * @param word
	 * @param array
	 */
	TextRandom.prototype.letterIndexOrder = function (word, array) {
    var wordLength = word.length;
    var random;
    for (var i = 0; i < wordLength; i++) {
      random = mathRandom(0, wordLength);
      //console.log('wordLength', wordLength, 'random', random, 'index', array.indexOf(random), 'array', array);
      while (array.indexOf(random) !== -1) {
        random = mathRandom(0, wordLength);
        //console.log('je veux new random');
      }
      array.push(random);
    }
  };

	/**
	 * add interval for animations
	 */
	TextRandom.prototype.anim = function () {
		var _this = this;
		// Animate random characters
		requestInterval(function () {
			return _this.setRandomLetter();
		}, _this.options.randomLettersFrequence);

		// For set final word
		requestInterval(function () {
			return _this.setFinalLetter(_this.options.words[_this.current], _this.changeLetters.count);
		}, _this.changeLetters.interval);
	};

	/**
	 * start animations
	 */
	TextRandom.prototype.start = function () {
		var _this = this;
		this.changeLetters = changeNLetters(this.options.timeToSetWord, this.options.words[this.current]);
		this.generateSpan(this.options.words[this.current], this.options.container);
		this.letterIndexOrder(this.options.words[this.current], this.letterIndexNotAssigned);
		this.anim();

		requestInterval(function () {
			_this.next();
			if (_this.options.playOnce && _this.current === 0) {
				return false;
			}
      _this.letterIndexNotAssigned = [];
			_this.changeLetters = changeNLetters(_this.options.timeToSetWord, _this.options.words[_this.current]);
			_this.generateSpan(_this.options.words[_this.current], _this.options.container);
			_this.letterIndexOrder(_this.options.words[_this.current], _this.letterIndexNotAssigned);
			_this.anim();
		}, this.options.timeToSetWord + this.options.timeBetweenWords);
	};

	return TextRandom;
})();