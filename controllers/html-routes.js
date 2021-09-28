const router = require('express').Router();
const Venue = require('../models/Venue');

const filterLocationsArr = [
  "San Franscisco",
  "Fremont",
  "San Jose",
  "Hayward",
  "Berkeley",
  "Emeryville",
  "Los Angeles"
];

const filterCategoryArr = [
  "Wedding",
  "Conference",
  "Party",
  "Private"
]

const filterCapacityArr = [
  20,
  50,
  100,
  200,
  500
]

router.get('/', (req, res) => {
  let isLoggedIn = req.session.loggedIn;
  res.render('homepage', {isLoggedIn});
});


router.get('/login', (req, res) => {
  // if (req.session.loggedIn) {
  //   console.log("logout");
  //   res.redirect('/');
  //   return;
  // }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/search', (req, res) => {
  let myLocation = req.query.location // read value from query parameter
  let filters = {};

  if (myLocation) {
    filters = {
      where: {
        location: myLocation
      }
    }
  }

  Venue.findAll(filters)
    .then((data) => {
      
      const venues = data.map(post => post.get({ plain: true }));
      const templateVariables = {
        venues: venues,
        filterByLocations: filterLocationsArr,
        filterByCategory: filterCategoryArr,
        filterByCapacity: filterCapacityArr
      }
      res.render('search', {templateVariables});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

});

module.exports = router;