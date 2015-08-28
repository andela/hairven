'use strict';
var request = require('supertest');

var app = require('../../../server');
var Hair = require('../../../app/models/hairstyle.model');

describe('Hairstyles details', function() {

  //empty the database after each test.
  afterEach(function(done) {
    Hair.remove({}, function() {

    });
    done();
  });

  //test for to check if app prevents posting of an hairstyle without image
  it('without image should NOT be posted', function(done) {

    request(app)
      .post('/hairstyles')
      .send({
        name: 'sampleHair',
        description: 'sample hairstyles'
      })
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: false,
          message: 'Please upload a photo of the Hairstyle'
        }));
        expect(response.statusCode).toBe(401);
        done();
      });
  });

  it('without name should NOT be posted', function(done) {

    request(app)
      .post('/hairstyles')
      .field('name', '')
      .field('description', 'sample hairstyles')
      .attach('hairPhoto', 'hair_henna.jpg')
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: false,
          message: 'Please enter Hairstyle name'
        }));
        expect(response.statusCode).toBe(401);
        done();
      });
  });

  //test for to check if app prevents posting of an hairstyle without description
  it('without description should NOT be posted', function(done) {

    request(app)
      .post('/hairstyles')
      .set('Accept', 'application/json')
      .field('name', 'sampleHair')
      .field('description', '')
      .attach('hairPhoto', 'hair_henna.jpg')
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: false,
          message: 'Please enter a description for the Hairstyle'
        }));
        expect(response.statusCode).toBe(401);
        done();
      });
  });


});


describe('Hairstyles', function() {

  //create test data before each test.
  beforeEach(function(done) {
    var sampleHair = {
      _id: '55dc7552485fdd167d689439',
      name: 'fineHair',
      description: 'a sample hairstyle for tests',
      image: 'hair_henna.jpg',
      rating: 4
    };
    var testHair = new Hair(sampleHair);
    testHair.save(function(err) {
      if (err) {
        console.log(err);
      }
    });
    done();
  });


  //empty the database after each test.
  afterEach(function(done) {
    Hair.remove({}, function() {});
    done();
  });



  // //hairstyle posting test
  it('should POST successfully', function(done) {

    request(app)
      .post('/hairstyles')
      .field('_id', '55dc7552485fdd152d689439')
      .field('name', 'uglyHair')
      .field('description', 'a sample hairstyle for tests')
      .field('rating', 4)
      .attach('hairPhoto', 'hair_henna.jpg')
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: true,
          message: 'Hairstyle Saved!'
        }));
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  //get for getting all hairstyles in database (i.e, for populating the gallery in view)
  it('GET request should return all successfully', function(done) {
    var sampleHairTwo = {
      name: 'uglyHair',
      description: 'another sample hairstyle for tests',
      image: 'hair_henna.jpg',
      date: Date.now(),
      rating: 1
    };

    var testHairTwo = new Hair(sampleHairTwo);

    testHairTwo.save(function(err) {
      if (err) {
        console.log(err)
      }
    });

    request(app)
      .get('/hairstyles')
      .expect('Content-Type', /json/)
      .end(function(err, response) {
        expect(response.statusCode).toBe(200);
        expect(response.body[0].name).toEqual('fineHair');
        expect(response.body[0].description).toEqual('a sample hairstyle for tests');
        expect(response.body[0].rating).toEqual(4);
        expect(response.body[1].name).toEqual('uglyHair');
        expect(response.body[1].description).toEqual('another sample hairstyle for tests');
        expect(response.body[1].rating).toEqual(1);
        if (err) {
          console.log(err)
        }
        done();
      });
  });

  //test for get single hairstyle (for viewing a particular hairstyle details)
  it('GET request for a hairstyle should return the hairstyle', function(done) {
    var id = '55dc7552485fdd167d689439';
    request(app)
      .get('/hairstyles/' + id)
      .expect('Content-Type', /json/)
      .end(function(err, response) {
        expect(response.statusCode).toBe(200);
        if (err) {
          console.log(err)
        }
        done();
      });

  });

  //   //hairstyle update test
  it('details should update successfully', function(done) {
    var id = '55dc7552485fdd167d689439';
    request(app)
      .put('/hairstyles/' + id)
      .field('name', 'Shuku')
      .field('rating', 3)
      .field('date', Date.now())
      .attach('hairPhoto', 'hair_henna.jpg')
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: true,
          message: 'Hairstyle Details Updated!'
        }));
        expect(response.statusCode).toBe(200);
        request(app)
          .get('/hairstyles/' + id)
          .end(function(err, response) {
            expect(response.statusCode).toBe(200);
            if (err) {
              console.log(err);
            }
            done();
          })
        if (err) {
          console.log(err);
        }
        done();
      });
  });

  //hairstyle remove test
  it('should delete successfully', function(done) {
    var id = '55dc7552485fdd167d689439';
    request(app)
      .delete('/hairstyles/' + id)
      .end(function(err, response) {
        expect(response.body).toEqual(jasmine.objectContaining({
          success: true,
          message: 'Hairstyle Deleted Successfully!'
        }));
        expect(response.statusCode).toBe(200);
        request(app)
          .get('/hairstyles/' + id)
          .end(function(err, response) {
            expect(response.statusCode).toBe(200);
            if (err) {
              console.log(err);
            }
            done();
          })
        if (err) {
          console.log(err);
        }
        done();
      });
  });

});
