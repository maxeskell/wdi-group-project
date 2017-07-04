const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const {
  dbURI
} = require('../config/environment');
const Trail = require('../models/trail');
const User = require('../models/user');

mongoose.connect(dbURI);

User.collection.drop();
Trail.collection.drop();

User
  .create([{
    username: 'max',
    email: 'max@sam',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Fischotter%2C_Lutra_Lutra.JPG',
    postcode: 'B461QR'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Trail
      .create([{
        trailName: 'route 1',
        description: 'route 1 description',
        difficulty: 1,
        image: 'http://sites.psu.edu/siowfa14/wp-content/uploads/sites/13467/2014/10/Men-and-Women-walking_cropped.jpg',
        createdBy: users[0],
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
        }],
        trailsCompleted: []
      }, {
        trailName: 'route 2',
        description: 'route 2 description',
        difficulty: 2,
        image: 'http://img.mp.itc.cn/upload/20170314/9052b6c3e8264d8caafa5e89568f76eb_th.jpeg',
        createdBy: users[0],
        route: [{
          lat: 51.78738244272961,
          lng: 0.010471343994140625
        }, {
          lat: 51.78881593826509,
          lng: 0.008540153503417969
        }, {
          lat: 51.78812574239775,
          lng: 0.0032186508178710938
        }, {
          lat: 51.80864128611545,
          lng: 0.02368927001953125
        }, {
          lat: 51.80951690365106,
          lng: -0.029354095458984375
        }, {
          lat: 51.808030997167535,
          lng: -0.030426979064941406
        }, {
          lat: 51.80601433144506,
          lng: -0.02780914306640625
        }]
      }, {
        trailName: 'route 3',
        description: 'route 3 description',
        difficulty: 3,
        image: 'http://evidencebasedliving.human.cornell.edu/files/2015/01/Walking_for_Health_in_Epsom-5Aug2009_2-286n9rz.jpg',
        createdBy: users[0],
        route: [{
          lat: 51.515,
          lng: 0.072
        }, {
          lat: 51.51,
          lng: -0.07
        }, {
          lat: 51.51,
          lng: -0.07
        }, {
          lat: 51.51,
          lng: -0.07
        }, {
          lat: 51.51,
          lng: -0.07
        }],
        trailsCompleted: []
      }, {
        trailName: 'route 4',
        description: 'route 4 description',
        difficulty: 4,
        image: 'https://images.amcnetworks.com/amc.com/wp-content/uploads/2017/04/the-walking-dead-episode-716-daryl-reedus-800x600-sync-post.jpg',
        createdBy: users[0],
        route: [{
          lat: 51.5151,
          lng: 0.0720
        }, {
          lat: 51.5162,
          lng: -0.0763
        }, {
          lat: 51.5162,
          lng: -0.0763
        }, {
          lat: 51.514504,
          lng: -0.0739
        }, {
          lat: 51.5149,
          lng: -0.0725
        }],
        trailsCompleted: []
      }, {
        trailName: 'route 5',
        description: 'route 5 description',
        difficulty: 5,
        image: 'http://www.discoversuffolk.org.uk/walking/',
        createdBy: users[0],
        route: [{
          lat: 51.51515,
          lng: 0.07201
        }, {
          lat: 51.51627,
          lng: -0.07637
        }, {
          lat: 51.51627,
          lng: -0.07637
        }, {
          lat: 51.51450,
          lng: -0.07396
        }, {
          lat: 51.51498,
          lng: -0.07253
        }],
        trailsCompleted: []
      }]);
  })
  .then(trails => console.log(`${trails.length} trails created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
