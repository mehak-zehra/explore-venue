const router = require('express').Router();
const Reservation = require('../models/Reservation');
const uniqid = require('uniqid');

router.get('/', (req, res) => {
  Reservation.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a reservation
router.post('/', (req, res) => {
  let confirmation_id = uniqid()
  Reservation.create({
    venue_id: req.body.venue_id,
    user_id: req.session.user_id,
    date: req.body.event_date,
    confirmation_id: confirmation_id
  })
    .then(dbUserData => {

      res.render("confirmation", {
        confirmation_id: confirmation_id,
        isLoggedIn: req.session.loggedIn,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get all reservations by user ID
router.get('/users/:id', (req, res) => {
  Reservation.findAll({
    where: {
      user_id: req.params.id
    }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/available', (req, res) => {
  Reservation.findAll({
    where: {
      venue_id: req.body.venue_id,
      date: new Date(req.body.event_date)
    }
  })
    .then(data => {
      if (data) {
        if (data.length > 0) {
          res.status(200).json({
            "available" : false,
            "user_id" : data[0].user_id
          })
        }
        res.status(204).json({
          "available" : true
        })
      }
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;