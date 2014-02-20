C4.UI = function(game, options) {
	var $controls;
	var $coins;
	var $rack;


	function init() {
		$rack = $('<div class="rack"/>');
		$coins = $('<div class="coins"></div>');
		$controls = $('<div class="controls"></div>');

		for (var c = 0; c < game.rack.length; c++) {
			$controls.append('<div class="control col-' + c + '"/>');
		}

		$controls.on('click', '.control', function() {
			var c = $(this).index();
			game.trigger('drop', { col_index : c });
		});

		$rack.append($controls);
		$rack.append($coins);

		$(options.container).append($rack);
	}


	function updateControls() {
		$controls.children().removeClass(game.current.opponent.color);
		$controls.children().addClass(game.current.color);
		$controls.toggleClass('enabled', game.current.human);
	}


	function showLastMove() {
		if (!game.moves.length) {
			return;
		}
		var move = game.moves[game.moves.length - 1];
		var c = move.col_index;
		var r = move.row_index;
		var coin = $('<div class="coin col-' + c + ' ' + move.player.color + '" id="cell-' + c + '-' + r + '"/>');

		$coins.append(coin);

		setTimeout(function() {
			coin.addClass('row-' + r);
		}, 50);
	}


	game.on('waitingForDrop', updateControls);


	game.on('waitingForDrop', showLastMove);


	game.on('done', function(data) {
		$controls.removeClass('enabled');
		showLastMove();

		if (data && data.connected) {
			for (var i = 0; i < data.connected.length; i++) {
				var col_index = data.connected[i][0];
				var row_index = data.connected[i][1];
				var cell = $('#cell-' + col_index + '-' + row_index);
				cell.addClass('connected');
			}
		} else {
			//alert('draw');
		}
	});


	init();

};
