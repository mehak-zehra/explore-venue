const router = require('express').Router();
const e = require('express');
const { Op } = require('sequelize')
const Venue = require('../models/Venue');

const filterLocationsArr = [
  "Fremont",
  "Milpitas",
  "Newark",
  "Pleasanton",
  "Oakland",
  "Hayward",
  "Plesanton",
  "Berkeley",
  "Richmond",
  "Sacramento",
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
  res.render('homepage', { isLoggedIn });
});


router.get('/login', (req, res) => {
  let isLoggedIn = req.session.loggedIn;
  if (isLoggedIn) { // redirect to search if user is logged in
    res.redirect('/search');
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  let isLoggedIn = req.session.loggedIn;
  if (isLoggedIn) { // redirect to search if user is logged in
    res.redirect('/search');
  }
  res.render('signup');
});

router.get('/venue/:id/', (req, res) => {
  let isLoggedIn = req.session.loggedIn;
  if (!isLoggedIn) { // redirect to search if user is logged in
    res.redirect('/login');
  }

  Venue.findAll({
    where: {
      id: req.params.id
    },
  })
    .then((data) => {
      if (!data) {
        console.error("no venue found")
      } else {

        const venues = data.map(post => post.get({ plain: true }));
        const venue = venues[0];

        starsArr = [];
        for (var i = 0; i < venue.rating; i++) {
          starsArr.push("star");
        }

        const templateVariables = {
          venue: venues[0],
          isLoggedIn: isLoggedIn,
          stars: starsArr
        }
        res.render('single-venue', { templateVariables });
      }
    })
});

router.get('/search', (req, res) => {
  let isLoggedIn = req.session.loggedIn;
  if (!isLoggedIn) { // redirect to login if user is not logged in
    res.redirect('/login');
  }

  // read values from query parameter
  let myLocation = req.query.location
  let myCategory = req.query.category
  let myCapacity = req.query.capacity
  let searchQuery = req.query.search_query
  let date = req.query.date

  let where = {}
  if (myLocation) {
    where.location = {
      [Op.or]: myLocation.split(",")
    }
  }

  // if (myCategory) {
  //   whereClause.category = myCategory
  // }

  if (myCapacity) {
    where.capacity = {
      [Op.gte]: myCapacity
    }
  }
  if (searchQuery) {
    let q = "%" + searchQuery + "%"

    where.title = {
      [Op.like]: q
    }
  }

  if (date || searchQuery || myCapacity || myLocation) {
    Venue.findAll({
      where: where
    })
      .then((data) => {

        const venues = data.map(post => post.get({ plain: true }));
        let shouldShowResults = venues.length == 0
        const templateVariables = {
          venues: venues,
          filterByLocations: filterLocationsArr,
          filterByCategory: filterCategoryArr,
          filterByCapacity: filterCapacityArr,
          isLoggedIn: isLoggedIn,
          showResults: shouldShowResults
        }
        res.render('search', { templateVariables });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } else {
    const templateVariables = {
      venues: [],
      filterByLocations: filterLocationsArr,
      filterByCategory: filterCategoryArr,
      filterByCapacity: filterCapacityArr,
      isLoggedIn: isLoggedIn,
      showResults: false
    }
    res.render('search', { templateVariables });
  }

});

module.exports = router;