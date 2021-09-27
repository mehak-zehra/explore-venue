const router = require('express').Router();
const Reservation = require('../models/Reservation');

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

  // check if user is logged in

  // check if date is already booked


  Reservation.create({
    venue_id: req.body.venue_id,
    user_id: req.body.user_id,
    date: req.body.date
  })
    .then(dbUserData => {
      // if everything is good, send to confirmation page
      res.json(dbUserData)
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


module.exports = router;