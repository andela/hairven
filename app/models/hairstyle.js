var Db = require('mongodb').Db;
var mongoose = require('mongoose');
var database = require('../../config/config');

// grab the mongoose module

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting:'));
db.once('open', function(callback) {
  console.log('connected!');

});

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
  saloons: {
    saloonName: {
      type: String,
    },
    saloonAddress: {
      type: String
    }
  },
  meta: {
    upVotes: Number,
    downVotes: Number
  },

});


// The models for Hairstyles.
module.exports = mongoose.model('Hair', hairStyle);