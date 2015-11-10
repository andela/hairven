var mongoose = require('mongoose');
var Salons = require('./salon.model');
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
    default: Date.now('dd/mm/yyyy')
  },

  salon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Salon'
  },
  rating: {
    type: Number
  }

});


// The models for Hairstyles.
module.exports = mongoose.model('Hair', hairStyle);
