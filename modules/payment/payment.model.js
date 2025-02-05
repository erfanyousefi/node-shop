const {DataTypes} = require("sequelize");
const sequelize = require("../../configs/sequelize.config");
const Payment = sequelize.define("payment", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.BOOLEAN, defaultValue: false},
    amount: {type: DataTypes.DECIMAL},
    refId: {type: DataTypes.STRING, allowNull: true},
    authority: {type: DataTypes.STRING, allowNull: true},
    orderId: {type: DataTypes.INTEGER, allowNull: true, unique: true}
}, {createdAt: "created_at", updatedAt: false});
// Order.hasOne(Payment, {foreignKey: "paymentId", as: "payment", sourceKey: "id"});
// Payment.belongsTo(Order, {foreignKey: "orderId", as: "order", targetKey: "id"});
// Payment.sync();
module.exports = {
    Payment
};