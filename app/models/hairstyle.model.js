var mongoose = require('mongoose');
var database = require('../../config/config').database;

// grab the mongoose module

mongoose.connect(database);

//schema for hairstyles

var hairStyle = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true,
    required: 'Please enter Hairstyle name'
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
    default: Date.now('dd/mm/yyyy')
  },
  saloon: {
    userId: Number,
    saloonName: String,
    saloonAddress: String,
  },
  rating: Number
  

});


// The models for Hairstyles.
module.exports = mongoose.model('Hair', hairStyle);