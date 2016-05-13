
function Level($el, dictionary) {
	this.$el = $el;
	this.wordCreation = false;
	this.currentWord = "";
	this.dictionary = dictionary;
	this.currentWordPositions = [];
	this.words = [];
	this.score = 0;
	this.wordCount = 0;
	this.showGuessedWords();
	$(".currentScore").text("Score: 0");
	$(".currentCount").text("Word Count: 0");
}

Level.prototype.showGuessedWords = function() {
	var $guessedWords = $("<ul>").addClass("guessedWord");
	this.$el.append($guessedWords);
};

Level.prototype.startWord = function() {
	this.wordCreation = true;
	this.currentWord = "";
	this.currentWordPositions = [];
};

Level.prototype.bsearch = function (dictionary, checkWord) {

  if (dictionary.length === 0) {
  return false;
	}

  var probeIdx = Math.floor(dictionary.length / 2);
  var probe = dictionary[probeIdx];
  if (checkWord.localeCompare(probe) === 0) {
    return true;
  } else if (checkWord.localeCompare(probe) === -1) {
    var left = dictionary.slice(0, probeIdx);
    return this.bsearch(left, checkWord);
  } else {
    var right = dictionary.slice(probeIdx + 1);
		return this.bsearch(right, checkWord);
	}
};

Level.prototype.endWord = function() {
	this.wordCreation = false;

	if (this.currentWord.length < 3 && this.currentWord.length > 0) {
		$('.error').text("That word is not long enough");

	} else if (this.bsearch(this.dictionary, this.currentWord)) {

		if (this.words.indexOf(this.currentWord) === -1) {
			this.words.push(this.currentWord);
			this.calculateScore(this.currentWord);
			var $guessedWords = $(".guessedWords");
			var $guessedWord = "<li>" + this.currentWord + "</li>";
			$guessedWords.append($guessedWord);

		} else {
			$('.error').text("That word has already been found");
		}
	} else {
		$(".error").text("Invalid word");
	}

	this.currentWord = "";
};

Level.prototype.creatingWord = function() {
	return this.wordCreation;
};

Level.prototype.calculateScore = function (word) {
	if (word.length < 5) {
		this.score += 1;
	} else if (word.length === 5) {
		this.score += 2;
	} else if (word.length === 6) {
		this.score += 3;
	} else if (word.length === 7) {
		this.score += 5;
	} else {
		this.score += 11;
	}
	this.wordCount++;
	this.updateScore(this.score, this.wordCount);
};

Level.prototype.updateScore = function(score, wordCount) {
	$(".currentScore").text("Score: " + score);
	$(".currentCount").text("Word Count: " + wordCount);
};

Level.prototype.clearLevel = function() {
	this.words = [];
	this.currentWord = "";
	$(".guessedWords").empty();
	$(".guessedWords").remove();

	this.showGuessedWords();
	$(".error").text("");
};

module.exports = Level;
