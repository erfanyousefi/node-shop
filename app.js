const express = require("express");
const initDatabase = require("./configs/models.initial");
async function main () {
    const app = express();
    await initDatabase({force: true});
    app.listen(2001);
    console.log("http://localhosy:2001");
}
main();