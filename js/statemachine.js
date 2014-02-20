function StateMachine(states) {
    var _current_state;
    var _state_bindings = {};
    var _event_bindings = {};

    states.changeState = function(new_state, data) {
        // console.log(_current_state, '-->', new_state);
        _current_state = new_state;
        var bindings = _state_bindings[new_state] || [];
        $.each(bindings, function(i, handler) {
            handler(data);
        });
    };

    //states.init();

    return {
        init: function() {
            states.init();
        },


        trigger: function(event, data) {
            // console.log('trigger', event, data, 'on', _current_state);
            states[_current_state](event, data);
            var event_bindings = _event_bindings[event] || [];
            $.each(event_bindings, function(i, handler) {
                handler(data);
            });
        },


        on: function(event, handler) {
            // console.log(event, 'is bound');
            if (!_event_bindings[event]) {
                _event_bindings[event] = [];
            }
            _event_bindings[event].push(handler);
        },


        when: function(state, handler) {
            if (!_state_bindings[state]) {
                _state_bindings[state] = [];
            }
            _state_bindings[state].push(handler);

            if (state === _current_state) {
                handler();
            }
        }
    };
}


