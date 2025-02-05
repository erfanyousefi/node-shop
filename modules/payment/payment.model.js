const {DataTypes} = require("sequelize");
const sequelize = require("../../configs/sequelize.config");
const {Order} = require("../order/order.model");

const Payment = sequelize.define("payment", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.BOOLEAN, defaultValue: false},
    amount: {type: DataTypes.DECIMAL},
    refId: {type: DataTypes.STRING, allowNull: true},
    authority: {type: DataTypes.STRING, allowNull: true},
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
        references: {
            model: Order,
            key: "id"
        }
    }
}, {createdAt: "created_at"});
Payment.belongsTo(Order, {
    foreignKey: "orderId",         // Foreign key in the Payment table
    targetKey: "id",               // Primary key in the Order table
    as: "order",                   // Alias for querying
    onDelete: "SET NULL"           // Set orderId to NULL if the Order is deleted
});

module.exports = {
    Payment
};