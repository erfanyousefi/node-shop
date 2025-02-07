const {Product, ProductDetail, ProductSize, ProductColor} = require("./product.model");

async function createProduct () {
    const sizingProduct = await Product.create({
        title: "T-Shirt",
        price: 25.99,
        type: "sizing",
        discount: 10,
        active_discount: true,
        count: 100,
        content: "T-shirt with a nice design",
    });
    const coloringProduct = await Product.create({
        title: "iphone",
        price: 0,
        type: "coloring",
        discount: 10,
        active_discount: true,
        count: 70,
        content: "T-shirt with a nice design",
    });
    // Add details
    await ProductDetail.bulkCreate([
        {productId: sizingProduct.id, key: "Material", value: "Cotton"},
        {productId: sizingProduct.id, key: "Brand", value: "Nike"},
    ]);
    await ProductDetail.bulkCreate([
        {productId: coloringProduct.id, key: "Battery", value: "50000"},
        {productId: coloringProduct.id, key: "Camera", value: "48MP"},
        {productId: coloringProduct.id, key: "RAM", value: "8GB"},
        {productId: coloringProduct.id, key: "Memory", value: "256GB"},
        {productId: coloringProduct.id, key: "Screen", value: "196-Rate"},
    ]);
    // Add sizes
    await ProductSize.bulkCreate([
        {productId: sizingProduct.id, size: "S", count: 10, price: 20.99},
        {productId: sizingProduct.id, size: "M", count: 15, price: 22.99},
        {productId: sizingProduct.id, size: "L", count: 5, price: 18.99},
        {productId: sizingProduct.id, size: "XL", count: 15, price: 23.99},
        {productId: sizingProduct.id, size: "XXL", count: 25, price: 24.00},
    ]);

    // Add colors
    await ProductColor.bulkCreate([
        {productId: coloringProduct.id, color_name: "Desert", color_code: "#FAD5A5", count: 10},
        {productId: coloringProduct.id, color_name: "Cotton", color_code: "#FDF3EA", count: 10},
        {productId: coloringProduct.id, color_name: "White", color_code: "#FFFFFF", count: 7},
        {productId: coloringProduct.id, color_name: "Black", color_code: "#000000", count: 5},
    ]);
}
async function getProductWithDetails (id) {
    const product = await Product.findByPk(id, {
        include: [
            {model: ProductDetail, as: 'details'},
        ]
    });
    // const product = await Product.findByPk(id);
    console.log(JSON.stringify(product, null, 2));
}
async function deleteProduct (id) {
    try {
        await Product.destroy({where: {id}});
        console.log(`Product with ID ${id} and all related data have been deleted.`);
    } catch (error) {
        console.error("Error deleting product:", error);
    }
}

module.exports = {
    createProduct,
    getProductWithDetails,
    deleteProduct
};