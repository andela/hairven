var mongoose = require('mongoose');
var config = require('../../config/config');
var Saloon = require('../models/saloon.model');


module.exports = {

  createSaloon: function(req, res) {
    if (!req.body.name) {
      res.status(401).send({
        success: false,
        message: 'Please enter the name of your saloon'
      });
    } else if (!req.body.address) {
      res.status(401).send({
        success: false,
        message: 'Please enter the address of your saloon'
      });
    } else {
      var newSaloon = new Saloon(req.body);

      newSaloon.save(function(err) {
        if (err) {
          res.send(err)
        }
        res.send({
          success: true,
          message: 'your saloon successfully added to list'
        })

      })
    }
  },

  getSaloon: function(req, res) {
    // use mongoose to get all saloons in the database
    Saloon.findById(req.params.id)
    .populate('hairstyles')
    .exec(function(err, saloon) {
      // if there is an error retrieving, send the error.
      if (err){
        res.send(err);
      }
      else if(!saloon){
        res.status(404).send({
          success: false,
          message: 'Saloon not found'
        });
      }
      // return all saloon
      else {
        res.json(saloon);
      }
    })
  },

  updateSaloon: function(req, res) {

    // use the Hair model to find the hairstyle
    Saloon.update(req.params.id, req.body, function(err, saloon) {

      if (err) {
        res.send(err);
      } else {
        res.send({
          success: true,
          message: 'Saloon Updated!'
        });
      }
    });
  },

  // remove a hairstyle
  deleteSaloon: function(req, res) {

    Saloon.findById(req.params.id, req.body)
      .remove(function(err, saloon) {

        if (err) {
          res.send(err);
        } else {
          res.send({
            success: true,
            message: 'Saloon deleted from list'
          });
        }
      });
  }


};
