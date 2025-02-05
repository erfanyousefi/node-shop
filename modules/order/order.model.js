const {DataTypes} = require("sequelize");
const sequelize = require("../../configs/sequelize.config");
const {Product} = require("../product/product.model");
const {User} = require("../user/user.model");
const {Payment} = require("../payment/payment.model");

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.ENUM('pending', 'ordered', 'in-process', 'packed', 'in-transit', 'canceled', 'delivery'), defaultValue: 'pending'},
    address: {type: DataTypes.STRING},
    userId: {type: DataTypes.INTEGER},
    paymentId: {type: DataTypes.INTEGER, allowNull: true},
    total_amount: {type: DataTypes.DECIMAL},
    final_amount: {type: DataTypes.DECIMAL},
    discount_amount: {type: DataTypes.DECIMAL},
}, {createdAt: "created_at"});

const OrderItems = sequelize.define('order_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    orderId: {type: DataTypes.INTEGER},
    productId: {type: DataTypes.INTEGER},
    colorId: {type: DataTypes.INTEGER, allowNull: true},
    sizeId: {type: DataTypes.INTEGER, allowNull: true},
    count: {type: DataTypes.INTEGER}
});

OrderItems.hasMany(Order, {foreignKey: "productId"});
Order.belongsTo(OrderItems, {onDelete: "CASCADE"});

Order.hasMany(Product, {foreignKey: "productId"});
Product.belongsTo(Order, {onDelete: "CASCADE"});

Order.hasMany(User, {foreignKey: "userId", sourceKey: "id", onDelete: "CASCADE"});
Order.hasOne(Payment, {foreignKey: "paymentId", sourceKey: "id", onDelete: "CASCADE"});

module.exports = {
    Order,
    OrderItems
};