var Timer = require('./timer.js');
var Gameboard = require("./gameboard.js");
var Level = require('./level.js');
var boggleDictionary = require('./boggleDictionary.js');
var container = $(".woggle-container");
var timerSpot = $(".timer-spot");

var Game = function($container, dictionary, $timerSpot) {
	var cb = this.finishGame.bind(this);
	this.level = new Level($container, dictionary);
	this.timer = new Timer($container, cb, $timerSpot);
	this.gameboard = new Gameboard($container, dictionary, this.level);
	this.$el = $container;
	this.dictionary = dictionary;
	this.$el.on("click", ".beginGame", this.startGame.bind(this));
	this.$el.on("click", ".playAgain", this.playAgain.bind(this));
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
	var game = new Game(container, boggleDictionary, timerSpot);
	this.setupGame();
};

Game.prototype.setupGame = function() {
	$(".error").text("");
	$(".gameMessage").text("");
	this.gameboard.generateBoard();
	$(".cube").removeClass("hidden");
	this.mouseEvents();
	this.timer.toggleButton();
	this.timer.ticking = true;
};

Game.prototype.startWord = function(e) {
	e.preventDefault();
	this.gameboard.startWord(e);
	this.wordIsStarted = true;
	$(".error").text("");
};

Game.prototype.appendLetters = function(e) {
	//this adds letters to displayed word
	if(this.wordIsStarted) {
		this.gameboard.addToWord(e);
		$(".currentWord").text(this.gameboard.currentWord);
	}
};

Game.prototype.endWord = function(e) {
	e.preventDefault();
	this.wordIsStarted = false;
	$(".currentWord").text("");
	this.gameboard.endWord();
};

Game.prototype.addToWord = function(e) {
	//adds to currentWord (which will be submitted & checked on submission)
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
Game.prototype.playAgain = function (e) {
	e.preventDefault();
	location.reload();
};

Game.prototype.displayFinalScore = function () {
	$(".playAgain").addClass("show-play-again");
	$(".scoreContainer").addClass("final-score");
};

Game.prototype.finishGame = function() {
	$(".cube").addClass("hidden");
	this.level.clearLevel();
	this.gameboard.removeCubes();
	$(".gameMessage").text("Time's up!");
	this.removemouseEvents();
	this.displayFinalScore();
};


module.exports = Game;
