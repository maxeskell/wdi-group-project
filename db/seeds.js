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
        image: 'https://www.rspb.org.uk/Images/barnowl_tcm9-18232.jpg?width=530&crop=(34,244,962,766)',
        createdBy: users[0],
        trail: [{
          lat: 51.515152,
          lng: 0.072019
        }, {
          lat: 51.516273,
          lng: -0.076375
        }, {
          lat: 51.516273,
          lng: -0.076375
        }, {
          lat: 51.514504,
          lng: -0.073961
        }, {
          lat: 51.514985,
          lng: -0.072534
        }]
      }, {
        trailName: 'route 2',
        description: 'route 2 description',
        difficulty: 2,
        image: 'https://www.rspb.org.uk/Images/blue_tit_master_tcm9-17216.jpg?width=530&crop=(0,162,800,612)',
        createdBy: users[0],
        trail: [{
          lat: 51.5,
          lng: 0.07
        }, {
          lat: 51.5,
          lng: -0.07
        }, {
          lat: 51.5,
          lng: -0.07
        }, {
          lat: 51.514504,
          lng: -0.07
        }, {
          lat: 51.5,
          lng: -0.07
        }]
      }, {
        trailName: 'route 3',
        description: 'route 3 description',
        difficulty: 3,
        image: 'https://www.rspb.org.uk/Images/chaff_tcm9-17518.jpg?width=530&crop=(176,374,1128,910)',
        createdBy: users[0],
        trail: [{
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
        }]
      }, {
        trailName: 'route 4',
        description: 'route 4 description',
        difficulty: 4,
        image: 'https://www.rspb.org.uk/Images/robin_master_tcm9-17658.jpg?width=530&crop=(444,478,1248,930)',
        createdBy: users[0],
        trail: [{
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
        }]
      }, {
        trailName: 'route 5',
        description: 'route 5 description',
        difficulty: 5,
        image: 'https://www.rspb.org.uk/Images/swallow_tcm9-18469.jpg?width=530&crop=(44,262,948,770)',
        createdBy: users[0],
        trail: [{
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
        }]
      }]);
  })
  .then(trails => console.log(`${trails.length} trails created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
