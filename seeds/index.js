
const seeds = require('./seed-venue');
const sequelize = require('../config/connection');

const createSeedingData = async () => {
  console.log("running seeds....")
  await sequelize.sync({ force: true });
  await seeds();
  console.log("completed.....")
  // process.exit(0);
};

createSeedingData();