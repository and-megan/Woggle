var Timer= function($el, cb, $timerSpot) {
	this.$el = $el;
	this.cb = cb;
	this.seconds = 180;
	this.ticking = false;
	this.showTime();
	this.$timerSpot = $timerSpot;
};

Timer.prototype.showTime = function() {
	var beginGame = "<button>Begin!</button>";
	var $timerDisplay;
	var timer;
	var seconds;
	var $beginGame;

	$beginGame = $(beginGame).addClass("beginGame");

	if (this.seconds === 180) {
		this.$el.prepend($beginGame);
	}
};

Timer.prototype.currentTime = function () {
	var seconds;
	if (this.seconds === 180) {
		seconds = "3:00";
	}
	if (this.seconds < 180 && this.seconds >= 130) {
		seconds = "2:" + (this.seconds - 120);
	}
	if (this.seconds < 130 && this.seconds > 120) {
		seconds = "2:0" + (this.seconds - 120);
	}
	if (this.seconds === 120) {
		seconds = "2:00";
	}
	if (this.seconds < 120 && this.seconds >= 70) {
		seconds = "1:" + (this.seconds - 60);
	}
	if (this.seconds < 70 && this.seconds > 60) {
		seconds = "1:0" + (this.seconds - 60);
	}
	if (this.seconds === 60) {
		seconds = "1:00";
	}
	if (this.seconds < 60) {
		seconds = "0:" + this.seconds;
	}
	if (this.seconds < 10) {
		seconds = "0:0" + this.seconds;
	}

	$(".timer").empty();
	$(".timer").remove();
	var timer = "<div> Time Remaining: " + seconds + "</div>";
	var $timerDisplay = $(timer).addClass("timer");
	this.$timerSpot.append($timerDisplay);
};

Timer.prototype.beginPlaying = function() {

	this.ticking = true;
	this.timeInterval = setInterval(this.tick.bind(this), 1000);
	$('.beginGame').text("Swap letters for speed punishment");

};

Timer.prototype.stopPlaying = function() {

	this.ticking = false;

	clearInterval(this.timeInterval);
	$(".timer").removeClass("tickingTimeBomb");
	this.seconds = 180;
	$('.beginGame').text("Begin!");
};

Timer.prototype.tick = function() {
	this.countdown();
	this.currentTime();
	if (this.seconds === 0) {
		this.stopPlaying();
	}
	if (this.seconds <= 10) {
		$(".timer").removeClass("regularTimer");
		$(".timer").addClass("tickingTimeBomb");
	}
	if (this.seconds > 10) {
		$(".timer").addClass("regularTimer");
	}

};


Timer.prototype.toggleButton = function() {
	if (this.ticking) {
		this.stopPlaying();
	} else {
		this.beginPlaying();
	}
};

Timer.prototype.countdown = function() {
	this.seconds -= 1;
};

module.exports = Timer;
