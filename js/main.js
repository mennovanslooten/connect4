/*

	TODO:
	[ ] Clean up code
		[ ] standardize style/notation
		[X] Spaces2Tabs
		[X] Do we need a state machine?
	[X] Remove gfx
	[ ] Remove jQuery
	[X] Move as much position & animation code from JS to CSS
*/

(function() {

	function startGame(ai_1_strength, ai_2_strength) {
		$('#board').empty();

		var game = new C4({
			ai_1_strength: ai_1_strength,
			ai_2_strength: ai_2_strength,
			container: '#board'
		});
	}


	$('#players').on('change', function() {
		var ai_1_strength = parseInt(this.player_1.value, 10);
		var ai_2_strength = parseInt(this.player_2.value, 10);

		console.log('startGame(', ai_1_strength, ai_2_strength);
		startGame(ai_1_strength, ai_2_strength);
	}).trigger('change');
})();

