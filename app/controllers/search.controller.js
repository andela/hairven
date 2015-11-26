var Salon = require('../models/salon.model');
var Hair = require('../models/hairstyle.model');

exports.search = function(req, res) {
  var searchTerm = req.query.term;
  var term = new RegExp(searchTerm, 'i');
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
              message: 'Your search ' + searchTerm + 
                ' does not match any Salons or Hairstyles.'
            });
          }
          else {
            results.push(hairstyles);
            res.status(200).send({
              success: true,
              message: 'Showing search results for ' + searchTerm,
              data: {
                salons: results[0],
                hairstyles: results[1]
              }
            });
          }
    });
  });
};

