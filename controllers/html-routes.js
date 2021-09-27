const router = require('express').Router();
const Venue = require('../models/Venue');

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/login', (req, res) => {
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

  console.log(myLocation)
  Venue.findAll(filters)
    .then((data) => {
      
      const venues = data.map(post => post.get({ plain: true }));
      res.render('search', {venues});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

});
module.exports = router;