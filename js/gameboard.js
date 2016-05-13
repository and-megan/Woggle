
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
	this.cubeMemory = [];
	this.$el = $el;
	this.dictionary = dictionary;
	this.level = level;
	this.generateBoard();
};

Gameboard.prototype.removeSpaces = function () {
	$(".space").empty();
	$(".space").remove();
};

Gameboard.prototype.generateBoard = function() {
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
			this.cubeMemory.push($cube);
			$space.append($cube);
		}
	}
	this.$el.append($space);
	this.allWords = [];
};

Gameboard.prototype.addToWord = function(e) {
	if (this.level.wordCreation) {
		var $playingCube = $(e.currentTarget);

		$(".cube").removeClass("last");
		$playingCube.addClass("hot").addClass("last");
		var cubePosition = $(".last").data("pos");

		var curX = cubePosition[0];
		var curY = cubePosition[1];
		var curWordLength = this.level.currentWord.length - 2;
		var wordPos = this.level.currentWordPositions;
		if (this.level.currentWordPositions.length > 0) {

			var prevX = wordPos.slice(-1)[0][0];
			var prevY = wordPos.slice(-1)[0][1];
		}

		if (this.level.currentWordPositions.length > 0 && (Math.abs(curX - prevX) > 1 || Math.abs(curY - prevY) > 1)) {
			$(".error").text("Cannot select non-adjacent letters");
			this.level.currentWord = "";

			this.endWord();
		} else if (this.level.currentWordPositions.indexOf(cubePosition) === -1) {

			this.level.currentWord += e.currentTarget.innerHTML;
			this.level.currentWordPositions.push(cubePosition);

		} else {

			$(".error").text("Cannot use tile more than one time");
			this.level.currentWord = "";
			this.endWord();
		}
	}

};

Gameboard.prototype.startWord = function(e) {
	this.level.startWord();
	this.addToWord(e);
};

Gameboard.prototype.endWord = function() {
	this.level.endWord();
	$(".cube").removeClass("hot");
};


module.exports = Gameboard;
