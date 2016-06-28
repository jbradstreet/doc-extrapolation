/**
 * Create model events
 */

'use strict';

import {EventEmitter} from 'events';
import Create from './create.model';
var CreateEvents = new EventEmitter();

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
  Create.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CreateEvents.emit(event + ':' + doc._id, doc);
    CreateEvents.emit(event, doc);
  }
}

export default CreateEvents;
