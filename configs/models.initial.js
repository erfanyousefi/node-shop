const {Basket} = require("../modules/basket/basket.model");
const {Discount} = require("../modules/discount/discout.model");
const {Order, OrderItems} = require("../modules/order/order.model");
const {Payment} = require("../modules/payment/payment.model");
const {Product, ProductDetail, ProductSize, ProductColor} = require("../modules/product/product.model");
const {User, Otp} = require("../modules/user/user.model");
const sequelize = require("./sequelize.config");

async function initDatabase (options = {}) {
    User.hasOne(Otp, {as: "otp", foreignKey: "userId"});
    Otp.hasOne(User, {as: "user", foreignKey: "otpId", onDelete: "SET NULL"});
    User.hasMany(Order, {foreignKey: "userId", sourceKey: "id", as: "orders"});
    Order.hasMany(OrderItems, {foreignKey: 'orderId', as: 'items', sourceKey: "id"});
    OrderItems.belongsTo(Order, {foreignKey: 'orderId', as: 'order', targetKey: "id", onDelete: "CASCADE"});

    Order.hasOne(Payment, {foreignKey: "orderId", as: "payment", sourceKey: "id"});
    Payment.hasOne(Order, {foreignKey: "paymentId", as: "order", sourceKey: "id"});

    Product.hasMany(ProductDetail, {as: "details"});
    Product.hasMany(Discount, {as: "discounts", foreignKey: "productId", onDelete: "CASCADE"});
    Product.hasMany(ProductSize, {as: "sizes"});
    Product.hasMany(ProductColor, {as: "colors"});
    ProductDetail.belongsTo(Product, {foreignKey: "productId", as: "product", targetKey: "id"});
    ProductSize.belongsTo(Product, {foreignKey: "productId", targetKey: "id"});
    ProductColor.belongsTo(Product, {foreignKey: "productId", targetKey: "id"});


    Product.hasMany(Basket, {foreignKey: "productId", as: "baskets", onDelete: "CASCADE"});
    ProductColor.hasMany(Basket, {foreignKey: "colorId", as: "baskets", onDelete: "CASCADE"});
    ProductSize.hasMany(Basket, {foreignKey: "sizeId", as: "baskets", onDelete: "CASCADE"});
    Discount.hasMany(Basket, {foreignKey: "discountId", as: "baskets", onDelete: "CASCADE"});

    User.hasMany(Basket, {foreignKey: "userId", sourceKey: "id", as: "baskets", onDelete: "CASCADE"});
    Basket.belongsTo(Discount, {as: "discount", foreignKey: "discountId"});
    Basket.belongsTo(Product, {as: "product", foreignKey: "productId"});
    Basket.belongsTo(ProductColor, {as: "color", foreignKey: "colorId"});
    Basket.belongsTo(ProductSize, {as: "size", foreignKey: "sizeId"});
    Basket.belongsTo(User, {as: "user", foreignKey: "userId"});

    await sequelize.sync({force: true});
}
module.exports = initDatabase;