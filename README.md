# TextRandom
TextRandom is a script (vanillaJS) for animate a word with random letters.
in modern browsers with touch events support. Here the demo page: [**DEMO**] (https://masth0.github.io/TextRandom/)

## Options {Object}
- **container:** node DOM
- **alphabet:** ['string', '...']
- **words:** ['string', '...']
- **randomLettersFrequence:** // Refresh random characters (ms)
- **timeToSetWord:** // Set final characters (ms)
- **timeBetweenWords:** // Set final characters (ms)
- **playOnce:** // play each words once
    
## Javascript init

```
var textrandomContainer = document.getElementById('js-textrandom');

var myTextRandom = new TextRandom({
	container: textrandomContainer, // node DOM
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
});
myTextRandom.start();
```

[MIT License](LICENSE.md). © Masth0