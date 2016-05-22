//GAMEBOARD (generates board and keeps track of physical location of cubes)
var letters = {
	"e": 19,
	"t": 13,
	"a": 12,
	"r": 12,
	"o": 11,
	"i": 11,
	"n": 11,
	"s": 9,
	"d": 6,
	"c": 5,
	"h": 5,
	"l": 5,
	"f": 4,
	"u": 4,
	"m": 4,
	"y": 3,
	"g": 3,
	"w": 2,
	"p": 1,
	"b": 1,
	"v": 1,
	"k": 1,
	"x": 1,
	"qu": 1,
	"j": 1,
	"z": 1
};
var woggleAlphabet = [];

Object.keys(letters).forEach(function(letter) {
	for(var i = 0; i < letters[letter]; i++) {
		woggleAlphabet.push(letter);
	}
});

var Gameboard = function($el, dictionary, level) {
	this.$el = $el;
	this.dictionary = dictionary;
	this.level = level;
	this.wordCreation = false;
	this.currentWord = "";
	this.currentWordPositions = [];
	this.generateBoard();
};

Gameboard.prototype.removeSpaces = function () {
	$(".cube").empty();
	$(".cube").remove();
	$(".space").empty();
	$(".space").remove();
};

Gameboard.prototype.generateBoard = function() {
	//creating the 4 * 4 grid of cubes with a random letter
	this.removeSpaces();
	this.cubeValues = {};
	var $space = $("<ul>").addClass("space");
	for (var i = 0; i < 4; i ++) {
		for (var j = 0; j < 4; j ++) {
			var index = Math.floor(Math.random() * (147));
			this.cubeValues[[i,j]] = woggleAlphabet[index];
			var cubeLi = "<li>" + woggleAlphabet[index] + "</li>";
			var $cube = $(cubeLi).addClass("cube").data("pos", [i, j]);
			$cube.addClass("hidden");
			$space.append($cube);
		}
	}
	this.$el.append($space);
	this.allWords = [];
};

Gameboard.prototype.addToWord = function(e) {
	if (this.wordCreation) {
		$(".cube").removeClass("last");
		var $playingCube = $(e.currentTarget);
		//add class "last" to most recently selected cube in order to distinguish it so position data can be parsed.
		$playingCube.addClass("hot").addClass("last");
		var cubePosition = $(".last").data("pos");
		var curX = cubePosition[0];
		var curY = cubePosition[1];
		var curWordLength = this.currentWord.length - 2;
		var wordPos = this.currentWordPositions;
		//checks position validity of the selected cube
		if (this.currentWordPositions.length > 0) {
			var prevX = wordPos.slice(-1)[0][0];
			var prevY = wordPos.slice(-1)[0][1];
		}
		if (this.currentWordPositions.length > 0 && (Math.abs(curX - prevX) > 1 || Math.abs(curY - prevY) > 1)) {
			$(".error").text("Cannot select non-adjacent letters");
			this.currentWord = "";
			this.endWord();
		} else if (this.currentWordPositions.indexOf(cubePosition) === -1) {
			this.currentWord += e.currentTarget.innerHTML;
			this.currentWordPositions.push(cubePosition);
		} else {
			$(".error").text("Cannot use tile more than one time");
			this.currentWord = "";
			this.endWord();
		}
	}

};

Gameboard.prototype.startWord = function(e) {
	this.wordCreation = true;
	this.currentWord = "";
	this.currentWordPositions = [];
	this.addToWord(e);
};

Gameboard.prototype.endWord = function() {
	this.wordCreation = false;
	var thisLevel = this.level;

	if (this.currentWord.length < 3 && this.currentWord.length > 0) {
		$('.error').text("That word is not long enough");
	} else if (thisLevel.bsearch(this.dictionary, this.currentWord)) {

		if (thisLevel.words.indexOf(this.currentWord) === -1) {
			thisLevel.registerGuessedWord(this.currentWord);
		} else {
			$('.error').text("That word has already been found");
		}

	} else {
		$(".error").text("Invalid word");
	}
	this.currentWord = "";
	$(".cube").removeClass("hot");
};

Gameboard.prototype.removeCubes = function () {
	$(".cube").empty();
	$(".cube").remove();
};

module.exports = Gameboard;
