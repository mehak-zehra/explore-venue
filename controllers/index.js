const router = require('express').Router();

const apiRoutes = require('./booking-api-routes')
const homeRoutes = require('./home-routes')
const venueRoutes = require('./venue-api-routes')
const locationRoute = require('./location-api-route');
const userRoute = require('./user-routes')

router.use('/', homeRoutes);
router.use('/api/booking', apiRoutes)
router.use('/api/venue', venueRoutes)
router.use('/api/location', locationRoute)
router.use('/api/user',userRoute)

module.exports = router;