const mongoose = require('mongoose');

const db ={};
db.mongoose = mongoose;
db.url = 'mongodb://localhost:27017/todo';
db.models = require('./model.js');

modelu.exports = db;