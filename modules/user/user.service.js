const {User, Otp} = require("./user.model");

async function createUser () {
    await User.bulkCreate([
        {
            fullname: "Erfan Yousefi",
            mobile: "09917753558",
            wallet_balance: 1000000,
        },
        {
            fullname: "Milad Azami",
            mobile: "09332255768",
            wallet_balance: 500000,
        },
    ]);
    await Otp.bulkCreate([
        {userId: 1, code: "12356", expires_in: new Date(Date.now() + (1000 * 60 * 1))},
        {userId: 2, code: "56485", expires_in: new Date(Date.now() + (1000 * 60 * 2))},
    ]);
}
async function findByMobile (mobile) {
    const user = await User.findOne({
        where: {mobile}, include: [
            {model: Otp, as: "otp"}
        ]
    });
    if (!user) throw "user not found";
    console.log(JSON.stringify(user, null, 2));
}

module.exports = {
    createUser,
    findByMobile
};