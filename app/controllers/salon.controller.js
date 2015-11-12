var mongoose = require('mongoose');
var config = require('../../config/config');
var Salon = require('../models/salon.model');


module.exports = {

  createSalon: function(req, res) {
    if (!req.body.name) {
      res.status(401).send({
        success: false,
        message: 'Please enter the name of your salon'
      });
    } else if (!req.body.address) {
      res.status(401).send({
        success: false,
        message: 'Please enter the address of your salon'
      });
    } else {
      var newSalon = new Salon(req.body);

      newSalon.save(function(err) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            success: true,
            message: 'your salon successfully added to list',
            salon: newSalon
          });
        }
      });
    }
  },

  getSalon: function(req, res) {
    // use mongoose to get all salons in the database
    Salon.findById(req.params.id)
      .populate('hairstyles')
      .exec(function(err, salon) {
        // if there is an error retrieving, send the error.
        if (err) {
          res.send(err);
        } else if (!salon) {
          res.status(404).send({
            success: false,
            message: 'salon not found'
          });
        }
        // return all salon
        else {
          res.json(salon);
        }
      });
  },

  updateSalon: function(req, res) {

    // use the Hair model to find the hairstyle
    Salon.update(req.params.id, req.body, function(err, salon) {

      if (err) {
        res.send(err);
      } else {
        res.send({
          success: true,
          message: 'salon Updated!'
        });
      }
    });
  },

  // remove a hairstyle
  deleteSalon: function(req, res) {

    Salon.findById(req.params.id, req.body)
      .remove(function(err, salon) {

        if (err) {
          res.send(err);
        } else {
          res.send({
            success: true,
            message: 'salon deleted from list'
          });
        }
      });
  }


};
