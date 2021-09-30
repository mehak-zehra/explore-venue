const Sequelize = require('sequelize');


// if (process.env.JAWSDB_URL) {
//   sequelize = new Sequelize(process.env.JAWSDB_URL);
// } else {
const sequelize = new Sequelize('explorevenue_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});
//}

module.exports = sequelize;