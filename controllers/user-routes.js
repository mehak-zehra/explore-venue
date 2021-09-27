const router = require('express').Router();
const User = require('../models/User');
// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    User.findAll(
      //{ attributes: { exclude: ['password'] } },
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // GET /api/users/1
  router.post('/login', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    console.log("Heee!")
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
      }
  
      const validPassword = dbUserData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
      }
  
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });

// POST /api/users
router.post('/signup', (req, res) => {
  
  User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;