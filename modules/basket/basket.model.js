const {DataTypes} = require("sequelize");
const sequelize = require("../../configs/sequelize.config");
const Basket = sequelize.define("basket", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER},
    productId: {type: DataTypes.INTEGER, allowNull: true},
    sizeId: {type: DataTypes.INTEGER, allowNull: true},
    colorId: {type: DataTypes.INTEGER, allowNull: true},
    discountId: {type: DataTypes.INTEGER, allowNull: true},
    count: {type: DataTypes.INTEGER},
}, {timestamps: false});
module.exports = {
    Basket
};