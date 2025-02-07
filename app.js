const express = require("express");
const initDatabase = require("./configs/models.initial");
const {createProduct, getProductWithDetails} = require("./modules/product/product.service");
const {createUser, findByMobile} = require("./modules/user/user.service");
const {addSizeToBasket, getUserBasket} = require("./modules/basket/basket.service");
async function main () {
    const app = express();
    await initDatabase();
    app.listen(2001);
    console.log("http://localhosy:2001");
    // await createProduct();
    // await getProductWithDetails(1);
    // await createUser()
    // await findByMobile("09917753558");
    // await addSizeToBasket(3, 1, 6);
    // await getUserBasket(1);

}
main();