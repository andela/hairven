'use strict';
var request = require('supertest');
var app = require('../../../server');
var db = require('../../../config/config');

describe('Hairstyles details', function() {

  //empty the database after each test.
  afterEach(function(done) {
    hairstyles.model.remove({}, function() {
      done();
    });

  });

  //test for to check if app prevents posting of an hairstyle without name
  it('without name should NOT be posted', function() {

    request(app)
      .post('/hairstyles')
      .send({
        name: undefined,
        image: 'hair_henna.jpg',
        description: 'sample hairstyles'
      })
      .expect(401)
      .expect({
        success: false,
        message: 'Please enter Hairstyle name'
      })
      .end(function(err) {
        if (err) {
          return done(err);
        }
        done();
      });
    done();
  });

  //test for to check if app prevents posting of an hairstyle without description
  it('without description should NOT be posted', function() {

    request(app)
      .post('/hairstyles')
      .send({
        name: 'sampleHair',
        image: 'hair_henna.jpg',
        description: undefined
      })
      .expect(401)
      .expect({
        success: false,
        message: 'please enter the Hairstyle description'
      })
      .end(function(err) {
        if (err) {
          return done(err);
        }
        done();
      });
    done();
  });

  //test for to check if app prevents posting of an hairstyle without image
  it('without image should NOT be posted', function() {

    request(app)
      .post('/hairstyles')
      .send({
        name: 'sampleHair',
        image: undefined,
        description: 'sample hairstyles'
      })
      .expect(401)
      .expect({
        success: false,
        message: 'Please upload a photo of the Hairstyle'
      })
      .end(function(err) {
        if (err) {
          return done(err);
        }
        done();
      });
    done();
  });


});


describe('Hairstyles', function() {

  //save hairstyle details in database before each test 
  beforeEach(function() {
    var testHair = {
      name: 'fineHair',
      details: 'a sample hairstyle for tests',
      image: 'hair_henna.jpg',
      meta: {
        upVotes: 23,
        downVotes: 5
      },
      saloons: {
        index: 1,
        saloonName: 'Beauty Palace',
        saloonAddress: 'Sabo, Yaba Lagos.'
      }
    }
    testHair = new Hair();
  });

  //empty the database after each test.
  afterEach(function(done) {
    hairstyles.model.remove({}, function() {
      done();
    });

  });

  //hairstyle posting test
  it('should POST successfully', function() {

    request(app)
      .post('/hairstyles')
      .send(testHair)
      .attach('hairPhoto', 'hair_henna.jpg')
      .expect(200)
      .expect({
        success: true,
        message: 'Hairstyle saved!'
      })
      .end(function(err) {
        if (err) {
          return done(err);
        }
        done();
      });
    done();

  });

  //test to check if app prevent posting of same hairstyle more than once
  it('should NOT be posted if name is already in database', function() {

    testHair.save();
    request(app)
      .post('/hairstyles')
      .send(testHair)
      .attach('hairPhoto', 'hair_henna.jpg')
      .expect(401)
      .expect({
        success: false,
        message: 'Hairstyle already exists, kindly search the gallery if you will like to update it.'
      })
      .end(function(err) {
        if (err) {
          return done(err);
        }
        done();
      });
    done();

  });

  //get for getting all hairstyles in database (i.e, for populating the gallery in view)
  it('GET request should return all successfully', function() {

    var testHairTwo = {
      name: 'uglyHair',
      details: 'another sample hairstyle for tests',
      image: 'hair_henna.jpg',
      date: Date.now(),
      meta: {
        upvotes: 3,
        downvotes: 26
      },
      saloons: {
        index: 2,
        saloonName: 'Iya Basira Beauty Center',
        saloonAddress: 'Onigbogbo Area, Okoko Lagos.'
      }
    }

    testHair.save();
    testHairTwo.save();

    request(app)
      .get('/hairstyles')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(testHair.name).toEqual('fineHair')
      .expect(testHairTwo.name).toEqual('uglyHair')
      .end(function(err) {
        if (err) {
          return done(err);
        }
        done();
      });
    done();

  });

  //test for get single hairstyle (for viewing a particular hairstyle details)
  it('GET request for a hairstyle should return the hairstyle', function() {

    testHair.save();
    request(app)
      .get('/hairstyles/:name')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(testHair.name).toEqual('fineHair')
      .end(function(err) {
        if (err) {
          return done(err);
        }
        done();
      });
    done();

  });

  //hairstyle update test
  it('details should update successfully', function() {

    testHair.save();
    var newDetails = {
      name: 'Shuku',
      meta: {
        upVotes: 55
      },
      date: Date.now()
    };

    request(app)
      .put('/hairstyles/:name')
      .send(newDetails.name, newDetails.meta.upVotes, newDetails.date)
      .expect(200)
      .expect({
        success: false,
        message: 'Hairstyle details updated!'
      })
      .end(function(req, res, err) {
        request(app)
          .get('/hairstyles/:name')
          .expect(200)
          .expect(testHair.name).toEqual('Shuku')
          .expect(testHair.meta.upVotes).toEqual(55)
          .expect(date).toEqual(Date.now())
          .end(function(err) {
            if (err) {
              return done(err);
            }
            done();
          });
        if (err) {
          return done(err);
        }
        done();
      });
    done();

  });

  //hairstyle remove test
  it('should delete successfully', function() {

    testHair.save();
    request(app)
      .delete('/hairstyles/fineHair')
      .expect(200)
      .expect({
        success: false,
        message: 'Hairstyle details updated!'
      })
      .end(function(req, res, err) {
        request(app)
          .get('/hairstyles/fineHair')
          .expect(200)
          .expect(testHair.name).toEqual('')
          .expect(testHair).toEqual([])
          .expect({
            success: false,
            message: 'hairstyle not found'
          })
          .end(function(err) {
            if (err) {
              return done(err);
            }
            done();
          });
        if (err) {
          return done(err);
        }
        done();
      });
    done();

  });
});
