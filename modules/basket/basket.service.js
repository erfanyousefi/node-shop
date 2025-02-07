const {Product, ProductSize, ProductColor} = require("../product/product.model");
const {Basket} = require("./basket.model");

async function addSizeToBasket (productId, userId, sizeId) {
    try {
        const product = await Product.findOne({
            where: {id: productId}, include: [
                {model: ProductSize, as: 'sizes'},
                {model: ProductColor, as: 'colors'},
            ]
        });
        if (!product) throw "not found product";
        const size = product?.sizes?.find(size => size?.id == sizeId);
        if (!size) throw "not found size";
        const basketItem = await Basket.findOne({
            where: {
                userId,
                productId,
                sizeId
            }
        });
        if (size?.count == 0) throw "not enough count";
        if (basketItem) {
            if (size?.count <= basketItem?.count) throw "not enough count";
            basketItem.count += 1;
            await basketItem.save();
        } else {
            await Basket.create({
                userId,
                productId,
                sizeId,
                count: 1
            });
        }
    } catch (error) {
        console.log(error);

    }
}
async function getUserBasket (userId) {
    const basket = await Basket.findAll({
        where: {userId},
        include: [
            {model: Product, as: 'product'},
            {model: ProductColor, as: 'color'},
            {model: ProductSize, as: 'size'},
        ],
    });
    let totalAmount = 0;
    let totalDiscount = 0;
    let finalAmount = 0;
    let products = [];
    for (const item of basket) {
        const {product, size, color, count} = item;
        let productIndex = products.findIndex(i => i.id == product.id);
        let productData = products.find(i => i.id == product.id);
        if (!productData) {
            productData = {
                id: product.id,
                title: product.title,
                price: product.price,
                type: product.type,
                count: count,
                sizes: [],
                colors: []
            };
        } else {
            productData.count += count;
        }
        if (product?.type === "coloring") {
            totalAmount += Number(color.price);
            productData['colors'].push({
                id: color?.id,
                color_name: color?.color_name,
                price: color?.price,
                color_code: color?.color_code,
                count
            });
        } else if (product?.type === "sizing") {
            totalAmount += Number(size.price);
            productData['sizes'].push({
                id: size?.id,
                size: size?.size,
                price: size?.price,
                count
            });
        } else {
            totalAmount += Number(product.price);
        }
        console.log(productIndex);
        if (productIndex > -1) products[productIndex] = productData;
        else products.push(productData);

    }

    console.log(JSON.stringify(products, null, 2));
    console.log(totalAmount * 1000);

}
module.exports = {
    addSizeToBasket,
    getUserBasket
};