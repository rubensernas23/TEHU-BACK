require('dotenv').config();


const Tehu = require('./models/ServerTehu')


const server = new Tehu();

server.start();
