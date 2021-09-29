const router = require('express').Router();
const e = require('express');
const { Op } = require('sequelize')
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
  console.log("here")
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

  /**
   * 
   * SELECT v* 
   * FROM venues v 
   * WHERE
   *    LOCATION IN (...) AND
   *    CAPACITY > (...) AND
   *    QUERY LIKE %(...)% AND
   *    COUNT(SELECT COUNT FROM RESERVATIONS WHERE VENUE_ID = .. AND DATE = .. AND USER_ID != .. ) < 1 
   *    
   * 
   */
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
    // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    Venue.findAll({
      where: where
    })
      .then((data) => {

        const venues = data.map(post => post.get({ plain: true }));
        const templateVariables = {
          venues: venues,
          filterByLocations: filterLocationsArr,
          filterByCategory: filterCategoryArr,
          filterByCapacity: filterCapacityArr,
          isLoggedIn: isLoggedIn,
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
    }
    res.render('search', { templateVariables });
  }


});

module.exports = router;