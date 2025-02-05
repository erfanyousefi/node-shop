const {Sequelize} = require("sequelize");

// const sequelize = new Sequelize({
//     dialect: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "phpmyadmin",
//     password: "root",
//     database: "shop"
// });
const sequelize = new Sequelize({
    dialect: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "shop"
});
sequelize.authenticate().then(async () => {
    // await sequelize.sync({alter: true});
    await sequelize.sync({alter: true});
    console.log("connected to MySQL");
}).catch(err => {
    console.log("Cannot connect to MySQL, error: ", err?.message);
});
module.exports = sequelize; 