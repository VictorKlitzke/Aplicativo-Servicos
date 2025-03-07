
const { Model } = require('sequelize');
const service = require('../models/service');
const User = require('../models/user');

class GetController {
    async getServices(req, res) {
        try {
            // Busca todos os serviços, incluindo as informações do usuário associado
            const services = await Service.findAll({
                include: [{
                    model: User,
                    as: 'usuarios', 
                    attributes: ['nome']
                }]
            });

            // Retorna os serviços encontrados
            res.status(200).json(services);
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
            res.status(500).json({ error: 'Erro ao buscar serviços', details: error.message });
        }
    }
}


module.exports = getController;