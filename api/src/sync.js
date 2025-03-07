// src/sync.js
const sequelize = require('./config/database');
const user = require('./models/user');
const service = require('./models/service');

sequelize.sync({ force: true }).then(() => {
  console.log('Banco de dados sincronizado');
});