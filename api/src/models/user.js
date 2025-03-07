// src/models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('cliente', 'profissional'),
    allowNull: false,
  },
}, {
  tableName: 'usuarios',
});

User.findByUsername = async function(username) {
    return await this.findOne({ where: { username } });
  };
  
module.exports = User;