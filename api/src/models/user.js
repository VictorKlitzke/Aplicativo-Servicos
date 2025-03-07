// src/models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const service = require('./service');

const User = sequelize.define('usuarios', {
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
  criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'usuarios',
  createdAt: false,
  updatedAt: false
});

User.hasMany(service, { foreignKey: 'profissional_id' });
service.belongsTo(Usuario, { foreignKey: 'profissional_id' });

User.findByUsername = async function(nome) {
    return await this.findOne({ where: { nome } });
  };
  
module.exports = User;