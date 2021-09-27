const Reservation = require('./Reservation');
const User = require('./User')

Reservation.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Reservation, {
    foreignKey: 'user_id'
});

