var Timer = require('./timer.js');
var Gameboard = require("./gameboard.js");
var Level = require('./level.js');

var Game = function($container, dictionary, $timerSpot) {
	var cb = this.finishGame.bind(this);
	this.level = new Level($container, dictionary);
	this.timer = new Timer($container, cb, $timerSpot);
	this.gameboard = new Gameboard($container, dictionary, this.level);
	this.$el = $container;
	this.dictionary = dictionary;
	this.$el.on("click", ".beginGame", this.startGame.bind(this));
	this.wordIsStarted = false;
};

Game.prototype.mouseEvents = function() {
	this.$el.on("mousedown", ".cube", this.startWord.bind(this));
	this.$el.on("mouseup", ".cube", this.endWord.bind(this));
	$(".cube").on(
		"mouseover",
		this.appendLetters.bind(this)
	);
};

Game.prototype.startGame = function(e) {
	e.preventDefault();
	$(".error").text("");
	$(".gameMessage").text("");
	this.gameboard.generateBoard();
	$(".cube").removeClass("hidden");
	this.mouseEvents();
	this.timer.toggleButton();
	this.timer.ticking = true;
};

Game.prototype.appendLetters = function(e) {
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

Game.prototype.removemouseEvents = function() {
	this.$el.off("mousedown", ".cube", this.startWord);
	this.$el.off("mouseup", ".cube", this.endWord);
	this.$el.off("mouseenter", ".cube", this.appendLetters);
};

Game.prototype.finishGame = function() {
	$(".cube").addClass("hidden");
	this.level.clearLevel();
	this.gameboard.removeCubes();
	$(".gameMessage").text("GAME OVER");
	this.removemouseEvents();
	// TODO: add modal window to display score!
};


module.exports = window.Game = Game;
