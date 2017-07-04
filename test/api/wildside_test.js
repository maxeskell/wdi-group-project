require('../helper');

const Trail = require('../../models/trail');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const {
  secret
} = require('../../config/environment');

let token;

describe('Trail tests', () => {

  beforeEach(done => {
    Trail.collection.remove();
    User.collection.remove();
    done();
  });

  describe('GET /api/trails', () => {
    beforeEach(done => {
      User
        .create({
          username: 'max',
          email: 'max@sam',
          password: 'password',
          passwordConfirmation: 'password',
          image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Fischotter%2C_Lutra_Lutra.JPG',
          postcode: 'B461QR'
        })
        .then((user) => {
          return Trail
            .create({
              trailName: 'route 1',
              description: 'route 1 description',
              difficulty: 1,
              image: 'https://www.rspb.org.uk/Images/barnowl_tcm9-18232.jpg?width=530&crop=(34,244,962,766)',
              createdBy: user,
              trailsCompleted: [],
              comments: [],
              route: [{
                lat: 50.8531002,
                lng: -1.0619831
              }, {
                lat: 50.86339441,
                lng: -1.06395721
              }, {
                lat: 50.86767395,
                lng: -1.05803489
              }, {
                lat: 50.86642804,
                lng: -1.05254173
              }, {
                lat: 50.8654529,
                lng: -1.047048
              }]
            }, done);
        });
    });

    it('should return a 200 response', done => {
      api.get('/api/trails')
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    it('should respond with a JSON object', done => {
      api.get('/api/trails')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.header['content-type']).to.be.eq('application/json; charset=utf-8');
          done();
        });
    });

    it('should return an array of trails', done => {
      api.get('/api/trails')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should return an array of trail objects', done => {
      api.get('/api/trails')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body)
            .and.be.an('array')
            .and.have.property(0)
            .and.have.all.keys([
              'id',
              'trailName',
              'description',
              'difficulty',
              'image',
              'imageSRC',
              'createdBy',
              'trailsCompleted',
              'comments',
              'route'
            ]);
          done();
        });
    });
  });

  describe('POST /api/trails without token', () => {

    let user;

    beforeEach(done => {
      User
        .create({
          username: 'max',
          email: 'max@sam',
          password: 'password',
          passwordConfirmation: 'password',
          image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Fischotter%2C_Lutra_Lutra.JPG',
          postcode: 'B461QR'
        }, (err, _user) => {
          user = _user;
          done();
        });
    });

    it('should return a 401 response', done => {

      api.post('/api/trails')
        .set('Accept', 'application/json')
        .send({
          trailName: 'route 1',
          description: 'route 1 description',
          difficulty: 1,
          image: 'https://www.rspb.org.uk/Images/barnowl_tcm9-18232.jpg?width=530&crop=(34,244,962,766)',
          createdBy: user,
          trailsCompleted: [],
          comments: [],
          route: [{
            lat: 50.8531002,
            lng: -1.0619831
          }, {
            lat: 50.86339441,
            lng: -1.06395721
          }, {
            lat: 50.86767395,
            lng: -1.05803489
          }, {
            lat: 50.86642804,
            lng: -1.05254173
          }, {
            lat: 50.8654529,
            lng: -1.047048
          }]
        }).expect(401, done);
    });

  });

  describe('POST /api/trails with token', () => {

    let user;

    beforeEach(done => {
      User.create({
        username: 'max',
        email: 'max@sam',
        password: 'password',
        passwordConfirmation: 'password',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Fischotter%2C_Lutra_Lutra.JPG',
        postcode: 'B461QR'
      }, (err, _user) => {
        user = _user;
        token = jwt.sign({
          userId: _user.id
        }, secret, {
          expiresIn: 60 * 60 * 24
        });
        done();
      });
    });

    it('should return a 201 response', done => {
      api.post('/api/trails')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          trailName: 'route 1',
          description: 'route 1 description',
          difficulty: 1,
          image: 'https://www.rspb.org.uk/Images/barnowl_tcm9-18232.jpg?width=530&crop=(34,244,962,766)',
          createdBy: user,
          trailsCompleted: [],
          comments: [],
          route: [{
            lat: 50.8531002,
            lng: -1.0619831
          }, {
            lat: 50.86339441,
            lng: -1.06395721
          }, {
            lat: 50.86767395,
            lng: -1.05803489
          }, {
            lat: 50.86642804,
            lng: -1.05254173
          }, {
            lat: 50.8654529,
            lng: -1.047048
          }]
        }).expect(201, done);
    });
  });

  describe('GET /api/trails/:id', () => {

    let trail;

    beforeEach(done => {
      User
        .create({
          username: 'max',
          email: 'max@sam',
          password: 'password',
          passwordConfirmation: 'password',
          image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Fischotter%2C_Lutra_Lutra.JPG',
          postcode: 'B461QR'
        })
        .then((user) => {
          return Trail
            .create({
              trailName: 'route 1',
              description: 'route 1 description',
              difficulty: 1,
              image: 'https://www.rspb.org.uk/Images/barnowl_tcm9-18232.jpg?width=530&crop=(34,244,962,766)',
              createdBy: user,
              trailsCompleted: [],
              comments: [],
              route: [{
                lat: 50.8531002,
                lng: -1.0619831
              }, {
                lat: 50.86339441,
                lng: -1.06395721
              }, {
                lat: 50.86767395,
                lng: -1.05803489
              }, {
                lat: 50.86642804,
                lng: -1.05254173
              }, {
                lat: 50.8654529,
                lng: -1.047048
              }]
            }, (err, _trail) => {
              trail = _trail;
              done();
            });
        });
    });

    it('should return a 200 response', done => {
      api.get(`/api/trails/${trail.id}`)
        .set('Accept', 'application/json')
        .expect(200, done);
    });
  });

  describe('DELETE /api/trails/:id without token', () => {

    let trail;
    beforeEach(done => {
      User
        .create({
          username: 'max',
          email: 'max@sam',
          password: 'password',
          passwordConfirmation: 'password',
          image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Fischotter%2C_Lutra_Lutra.JPG',
          postcode: 'B461QR'
        })
        .then((user) => {
          return Trail
            .create({
              trailName: 'route 1',
              description: 'route 1 description',
              difficulty: 1,
              image: 'https://www.rspb.org.uk/Images/barnowl_tcm9-18232.jpg?width=530&crop=(34,244,962,766)',
              createdBy: user,
              trailsCompleted: [],
              comments: [],
              route: [{
                lat: 50.8531002,
                lng: -1.0619831
              }, {
                lat: 50.86339441,
                lng: -1.06395721
              }, {
                lat: 50.86767395,
                lng: -1.05803489
              }, {
                lat: 50.86642804,
                lng: -1.05254173
              }, {
                lat: 50.8654529,
                lng: -1.047048
              }]
            }, (err, _trail) => {
              trail = _trail;
              done();
            });
        });
    });

    it('should return a 401 response', done => {
      api.delete(`/api/trails/${trail.id}`)
        .set('Accept', 'application/json')
        .expect(401, done);
    });

  });

  describe('DELETE /api/trails/:id with token', () => {

    let user;

    beforeEach(done => {
      User.create({
        username: 'max',
        email: 'max@sam',
        password: 'password',
        passwordConfirmation: 'password',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Fischotter%2C_Lutra_Lutra.JPG',
        postcode: 'B461QR'
      }, (err, _user) => {
        user = _user;
        token = jwt.sign({
          userId: _user.id
        }, secret, {
          expiresIn: 60 * 60 * 24
        });
        done();
      });
    });

    it('should return a 204 response', done => {

      Trail.create({
        trailName: 'route 1',
        description: 'route 1 description',
        difficulty: 1,
        image: 'https://www.rspb.org.uk/Images/barnowl_tcm9-18232.jpg?width=530&crop=(34,244,962,766)',
        createdBy: user,
        trailsCompleted: [],
        comments: [],
        route: [{
          lat: 50.8531002,
          lng: -1.0619831
        }, {
          lat: 50.86339441,
          lng: -1.06395721
        }, {
          lat: 50.86767395,
          lng: -1.05803489
        }, {
          lat: 50.86642804,
          lng: -1.05254173
        }, {
          lat: 50.8654529,
          lng: -1.047048
        }]
      }, (err, trail) => {
        api.delete(`/api/trails/${trail.id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .expect(204, done);
      });
    });
  });

});
