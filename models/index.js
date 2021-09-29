const Reservation = require('./Reservation');
const User = require('./User');
const Venue = require('./Venue');

Reservation.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Reservation, {
    foreignKey: 'user_id'
});

Reservation.belongsTo(Venue, {
    foreignKey: 'venue_id'
})

Venue.hasMany(Reservation);
