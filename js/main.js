var Game = require('./game.js');
var Level = require('./level.js');
// var Trie = require('./trie');
var Gameboard = require('./gameboard.js');
var boggleDictionary = require('./boggleDictionary.js');


$(function() {

	var container = $(".woggle-container");
	var timerSpot = $(".timer-spot");
	var level = new Level(container, boggleDictionary);
	var gameboard = new Gameboard(container, boggleDictionary, level);
	var game = new Game(gameboard, container, boggleDictionary, level, timerSpot);

});
