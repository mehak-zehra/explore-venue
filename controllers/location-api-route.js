const router = require('express').Router();
const Venue = require('../models/Venue');
const User = require('../models/User');

router.get('/', (req, res) => {
  Venue.findAll()
    .then((data) => {
      let result = [];
      for(var i = 0; i < data.length; i++){
        result.push(data[i].location)
      }
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;


