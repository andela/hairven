'use strict';

var Hairstyle = require('../../../app/models/hairstyle.model');
var db = require('../../../config/config');

describe("hairstyle Schema", function() {

  it("should create a hairstyle model", function() {
    var hairSample = new Hairstyle();
 
    expect(hairSample).toBeDefined();
    expect(typeof hairSample).toEqual(typeof {});
  });

  it("database should exist", function() {
    expect(typeof db).toEqual(typeof {});
    expect(db.database).toBeDefined();

  });

});
