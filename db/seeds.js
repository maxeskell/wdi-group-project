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
  email: 'max@sam.com',
  password: 'Password1',
  passwordConfirmation: 'Password1',
  image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Fischotter%2C_Lutra_Lutra.JPG',
  postcode: 'B46 1QR'
}])
.then((users) => {
  console.log(`${users.length} users created`);
  return Trail
  .create([{
    trailName: 'Terrific Trent Park ',
    description: 'A delightful walk sampling the nature reserves of the Tame Valley near Tamworth, with lots of opportunities for entertainment and refreshment, as well as bird watching. The walk is flat and on made-up paths for the most part',
    difficulty: 1,
    image: 'http://sites.psu.edu/siowfa14/wp-content/uploads/sites/13467/2014/10/Men-and-Women-walking_cropped.jpg',
    createdBy: users[0],
    length: 5.5,
    time: '01:45',
    route: [{
      lat: 51.65666370811198,
      lng: -0.14754295349121094
    }, {
      lat: 51.6566637081119,
      lng: -0.147542953491210941
    }, {
      lat: 51.66260035891564,
      lng: -0.13522624969482422
    }, {
      lat: 51.66579464735234,
      lng: -0.132994651794433
    }, {
      lat: 51.66619391757231,
      lng: -0.12784481048583984
    },{
      lat: 51.66198809457981,
      lng: -0.12308120727539062
    }],
    trailsCompleted: []
  }, {
    trailName: 'Kingsbury Water Park',
    description: `This walk is fine, so long as you don't mind people! Kingsbury Water Park was heaving on a warm August Sunday afternoon, as you might expect. NB - point 1: when you briefly emerge from the trees, ignore a right fork and follow the path back into the trees; point 2: the turning into the water park is an inconspicuous footpath to the right of a very conspicuous metal barrier/gate.`,
    difficulty: 2,
    image: 'http://img.mp.itc.cn/upload/20170314/9052b6c3e8264d8caafa5e89568f76eb_th.jpeg',
    createdBy: users[0],
    length: 5.5,
    time: '01:45',
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
    description: `Walk 23 of a series of routes along Warwickshire's Centenary Way. Starting from the scenic Shustoke reservoirs and climbing gradually to some remote high ground with some remarkable extensive views over the West Midlands.`,
    difficulty: 3,
    image: 'http://evidencebasedliving.human.cornell.edu/files/2015/01/Walking_for_Health_in_Epsom-5Aug2009_2-286n9rz.jpg',
    createdBy: users[0],
    length: 5.5,
    time: '01:45',
    route: [{
      lat: 52.314144,
      lng: -1.596005
    }, {
      lat: 52.314144,
      lng: -1.596005
    }, {
      lat: 52.314144,
      lng: -1.596005
    }, {
      lat: 52.314144,
      lng: -1.596005
    }, {
      lat: 52.314144,
      lng: -1.596005
    }],
    trailsCompleted: []
  }, {
    trailName: 'Fillongley',
    description: 'An enjoyable short walk around the parish of Fillongley in the north Warwickshire Countryside. This walk is a waymarked circular route designed as part of the North Arden Heritage trail.',
    difficulty: 4,
    image: 'https://images.amcnetworks.com/amc.com/wp-content/uploads/2017/04/the-walking-dead-episode-716-daryl-reedus-800x600-sync-post.jpg',
    createdBy: users[0],
    length: 5.5,
    time: '01:45',
    route: [{
      lat: 52.488400,
      lng: -1.609302
    }, {
      lat: 52.487897,
      lng: -1.609056
    }, {
      lat: 52.486494,
      lng: -1.608205
    }, {
      lat: 52.486494,
      lng: -1.608205
    }, {
      lat: 52.486494,
      lng: -1.608205
    },{
      lat: 52.486494,
      lng: -1.608205
    }],
    trailsCompleted: []
  }, {
    trailName: 'Widley Walk',
    description: 'Lovely walk for the dead.  Those that are alive - beware....',
    difficulty: 4,
    image: 'https://www.thesnipenews.com/wp-content/gallery/zombie-walk-2016/zombie-walk-2016-01.jpg',
    createdBy: users[0],
    length: 5.5,
    time: '01:45',
    route: [{
      lat: 50.85382073398289,
      lng: -1.062326431274414
    }, {
      lat: 50.85421357362475,
      lng: -1.065351963043213
    }, {
      lat: 50.85745098811842,
      lng: -1.0650300979614258
    }, {
      lat: 50.862754477785714,
      lng: -1.0633563995361328
    }, {
      lat: 50.86773827705441,
      lng: -1.0581207275390625
    }, {
      lat: 50.865408958926885,
      lng: -1.0476493835449219
    }, {
      lat: 50.860695796523196,
      lng: -1.0532283782958984
    }, {
      lat: 50.85397736225398,
      lng: -1.0584640502929688
    }],
    trailsCompleted: []
  }, {
    trailName: 'A new Route',
    description: 'This is a lovely route, really easy for all ages and abilities',
    difficulty: 1,
    createdBy: users[0],
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Brighton_Pier_at_dusk.jpg',
    length: 5.5,
    time: '01:45',
    route: [
      {
        lng: -0.15852928161621094,
        lat: 50.86833413043892
      },
      {
        lng: -0.17586708068847656,
        lat: 50.85988313416105
      },
      {
        lng: -0.18367767333984375,
        lat: 50.86643820686959
      },
      {
        lng: -0.18616676330566406,
        lat: 50.875104656608
      },
      {
        lng: -0.1803302764892578,
        lat: 50.88149513092262
      },
      {
        lng: -0.16951560974121094,
        lat: 50.8885344694175
      },
      {
        lng: -0.1652240753173828,
        lat: 50.87759596268787
      },
      {
        lng: -0.1597309112548828,
        lat: 50.871421612355185
      }
    ],
    trailsCompleted: []
  }]);
})
.then(trails => console.log(`${trails.length} trails created!`))
.catch(err => console.log(err))
.finally(() => mongoose.connection.close());
