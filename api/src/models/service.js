const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const service = sequelize.define('service', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    preco: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    profissional_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id'
        },
        allowNull: false
    }
})

service.belongsTo(User, { foreignKey: 'profissional_id' });

module.exports = service;