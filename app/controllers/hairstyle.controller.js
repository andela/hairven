var mongoose = require('mongoose');
var cloudinary = require('cloudinary');

var config = require('../../config/config');
var Hair = require('../models/hairstyle.model');
var Salon = require('../models/salon.model');

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
              Salon.update({
                _id: newHair.salon
              }, {
                $addToSet: {
                  hairstyles: hairStyle
                }
              }, function(err, salon) {
                if (err) {
                  return err;
                } else {

                  res.send({
                    success: true,
                    message: 'Hairstyle Saved!'
                  });
                }
              });

            }
          });
        }, {
          use_filename: true
        }, {
          width: 400,
          height: 600,
          crop: "crop"
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
      .populate('salon')
      .exec(function(err, hairstyles) {
        // if there is an error retrieving, send the error.
        if (err) {
          res.send(err);
        } else if (!hairstyles) {
          res.status(404).send({
            success: false,
            message: 'Hairstyles not found'
          });
        } else {
          // return all hairstyles in JSON format
          res.json(hairstyles);
        }
      });
  },

  //get the hairstyles of a given salon
  getSalonHairStyles: function(req, res) {
    // use mongoose to get all hairstyles in the database
    Hair
      .find({
        salon: req.params.id
      })
      .populate('salon')
      .exec(function(err, hairstyles) {
        // if there is an error retrieving, send the error.
        if (err) {
          res.send(err);
        } else if (!hairstyles) {
          res.status(404).send({
            success: false,
            message: 'You currently have no Hairstyles'
          });
        } else {
          // return all hairstyles in JSON format
          res.json(hairstyles);
        }
      });
  },


  //get a specific hairstyle
  getById: function(req, res) {
    Hair.findById(req.params.id)
      .populate('salon')
      .exec(function(err, hairstyle) {
        // if there is an error retrieving, send the error.
        if (err) {
          res.send(err);
        } else if (!hairstyle) {
          res.status(404).send({
            success: false,
            message: 'Hairstyle not found'
          });
        } else {
          res.json(hairstyle);
        }
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

    Hair.findById(req.params.id)
      .remove(function(err, hairstyle) {

        if (err) {
          console.log(err)
          res.send({
            success: false,
            message: 'error deleting hairstyle'
          });
        } else {
          Salon.update({
            _id: hairstyle.salon
          }, {
            $pull: {
              hairstyles: hairstyle._id
            }
          }, function(err, salon) {
            if (err) {
              console.log(err);
            } else {
              res.send({
                success: true,
                message: 'Hairstyle Deleted Successfully!'
              });

            }
          });

        }
      });
  }

};
