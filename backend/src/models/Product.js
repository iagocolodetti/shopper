const { Model, DataTypes } = require('sequelize');

class Product extends Model {
    static init(sequelize) {
        super.init({
            code: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            cost_price: {
                type: DataTypes.DECIMAL(9,2),
                allowNull: false
            },
            sales_price: {
                type: DataTypes.DECIMAL(9,2),
                allowNull: false
            }
        }, {
            tableName: 'products',
            sequelize
        });
    }
}

module.exports = Product;
