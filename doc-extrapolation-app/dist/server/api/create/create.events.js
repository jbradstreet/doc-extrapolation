/**
 * Create model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _create = require('./create.model');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreateEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
CreateEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _create2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    CreateEvents.emit(event + ':' + doc._id, doc);
    CreateEvents.emit(event, doc);
  };
}

exports.default = CreateEvents;
//# sourceMappingURL=create.events.js.map
