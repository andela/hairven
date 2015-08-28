'use strict';

var Hairstyle = require('../../../app/models/hairstyle.model');

describe('hairstyle Schema', function() {

  it('should create a hairstyle model', function() {
    var hairSample = new Hairstyle();

    expect(hairSample).toBeDefined();
    expect(typeof hairSample).toEqual(typeof {});
  });
});
