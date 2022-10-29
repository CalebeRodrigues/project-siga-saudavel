const { User } = require("../models/UserModel");
const { userMock } = require("../mock/UserMock");

module.exports.register = (req, res) => {
    const user = new User(userMock);

    try {
        user.register();

        res.status(200).send(user);
    }
    catch(e) {
        res.status(400).send(e.message);
    }
}
