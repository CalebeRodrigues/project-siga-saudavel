const { User } = require("../models/UserModel");

module.exports.register = async (req, res) => {
    const user = new User(req.body);

    try {
        await user.register();

        res.status(200).send(user.user);
    }
    catch(e) {
        res.status(400).send(e.message);
    }
};

exports.login = async (req, res) => {
    try {        
        const server = new User(req.body);

        await server.login();

        
        res.status(200).send(server.user);
    }
    catch(e) {
        res.status(400).send(e.message);
    }
};

module.exports.update = async (req, res) => {
    const user = new User(req.body);

    try {
        user.update(req.params.id);

        res.status(200).send("Usuario atualizado com sucesso.");
    }
    catch(e) {
        res.status(400).send(e.message);
    }
}

module.exports.findById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        res.status(200).send(user);
    }
    catch(e) {
        res.status(400).send(e.message);
    }
};

module.exports.findAll = async (req, res) => {
    try {
        const users = await User.findAllUser();

        res.status(200).send(users);
    }
    catch(e) {
        res.status(400).send(e.message);
    }
};

module.exports.deleteById  = async (req, res) => {
    try {
        await User.deleteById(req.params.id);

        res.status(200).send("Usuario excluido com sucesso.");
    }
    catch(e) {
        res.status(400).send(e.message);
    }
}

