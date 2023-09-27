const db = require('../config/connection');
const { Destination } = require('../models');
const destinationSeeds = require('./destinationSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Destination', 'destinations');
    
    await Destination.create(destinationSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
