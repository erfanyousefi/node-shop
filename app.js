const express = require("express");
const {User} = require("./modules/user/user.model");
const app = express();
app.listen(2001);
console.log("http://localhosy:2001");