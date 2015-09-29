'use strict';

var mongoose = require('mongoose')
var db = require('../../../config/config');

describe('database', function() {

  it('should exist and connect properly', function() {

    var dbConnect = mongoose.connection.on('connect', function() {
      mongoose.connection.db.listCollections(function(err, collections) {
        if (err) {
          return err;
        } else {
          return collections;
        }
      });
    });

    expect(typeof db).toEqual(typeof {});
    expect(db.database).toBeDefined();
    expect(dbConnect).toBeDefined;
    expect(typeof dbConnect).toEqual(typeof {});
  });

});
