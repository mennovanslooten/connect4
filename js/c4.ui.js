C4.UI = function(_game, _options) {
	var $board = $(_options.container);
	var $controls;
	var $coins;
	var $rack;


	function init() {
		$rack = $('<div class="rack"/>');
		$coins = $('<div class="coins"></div>');
		$controls = $('<div class="controls"></div>');

		for (var c = 0; c < _game.rack.length; c++) {
			$controls.append('<div class="control col-' + c + '"/>');
		}

		$controls.on('click', '.control', function() {
			var c = $(this).index();
			_game.trigger('drop', { col_index : c });
		});

		$rack.append($controls);
		$rack.append($coins);
		$board.append($rack);
	}


	function updateControls() {
		$controls.children().removeClass(_game.current.opponent.color);
		$controls.children().addClass(_game.current.color);
		$controls.toggleClass('enabled', _game.current.human);
	}


	function showLastMove() {
		if (!_game.moves.length) {
			return;
		}
		var move = _game.moves[_game.moves.length - 1];
		var c = move.col_index;
		var r = move.row_index;
		var coin = $('<div class="coin col-' + c + ' ' + move.player.color + '" id="cell-' + c + '-' + r + '"/>');

		$coins.append(coin);

		setTimeout(function() {
			coin.addClass('row-' + r);
		}, 50);
	}


	_game.on('waitingForDrop', updateControls);


	_game.on('waitingForDrop', showLastMove);


	_game.on('done', function(data) {
		var $message = $('<div class="message"/>');
		$rack.prepend($message);
		$controls.remove();
		var message = 'Draw';

		showLastMove();

		if (data && data.connected) {
			for (var i = 0; i < data.connected.length; i++) {
				var col_index = data.connected[i][0];
				var row_index = data.connected[i][1];
				var cell = $('#cell-' + col_index + '-' + row_index);
				cell.addClass('connected');
			}
			message = data.winner.color + ' wins';
		}

		$message.text(message);
	});


	init();

};
