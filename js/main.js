var Game = require('./game.js');
var Level = require('./level.js');
var Gameboard = require('./gameboard.js');
var boggleDictionary = require('./boggleDictionary.js');


$(function() {
	var container = $(".woggle-container");
	var timerSpot = $(".timer-spot");
	var game = new Game(container, boggleDictionary, timerSpot);
});
