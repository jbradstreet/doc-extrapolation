'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostSchema = new _mongoose2.default.Schema({
  title: String,
  author: {
    type: _mongoose2.default.Schema.Types.String,
    ref: 'User'
  },
  synopsis: String,
  image_1: String,
  image_2: String,
  caption_1: String,
  caption_2: String,
  created_at: {
    type: Date,
    default: Date.now },
  updated_at: Date,
  likes: Number,
  published: Boolean
});

exports.default = _mongoose2.default.model('Post', PostSchema);
//# sourceMappingURL=post.model.js.map
