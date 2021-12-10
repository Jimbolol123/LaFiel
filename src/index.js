const LaClient = require('./Structures/LaClient');
const config = require('../config.json');

const client = new LaClient(config);
client.start();
