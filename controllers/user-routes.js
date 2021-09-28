const router = require('express').Router();
const User = require('../models/User');
// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    User.findAll(
      //{ attributes: { exclude: ['password'] } },
    )
    //new addition---------
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.email = dbUserData.email;
        req.session.loggedIn = true;
    
        res.json(dbUserData);
      });
    })
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
//-----------------------//new addition-----------------------------------
      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.email = dbUserData.email; // question about email? or it should be username? we dont have user name
        req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    });
  });
//------//logout route------
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }

  });

// POST /api/users
router.post('/signup', (req, res) => {
  console.log("hello")
  
  User.create({
    firstname: req.body.firstname,// added names
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