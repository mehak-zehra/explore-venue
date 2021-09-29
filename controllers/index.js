const router = require('express').Router();


const htmlRoutes = require('./html-routes')
const venueRoutes = require('./venue-api-routes')

const userRoute = require('./user-routes')
const reservationRoutes = require('./reservation-api-routes')

router.use('/', htmlRoutes);
router.use('/api/reservation', reservationRoutes)
router.use('/api/venue', venueRoutes)
router.use('/api/user',userRoute)

module.exports = router;