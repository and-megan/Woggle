var Timer = require('./timer.js');
var Gameboard = require("./gameboard.js");
var Level = require('./level.js');



var Game = function($gameboard, $container, dictionary, level, $timerSpot) {
	this.level = level;
	this.$el = $container;
	// var game = this;
	this.dictionary = dictionary;
	// var $guessed = $("#guessed");
	var cb = this.finishGame.bind(this);
	this.timer = new Timer($container, cb, $timerSpot);
	this.gameboard = $gameboard;
	this.$el.on("click", ".beginGame", this.toggleGame.bind(this));
	this.wordIsStarted = false;
};

Game.prototype.keyEvents = function() {
	this.$el.on("mousedown", ".cube", this.startWord.bind(this));
	$(".cube").on(
		"mouseover",
		this.appendContents.bind(this)
	);

	this.$el.on("mouseup", this.endWord.bind(this));
};

Game.prototype.toggleGame = function(e) {
	e.preventDefault();

	this.gameboard.generateBoard();
	$(".cube").removeClass("hidden");
	this.keyEvents();
	this.timer.toggleButton();
	this.timer.ticking = !this.timer.ticking;
};

Game.prototype.appendContents = function(e) {
	if(this.wordIsStarted) {
		this.gameboard.addToWord(e);
		$(".currentWord").text(this.level.currentWord);
	}
};

Game.prototype.startWord = function(e) {
	e.preventDefault();
	this.gameboard.startWord(e);
	this.wordIsStarted = true;

	$(".error").text("");
};

Game.prototype.endWord = function(e) {
	e.preventDefault();
	this.wordIsStarted = false;
	$(".currentWord").text("");
	this.gameboard.endWord();

};

Game.prototype.addToWord = function(e) {
	e.preventDefault();
	var currentPalabra = this.level.currentWord;
	$(".cube").each(function (i){
			var curWort = currentPalabra;
			this.addEventListener("mouseover", function() {
				curWort += this.innerHTML;
			}.bind(this));

	});

	this.gameboard.addToWord(e);
};

Game.prototype.finishGame = function() {


	$(".cube").addClass("hidden");
	this.level.clearLevel();
	$(".gameMessage").text("GAME OVER");
	this.removeKeyEvents();
	setTimeout(window.location.reload(), 4000);
};


Game.prototype.removeKeyEvents = function() {
	this.$el.off("mousedown", ".cube");
	this.$el.off("mouseup", ".cube");
	this.$el.off("mouseenter", ".cube");
};

module.exports = Game;
