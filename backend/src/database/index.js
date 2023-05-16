const { Sequelize } = require('sequelize');
const dbConfig = require('../configs/database');
const Product = require('../models/Product');
const Pack = require('../models/Pack');

let sequelize;
module.exports = {
    connect() {
        sequelize = new Sequelize(dbConfig());
        sequelize.authenticate().then(() => {
            Product.init(sequelize);
            Pack.init(sequelize);
            console.log(`Conexão com '${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}' estabelecida`);
        }).catch(() => {
            console.log(`Não foi possível estabelecer a conexão com '${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}'`);
        });
    },

    async getTransaction() {
        return await sequelize.transaction();
    }
};
