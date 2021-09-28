
const seeds = require('./seed-venue');
const sequelize = require('../config/connection');

const createSeedingData = async () => {
  await sequelize.sync({ force: true });
  await seeds();
  process.exit(0);
};

createSeedingData();