'use strict';

import mongoose from 'mongoose';

var CreateSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model('Create', CreateSchema);
