var Salon = require('../models/salon.model');
var Hair = require('../models/hairstyle.model');

exports.search = function(req, res) {
  var term = new RegExp(req.body.term, 'i');
  var results = [];
  Salon.find({$or:[{name:term}, {address:term}]}, 
    function(err, salons) {
      if (err) {
        res.status(403).send({
          success: false,
          message: 'Ooops! An error occured.'
        });
      }
      results.push(salons);
      Hair.find({$or: [{name: term}, {description: term}]}, 
        function(err, hairstyles) {
          if (err) {
            res.status(403).send({
              success: false,
              message: 'Ooops! An error occured.'
            });
          }
          else if (salons.length === 0 && hairstyles.length === 0) {
            res.status(200).send({
              success: true,
              message: 'Your search ' + req.body.term + 
                ' does not match any Salons or Hairstyles.'
            });
          }
          else {
            results.push(hairstyles);
            res.status(200).send({
              success: true,
              message: 'Showing search results for ' + req.body.term,
              data: {
                salons: results[0],
                hairstyles: results[1]
              }
            });
          }
    });
  });
};

