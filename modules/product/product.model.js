const {DataTypes} = require("sequelize");
const sequelize = require("../../configs/sequelize.config");

const Product = sequelize.define("product", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    price: {type: DataTypes.DECIMAL, allowNull: true},
    discount: {type: DataTypes.DECIMAL, allowNull: true},
    active_discount: {type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false},
    type: {type: DataTypes.ENUM("single", "coloring", "sizing")},
    count: {type: DataTypes.INTEGER, defaultValue: 0},
    content: {type: DataTypes.TEXT, allowNull: true}
}, {createdAt: "created_at", updatedAt: false});
const ProductDetail = sequelize.define("product_detail", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    productId: {type: DataTypes.INTEGER},
    key: {type: DataTypes.STRING},
    value: {type: DataTypes.STRING},
}, {timestamps: false});
const ProductSize = sequelize.define("product_size", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    productId: {type: DataTypes.INTEGER},
    count: {type: DataTypes.INTEGER},
    size: {type: DataTypes.STRING},
    price: {type: DataTypes.DECIMAL},
    discount: {type: DataTypes.DECIMAL},
    active_discount: {type: DataTypes.BOOLEAN},
}, {timestamps: false});
const ProductColor = sequelize.define("product_color", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    productId: {type: DataTypes.INTEGER},
    count: {type: DataTypes.INTEGER},
    color_name: {type: DataTypes.STRING},
    color_code: {type: DataTypes.STRING},
    price: {type: DataTypes.DECIMAL},
    discount: {type: DataTypes.DECIMAL},
    active_discount: {type: DataTypes.BOOLEAN},
}, {timestamps: false});

module.exports = {
    Product,
    ProductColor,
    ProductDetail,
    ProductSize
};