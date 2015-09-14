var mongoose = require('mongoose');
var saloons = require('./saloon.model');
var Schema = mongoose.Schema;
//schema for hairstyles

var hairStyle = new Schema({
  name: {
    type: String,
    require: true,
    required: 'Please enter Hairstyle name',
    index: true
  },
  description: {
    type: String,
    require: true,
    required: 'Please enter the Hairstyle description'
  },
  image: {
    type: String,
    require: true,
    required: 'Please upload a photo of the Hairstyle'
  },
  date: {
    type: Date,
    default: Date.now('dd/mm/yyyy'),
    index: true
  },
  saloon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Saloon',
    index: true
  },
  rating: {
    type: Number,
    index: true
  }

});


// The models for Hairstyles.
module.exports = mongoose.model('Hair', hairStyle);
