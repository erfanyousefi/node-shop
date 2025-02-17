const {DataTypes} = require("sequelize");
const sequelize = require("../../configs/sequelize.config");
const Discount = sequelize.define("discount", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    code: {type: DataTypes.STRING(50)},
    amount: {type: DataTypes.DECIMAL, allowNull: true},
    percent: {type: DataTypes.DECIMAL, allowNull: true},
    limit: {type: DataTypes.INTEGER, allowNull: true},
    usage: {type: DataTypes.INTEGER, defaultValue: 0},
    productId: {type: DataTypes.INTEGER, allowNull: true},
    type: {type: DataTypes.ENUM('basket', 'product')},
    expires_in: {type: DataTypes.DATE, allowNull: true},
}, {timestamps: true});

module.exports = {
    Discount
};