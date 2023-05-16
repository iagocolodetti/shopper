const { Model, DataTypes } = require('sequelize');

class Pack extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            pack_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            product_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            qty: {
                type: DataTypes.BIGINT,
                allowNull: false
            }
        }, {
            tableName: 'packs',
            sequelize
        });
    }
}

module.exports = Pack;
