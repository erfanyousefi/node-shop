const {DataTypes} = require("sequelize");
const sequelize = require("../../configs/sequelize.config");

const Product = sequelize.define("product", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    slug: {type: DataTypes.STRING},
    price: {type: DataTypes.DECIMAL, allowNull: true},
    discount: {type: DataTypes.DECIMAL, allowNull: true},
    active_discount: {type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false},
    type: {type: DataTypes.ENUM("single", "coloring", "sizing")},
    count: {type: DataTypes.INTEGER, defaultValue: 0},
    content: {type: DataTypes.TEXT, allowNull: true}
}, {createdAt: "created_at"});

const ProductDetail = sequelize.define("product_detail", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    productId: {type: DataTypes.INTEGER},
    key: {type: DataTypes.STRING},
    value: {type: DataTypes.STRING},
});
const ProductSize = sequelize.define("product_size", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    productId: {type: DataTypes.INTEGER},
    count: {type: DataTypes.INTEGER},
    size: {type: DataTypes.STRING},
    price: {type: DataTypes.DECIMAL},
    discount: {type: DataTypes.DECIMAL},
    active_discount: {type: DataTypes.BOOLEAN},
});
const ProductColor = sequelize.define("product_color", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    productId: {type: DataTypes.INTEGER},
    count: {type: DataTypes.INTEGER},
    color_name: {type: DataTypes.STRING},
    color_code: {type: DataTypes.STRING},
    price: {type: DataTypes.DECIMAL},
    discount: {type: DataTypes.DECIMAL},
    active_discount: {type: DataTypes.BOOLEAN},
});

Product.hasMany(ProductDetail, {foreignKey: "productId", sourceKey: "id", as: "details", onDelete: "CASCADE"});
ProductDetail.belongsTo(Product, {foreignKey: "productId", targetKey: "id"});

Product.hasMany(ProductSize, {foreignKey: "productId", sourceKey: "id", as: "sizes", onDelete: "CASCADE"});
ProductSize.belongsTo(Product, {foreignKey: "productId", targetKey: "id"});

Product.hasMany(ProductColor, {foreignKey: "productId", sourceKey: "id", as: "colors", onDelete: "CASCADE"});
ProductColor.belongsTo(Product, {foreignKey: "productId", targetKey: "id"});

module.exports = {
    Product,
    ProductColor,
    ProductDetail,
    ProductSize
};