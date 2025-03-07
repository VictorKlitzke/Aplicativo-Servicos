// src/sync.js
const sequelize = require('./config/database');
const user = require('./models/user');

sequelize.sync({ force: true }).then(() => {
  console.log('Banco de dados sincronizado');
});