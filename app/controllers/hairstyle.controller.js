var mongoose = require('mongoose');
var cloudinary = require('cloudinary');

var config = require('../../config/config');
var Hair = require('../models/hairstyle.model');

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret
});

module.exports = {

  //function for creation of hairstyle
  createHairStyle: function(req, res) {
    if (req.file) {
      var newHair = req.body;
      if (!newHair.name) {
        res.status(401).send({
          success: false,
          message: 'Please enter Hairstyle name'
        });
      } else if (!newHair.description) {
        res.status(401).send({
          success: false,
          message: 'Please enter a description for the Hairstyle'
        });
      } else {
        // Get temp file path
        var imageFile = req.file.path;

        //upload file to the cloudinary web-server
        cloudinary.uploader.upload(imageFile, function(response) {

          // create a new instance of the HairStyle model
          var hairStyle = new Hair(newHair);
          hairStyle.image = response.secure_url;
          hairStyle.save(function(err) {
            if (err) {
              res.send(err);
            } else {
              res.send({
                success: true,
                message: 'Hairstyle Saved!'
              });
            }
          });
        }, {
          use_filename: true
        });
      }
    } else {
      res.status(401).send({
        success: false,
        message: 'Please upload a photo of the Hairstyle'
      });
    }
  },


  //get hairstyles in database
  getAllHairStyles: function(req, res) {
    // use mongoose to get all hairstyles in the database
    Hair
      .find({})
      .populate('saloon')
      .exec(function(err, hairstyles) {
        // if there is an error retrieving, send the error.
        if (err || !hairstyles)
          res.send(err);
        // return all hairstyles in JSON format
        res.json(hairstyles);
      });
  },

  //get a specific hairstyle
  getById: function(req, res) {
    Hair.findById(req.params.id)
      .populate('saloon')
      .exec(function(err, hairstyle) {
        // if there is an error retrieving, send the error.
        if (err || !hairstyle) {
          res.status(404).send({
            success: false,
            message: 'Hairstyle not found'
          });
        }
        res.json(hairstyle);
      });
  },

  //edit details of a haistyle
  updateHairStyle: function(req, res) {

    // use the Hair model to find the hairstyle
    Hair.update(req.params.id, req.body, function(err, hairstyle) {

      if (err) {
        res.send(err);
      } else {
        res.send({
          success: true,
          message: 'Hairstyle Details Updated!'
        });
      }
    });
  },

  // remove a hairstyle
  removeHairStyle: function(req, res) {

    Hair.findById(req.params.id, req.body)
      .remove(function(err, hairstyle) {

        if (err) {
          res.send(err);
        } else {
          res.send({
            success: true,
            message: 'Hairstyle Deleted Successfully!'
          });
        }
      });
  }

};
