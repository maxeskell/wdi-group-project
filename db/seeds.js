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
},{
  username: 'olly',
  email: 'olly@sam.com',
  password: 'Password2',
  passwordConfirmation: 'Password2',
  image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/American_Beaver.jpg',
  postcode: 'B47 5PP'
},{
  username: 'jack',
  email: 'jack@sam.com',
  password: 'Password3',
  passwordConfirmation: 'Password3',
  image: 'https://s-media-cache-ak0.pinimg.com/736x/d5/b1/41/d5b141034ccb0693ce8f3b8331817559.jpgg',
  postcode: 'PO6 2PS'}])
.then((users) => {
  console.log(`${users.length} users created`);
  return Trail
  .create([{
    trailName: 'Terrific Trent Park ',
    description: 'A delightful walk sampling the nature reserves of the Tame Valley near Tamworth, with lots of opportunities for entertainment and refreshment, as well as bird watching. The walk is flat and on made-up paths for the most part',
    difficulty: 1,
    image: 'http://sites.psu.edu/siowfa14/wp-content/uploads/sites/13467/2014/10/Men-and-Women-walking_cropped.jpg',
    createdBy: users[2],
    length: 5.5,
    time: '01:45',
    route: [{
      lat: 51.654500,
      lng: -0.151448
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
      lat: 51.797409,
      lng: -0.008360
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
    trailName: 'Walkkkk This Way, Walk This Way',
    description: `Ah, just give me a kissssss (Disclaimer: Aerosmith do not feautre on this walk ).`,
    difficulty: 3,
    image: 'https://mw2.google.com/mw-panoramio/photos/medium/88809736.jpg',
    createdBy: users[1],
    length: 5.5,
    time: '01:45',
    route: [{
      lat: 52.314144,
      lng: 1.596005
    }, {
      lat: 52.297351945482795,
      lng: 1.5911293029785156
    }, {
      lat: 52.29126257954172,
      lng: 1.6016006469726562
    }, {
      lat: 52.28727254102434,
      lng: 1.6060638427734375
    }, {
      lat: 52.28086672769925,
      lng: 1.613616943359375
    }],
    trailsCompleted: []
  }, {
    trailName: 'Fillongley',
    description: 'An enjoyable short walk around the parish of Fillongley in the north Warwickshire Countryside. This walk is a waymarked circular route designed as part of the North Arden Z-Heritage trail. Perfect for hunting zombies',
    difficulty: 4,
    image: 'https://www.thesnipenews.com/wp-content/gallery/zombie-walk-2016/zombie-walk-2016-01.jpg',
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
    description: 'a beautiful coastal mountain stroll that is home to many rare and interesting species. You are welcome to use the trails to explore this uncommon forest where northern and southern species meet. Keep in mind that the trails here are rugged, rocky and steep. None of them can be described as easy',
    difficulty: 4,
    image: 'http://s0.geograph.org.uk/photos/51/67/516718_e43f1c32.jpg',
    createdBy: users[2],
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
    trailName: 'Bright and Breezy',
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
  }, {
    trailName: 'Windermere Wanderlust',
    description: ' A lovely walk from end to end of Windermere. Those that are aquatically inclined, can choose to swim the return journey',
    difficulty: 3,
    image: 'https://www.windermere-lakecruises.co.uk/images/uploads/news/_w658/walking-along-windermere-shore.jpg',
    createdBy: users[2],
    length: 18,
    time: '06:50',
    route: [{
      lat: 54.268632644428564,
      lng: -2.9700851440429688
    }, {
      lat: 54.26963511014917,
      lng: -2.962188720703125
    }, {
      lat: 54.273193666553155,
      lng: -2.958498001098633
    }, {
      lat: 54.272441884461465,
      lng: -2.955150604248047
    }, {
      lat: 54.276300887046631,
      lng: -2.9520606994628906
    }, {
      lat: 54.28687370468961,
      lng: -2.950429916381836
    }, {
      lat: 54.292384524228126,
      lng: -2.947683334350586
    }, {
      lat: 54.297543986812705,
      lng: -2.9493141174316406
    }, {
      lat: 54.30645881579614,
      lng: -2.9494857788085938
    }, {
      lat: 54.31567211555977,
      lng: -2.9465675354003906
    }, {
      lat: 54.324733186162106,
      lng: -2.939271926879883
    }, {
      lat: 54.337295235811,
      lng: -2.9346370697021484
    }, {
      lat: 54.34199876084352,
      lng: -2.933778762817383
    }, {
      lat: 54.351104056359084,
      lng: -2.9275131225585938
    }, {
      lat: 54.35250469202049,
      lng: -2.9244232177734375
    }, {
      lat: 54.35540585688189,
      lng: -2.924680709838867
    }, {
      lat: 54.36735849588775,
      lng: -2.923736572265625
    }, {
      lat: 54.3738584710411,
      lng: -2.920389175415039
    }, {
      lat: 54.384806102763186,
      lng: -2.9228782653808594
    }, {
      lat: 54.387704986567456,
      lng: -2.931804656982422
    }, {
      lat: 54.39305239007667,
      lng: -2.9377269744873047
    }, {
      lat: 54.40689243146026,
      lng: -2.9469966888427734
    }, {
      lat: 54.42032829154646,
      lng: -2.9621028900146484
    }],
    trailsCompleted: []
  }, {
    trailName: 'Baskerville Hound Hunt',
    description: 'Go looking for the most famous dog in Devonshire, if you are lucky, you might even find a few landmines. Beautiful views to the south, including Dartmoor Mountain and the narrow sea. Scrub oak and blueberry hold on to this warm, exposed slope of thin soil. Children are allowed on this route if on a leash',
    difficulty: 4,
    createdBy: users[1],
    image: 'https://pbs.twimg.com/media/CYsYYxIUMAAEi8O.jpg',
    length: 5.5,
    time: '01:45',
    route: [
      {
        lat: 50.71993856703988,
        lng: -4.001984596252441
      },
      {
        lat: 50.71700409359043,
        lng: -4.0021562576293945
      },
      {
        lat: 50.714966156700484,
        lng: -4.001984596252441
      },
      {
        lat: 50.7116237483718,
        lng: -4.0035295486450195
      },
      {
        lat: 50.70909640335661,
        lng: -4.002928733825684
      }],
    trailsCompleted: []
  }, {
    trailName: 'The Whalebone',
    description: 'Starting at the Whalebone pub, this is a great walk for families. The path takes you from one across the River Colne and back again to form a weird looking whalebone.',
    difficulty: 2,
    createdBy: users[0],
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Brighton_Pier_at_dusk.jpg',
    length: 5.5,
    time: '01:45',
    route: [
      {
        lat: 51.84495186375951,
        lng: 0.9450817108154297
      },
      {
        lat: 51.846383529034924,
        lng: 0.9540081024169922
      },
      {
        lat: 51.84976366914612,
        lng: 0.9566259384155273
      },
      {
        lat: 51.85320982516066,
        lng: 0.9587931632995605
      },
      {
        lat: 51.854270127768096,
        lng: 0.9620118141174316
      },
      {
        lat: 51.85416409863161,
        lng: 0.9591794013977051
      },
      {
        lat: 51.85297125363101,
        lng: 0.9581923484802246
      },
      {
        lat: 51.85120843590817,
        lng: 0.9595012664794922
      },
      {
        lat: 51.84627748131679,
        lng: 0.9548664093017578
      },
      {
        lat: 51.84473976132756,
        lng: 0.9456825256347656
      }],
    trailsCompleted: []
  }, {
    trailName: 'You Can\'t Spell Slaughter Without Laughter',
    description: 'If you are sick to death of home, have a stab at this killer walk, which will surely lift your spirits. Suitable for all the family',
    difficulty: 1,
    createdBy: users[1],
    image: 'http://img11.deviantart.net/2768/i/2011/190/c/a/river_of_blood_by_x_xeroprodigy_x-d3lj63c.jpg',
    length: 5.5,
    time: '01:45',
    route: [
      {
        lat: 51.901117170335866,
        lng: -1.758413314819336
      },
      {
        lat: 51.901170129601645,
        lng: -1.7624151706695557
      },
      {
        lat: 51.90219620305303,
        lng: -1.7658483982086182
      },
      {
        lat: 51.90400335930322,
        lng: -1.7699360847473145
      },
      {
        lat: 51.90511541932153,
        lng: -1.7755687236785889
      },
      {
        lat: 51.90655178943083,
        lng: -1.7768669128417969
      }],
    trailsCompleted: []
  }]);
})
.then(trails => console.log(`${trails.length} trails created!`))
.catch(err => console.log(err))
.finally(() => mongoose.connection.close());
