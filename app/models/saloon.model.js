var mongoose = require('mongoose');
var Hairstyle = require('./hairstyle.model')
var Schema = mongoose.Schema;
//schema for saloons
var saloons = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
    required: 'Please enter Saloon name'
  },
  address: {

    details: {
      type: String,
      unique: true,
      require: true,
      required: 'Please enter the address of your saloon'
    },
    state: String
  },

  hairstyles: {
    type: Schema.Types.ObjectId,
    ref: 'Hair'
  },
  upVotes: Number,
  downVotes: Number

});


// The models for Hairstyles.
module.exports = mongoose.model('Saloon', saloons);
