const {DataTypes} = require("sequelize");
const sequelize = require("../../configs/sequelize.config");
const {User} = require("../user/user.model");
const {Product, ProductColor, ProductSize} = require("../product/product.model");
const {Discount} = require("../discount/discout.model");

const Basket = sequelize.define("basket", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER},
    productId: {type: DataTypes.INTEGER, allowNull: true},
    sizeId: {type: DataTypes.INTEGER, allowNull: true},
    colorId: {type: DataTypes.INTEGER, allowNull: true},
    discountId: {type: DataTypes.INTEGER, allowNull: true},
    count: {type: DataTypes.INTEGER},
});

Basket.hasMany(User, {foreignKey: "userId"});
User.belongsTo(Basket, {onDelete: "CASCADE"});

Basket.hasMany(Product, {foreignKey: "productId"});
Product.belongsTo(Basket, {onDelete: "CASCADE"});

Basket.hasMany(ProductColor, {foreignKey: "colorId"});
ProductColor.belongsTo(Basket, {onDelete: "CASCADE"});

Basket.hasMany(ProductSize, {foreignKey: "sizeId"});
ProductSize.belongsTo(Basket, {onDelete: "CASCADE"});

Basket.hasMany(Discount, {foreignKey: "discountId"});
Discount.belongsTo(Basket, {onDelete: "CASCADE"});

module.exports = {
    Basket
};