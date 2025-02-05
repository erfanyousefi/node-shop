const {Product, ProductDetail, ProductSize, ProductColor} = require("./product.model");

async function createProduct () {
    const product = await Product.create({
        title: "T-Shirt",
        slug: "t-shirt",
        price: 25.99,
        type: "coloring"
    });

    // Add details
    await ProductDetail.bulkCreate([
        {productId: product.id, key: "Material", value: "Cotton"},
        {productId: product.id, key: "Brand", value: "Nike"}
    ]);

    // Add sizes
    await ProductSize.bulkCreate([
        {productId: product.id, size: "S", count: 10, price: 20.99},
        {productId: product.id, size: "M", count: 15, price: 22.99}
    ]);

    // Add colors
    await ProductColor.bulkCreate([
        {productId: product.id, color_name: "Red", color_code: "#FF0000", count: 5},
        {productId: product.id, color_name: "Blue", color_code: "#0000FF", count: 7}
    ]);
}
async function getProductWithDetails (id) {
    const product = await Product.findByPk(id, {
        include: [
            {model: ProductDetail, as: "details"},
            {model: ProductSize, as: "sizes"},
            {model: ProductColor, as: "colors"}
        ]
    });
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