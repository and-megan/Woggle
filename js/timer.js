var Timer= function($el, cb, $timerSpot) {
	this.$el = $el;
	this.cb = cb;
	this.startTime = 10;
	this.seconds = this.startTime;
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

	if (this.seconds === this.startTime) {
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
	$('.beginGame').addClass("hide-begin");
	$('.timer').removeClass("timer-spot-hidden");
};

Timer.prototype.stopPlaying = function() {
	this.ticking = false;
	clearInterval(this.timeInterval);
	this.cb();
	$(".timer").removeClass("ticking-time-bomb");
	this.seconds = this.startTime;
	$('.currentWord').text("");
	// $('.beginGame').removeClass("hide-begin");
	// $('.beginGame').text("Begin!");
	$('.timer').addClass("timer-spot-hidden");
	$('.playAgain').removeClass("hide-play-again");
// 	$("#over-modal").modal({onOpen: function (dialog) {
// 	dialog.overlay.fadeIn('slow', function () {
// 		dialog.container.slideDown('slow', function () {
// 			dialog.data.fadeIn('slow');
// 		});
// 	});
// }});
};

Timer.prototype.tick = function() {
	this.countdown();
	this.currentTime();
	if (this.seconds === 0) {
		this.stopPlaying();
	}
	if (this.seconds <= 10) {
		$(".timer").removeClass("regular-timer");
		$(".timer").addClass("ticking-time-bomb");
	}
	if (this.seconds > 10) {
		$(".timer").addClass("regular-timer");
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
