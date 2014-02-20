/*

	TODO:
	[ ] Clean up code
		[ ] Spaces2Tabs
		[ ] Do we need a state machine?
	[X] Remove gfx
	[ ] Remove jQuery
	[X] Move as much position & animation code from JS to CSS
*/

(function() {

	function startGame(options) {
		$('#board').empty();

		options = $.extend(options, {
			container: '#board'
		});

		var game = new C4(options);
	}


	function startPvp() {
		startGame();
	}


	function startPvc() {
		startGame({ ai: 2 });
	}


	function startCvp() {
		startGame({ ai: 1 });
	}


	function startCvc() {
		startGame({ ai: 3 });
	}


	$('.pvp').on('click', startPvp);
	$('.pvc').on('click', startPvc);
	$('.cvp').on('click', startCvp);
	$('.cvc').on('click', startCvc);

	startPvc();
})();

