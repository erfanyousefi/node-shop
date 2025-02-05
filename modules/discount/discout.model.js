const {DataTypes} = require("sequelize");
const sequelize = require("../../configs/sequelize.config");
const {Product} = require("../product/product.model");

const Discount = sequelize.define("discount", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    code: {type: DataTypes.STRING(50), unique: true},
    amount: {type: DataTypes.DECIMAL, allowNull: true},
    percent: {type: DataTypes.DECIMAL, allowNull: true},
    limit: {type: DataTypes.INTEGER, allowNull: true},
    usage: {type: DataTypes.INTEGER, defaultValue: 0},
    productId: {type: DataTypes.INTEGER, allowNull: true},
    type: {type: DataTypes.ENUM('basket', 'product')},
    expires_in: {type: DataTypes.DATE, allowNull: true},
});
Discount.hasMany(Product, {foreignKey: "productId"});
Product.belongsTo(Discount, {onDelete: "CASCADE"});
module.exports = {
    Discount
};