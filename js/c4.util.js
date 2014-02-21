C4.Util = function(_game) {
	var _util = {};
	var _rack = _game.rack;
	var _columns = _rack.length;
	var _rows = _rack[0].length;

	function findConnected() {
		var connected = [];
		//                S      SE      SW     E
		var directions = [[0,1], [-1,1], [1,1], [1, 0]];

		walkRack(function(player, c, r) {
			$.each(directions, function(i, direction) {
				var result = findConnectedInDirection(c, r, direction[0], direction[1]);
				if (result.length >= 4) {
					connected = connected.concat(result);
				}
			});
		});

		return connected;
	}


	function findConnectedInDirection(c, r, c_delta, r_delta) {
		var player = _rack[c][r];
		var connected = [[c,r]];
		try {
			while (_rack[c += c_delta][r += r_delta] === player) {
				connected.push([c,r]);
			}
		} catch (ex) { }
		return connected;
	}


	function walkRack(callback) {
		for (var c = 0; c < _columns; c++) {
			for (var r = 0; r < _rows; r++) {
				var player = _game.rack[c][r];
				if (player && player.color) {
					callback(player, c, r);
				}
			}
		}
	}


	function getDropRow(col_index) {
		var column = _rack[col_index];
		var row = _rows - 1;
		while (column[row]) {
			row--;
		}
		return row;
	}


	_game.util = {
		findConnected: findConnected,
		getDropRow: getDropRow
	};

};

