var mongoose = require('mongoose');
var Hairstyle = require('./hairstyle.model')
var Schema = mongoose.Schema;
//schema for saloons
var saloons = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
    required: 'Please enter Saloon name',
    index: true
  },
  address: {
    type: String,
    unique: true,
    require: true,
    required: 'Please enter the address of your saloon'
  },

  hairstyles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hair'
  }]

});


// The models for Hairstyles.
module.exports = mongoose.model('Saloon', saloons);
