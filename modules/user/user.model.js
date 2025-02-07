const {DataTypes} = require("sequelize");
const sequelize = require("../../configs/sequelize.config");

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    fullname: {type: DataTypes.STRING, allowNull: true},
    mobile: {type: DataTypes.STRING(15), allowNull: false},
    wallet_balance: {type: DataTypes.DECIMAL(10, 2), defaultValue: 0},
    otpId: {type: DataTypes.INTEGER, allowNull: true}
}, {timestamps: true, createdAt: "created_at", updatedAt: false});

const Otp = sequelize.define("user_otp", {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    code: {type: DataTypes.STRING(5), allowNull: false},
    expires_in: {type: DataTypes.DATE, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false}
}, {timestamps: false});
module.exports = {
    User,
    Otp
};