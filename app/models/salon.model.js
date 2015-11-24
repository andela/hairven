var mongoose = require('mongoose');
var Hairstyle = require('./hairstyle.model');
var Schema = mongoose.Schema;
//schema for salons
var Salons = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
    required: 'Please enter salon name',
    index: true
  },
  address: {
    type: String,
    unique: true,
    require: true,
    required: 'Please enter the address of your salon'
  },

  hairstyles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hair'
  }]

});

Salons.pre('remove', function(next) {

  //remove all hairstyles posted by salon on salon delete
  this.model('Hairstyle').remove({
    salon: this._id
  }, next);
});

// The models for Hairstyles.
module.exports = mongoose.model('Salon', Salons);