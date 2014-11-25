'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../server');

var expect = chai.expect;

describe('database', function(){
  it('should be able to post a file', function(done){
    chai.request('http://localhost:3000')
      .post('/data.txt')
      .send({message: 'sample json message'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        done();
      });
  });
  
  it('should return a posted file', function(done) {
    chai.request('http://localhost:3000')
      .get('/data.txt')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.message).to.eql('sample json message');
        done();
      });
  });
});
