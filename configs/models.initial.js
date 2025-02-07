const {Basket} = require("../modules/basket/basket.model");
const {Discount} = require("../modules/discount/discout.model");
const {Order, OrderItems} = require("../modules/order/order.model");
const {Payment} = require("../modules/payment/payment.model");
const {Product, ProductDetail, ProductSize, ProductColor} = require("../modules/product/product.model");
const {User, Otp} = require("../modules/user/user.model");
const sequelize = require("./sequelize.config");

async function initDatabase () {
    User.hasOne(Otp, {foreignKey: "userId", as: "otp"});
    Otp.belongsTo(User, {foreignKey: "userId"});
    Otp.hasOne(User, {foreignKey: "otpId", onDelete: "SET NULL"});
    User.hasMany(Order, {foreignKey: "userId", sourceKey: "id"});
    Order.hasMany(OrderItems, {foreignKey: 'orderId', sourceKey: "id"});
    OrderItems.belongsTo(Order, {foreignKey: 'orderId', targetKey: "id", onDelete: "CASCADE"});

    Order.hasOne(Payment, {foreignKey: "orderId"});
    Payment.hasOne(Order, {foreignKey: "paymentId"});

    Product.hasMany(ProductDetail, {foreignKey: "productId", sourceKey: "id", as: "details"});
    Product.hasMany(Discount, {foreignKey: "productId", sourceKey: "id", as: "discounts"});
    Product.hasMany(ProductSize, {foreignKey: "productId", sourceKey: "id", as: "sizes"});
    Product.hasMany(ProductColor, {foreignKey: "productId", sourceKey: "id", as: "colors"});
    ProductDetail.belongsTo(Product, {foreignKey: "productId", targetKey: "id"});
    ProductSize.belongsTo(Product, {foreignKey: "productId", targetKey: "id"});
    ProductColor.belongsTo(Product, {foreignKey: "productId", targetKey: "id"});


    Product.hasMany(Basket, {foreignKey: "productId", sourceKey: "id", as: "baskets"});
    ProductColor.hasMany(Basket, {foreignKey: "colorId", sourceKey: "id", as: "baskets"});
    ProductSize.hasMany(Basket, {foreignKey: "sizeId", sourceKey: "id", as: "baskets"});
    Discount.hasMany(Basket, {foreignKey: "discountId", sourceKey: "id", as: "baskets"});
    User.hasMany(Basket, {foreignKey: "userId", sourceKey: "id", as: "baskets"});

    Basket.belongsTo(Discount, {foreignKey: "discountId", targetKey: "id", as: "discount"});
    Basket.belongsTo(Product, {foreignKey: "productId", targetKey: "id", as: "product"});
    Basket.belongsTo(ProductColor, {foreignKey: "colorId", targetKey: "id", as: "color"});
    Basket.belongsTo(ProductSize, {foreignKey: "sizeId", targetKey: "id", as: "size"});
    Basket.belongsTo(User, {foreignKey: "userId", targetKey: "id", as: "user"});

    // await sequelize.sync({});
}
module.exports = initDatabase;