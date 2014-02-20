var C4 = function(options) {
	var _game = this;
	var _columns = 7;
	var _rows = 6;
	var _counter = 0;
	var _event_handlers = {};

	this.current = null;
	this.rack = [];
	this.moves = [];


	function Player(color) {
		this.color = color;
		this.human = true;
		this.toString = function() {
			return this === _game.current ? 'X' : 'O';
		};
	}


	this.init = function(options) {
		for (var c = 0; c < _columns; c++) {
			this.rack[c] = new Array(_rows);
		}
		var player1 = new Player('yellow');
		var player2 = new Player('red');

		player1.opponent = player2;
		player2.opponent = player1;
		this.current = player1;

		C4.Util(this);
		C4.UI(this, options);

		// Determine type of game:
		//  - no options: human vs human
		//  - options.ai = 1 or 3 -> player 1 is AI
		//  - options.ai = 2 or 3 -> player 2 is AI
		if (options.ai) {
			if (1 & options.ai) {
				C4.AI(this, this.current);
			}
			if (2 & options.ai) {
				C4.AI(this, this.current.opponent);
			}
		}

		this.trigger('waitingForDrop');
	};


	this.on = function(event, handler) {
		if (!(event in _event_handlers)) {
			_event_handlers[event] = [];
		}

		_event_handlers[event].push(handler);
	};


	this.trigger = function(event, data) {
		if (!(event in _event_handlers)) return;

		var handlers = _event_handlers[event];
		$.each(handlers, function(index, handler) {
			handler(data);
		});
	};

	this.on('drop', function(data) {
		if (!data) return;

		var row_index = _game.util.getDropRow(data.col_index);
		if (row_index > -1) {
			_counter++;
			_game.rack[data.col_index][row_index] = _game.current; 
			_game.moves.push({
				player: _game.current,
				col_index: data.col_index,
				row_index: row_index
			});

			var connected = _game.util.findConnected();
			if (connected.length) {
				_game.trigger('done', {
					winner: _game.current,
					connected: connected
				});
			} else if (_counter === _columns * _rows) {
				_game.trigger('done');
			} else {
				_game.current = _game.current.opponent;
				_game.trigger('waitingForDrop');
			}
		}
	});

	this.init(options);
};
