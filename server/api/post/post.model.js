'use strict';

import mongoose from 'mongoose';

var PostSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.String,
    ref: 'User'
  },
  synopsis: String,
  image_1: String,
  image_2: String,
  image_3: String,
  image_4: String,
  image_5: String,
  caption_1: String,
  caption_2: String,
  caption_3: String,
  caption_4: String,
  caption_5: String,
  created_at: {
    type: Date,
    default: Date.now },
  updated_at: Date,
  likes: Number,
  published: Boolean
});

export default mongoose.model('Post', PostSchema);
