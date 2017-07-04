/* globals: api */
require('../helper');

const User = require('../../models/user');

describe('Authentication tests', function() {

  this.timeout(5000);

  beforeEach(done => {
    User.collection.remove();
    done();
  });

  describe('POST /api/register with good credentials', () => {
    it('should return a message', done => {
      api.post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'test',
          email: 'test@test.com',
          password: 'password',
          passwordConfirmation: 'password',
          image: 'http://image.com',
          postcode: 'B461QR',
          trailsCompleted: []
        }).end((err, res) => {
          expect(res.body.message).to.be.a('string');
          done();
        });
    });
  });

  describe('POST /api/register with bad credentials', () => {
    it('should return a 400 response', done => {
      api.post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'test',
          email: 'test@test.com'
        }).expect(400, done);
    });
  });

  describe('POST /api/login with good credentials', () => {

    it('should return a token', done => {
      User.create({
        username: 'test',
        email: 'test@test.com',
        password: 'password',
        passwordConfirmation: 'password'
      }, () => {
        api.post('/api/login')
          .set('Accept', 'application/json')
          .send({
            email: 'test@test.com',
            password: 'password'
          }).end((err, res) => {
            expect(res.body.token).to.be.a('string');
            done();
          });
      });
    });
  });

  describe('POST /api/login with bad credentials', () => {

    it('should return a 401 response', done => {
      User.create({
        username: 'test',
        email: 'test@test.com',
        password: 'password',
        passwordConfirmation: 'password'
      }, () => {
        api.post('/api/login')
          .set('Accept', 'application/json')
          .send({
            email: 'test@test.com',
            password: 'pass'
          }).expect(401, done);
      });
    });
  });
});
