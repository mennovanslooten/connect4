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

		startGame(ai_1_strength, ai_2_strength);
	}).trigger('change');
})();

