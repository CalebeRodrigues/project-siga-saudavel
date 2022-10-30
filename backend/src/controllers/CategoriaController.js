const { Categoria } = require("../models/CategoriaModel");

exports.create = async (req, res) => {
    const server = new Categoria(req.body);

    try{
        await server.create();

        res.status(200).send(server.categ);
    }
    catch(e) {
        res.status(400).send(e.message);
    }
}

exports.update = async (req, res) => {
    const server = new Categoria(req.body);
    try {
        await server.update(req.params.id);
        
        res.status(200).send(server.categ);
    }
    catch(e) {
        res.status(400).send(e.message);
    }
}

exports.findById = async (req, res) => {
    try {
        const categ = await Categoria.findById(req.params.id);

        res.status(200).send(categ);
    }
    catch(e) {
        res.status(400).send(e.message);
    }
}

exports.findAll = async (req, res) => {
    try {
        const all = await Categoria.findAll();

        res.status(200).send(all);
    }
    catch(e) {
        res.status(400).send(e.message);
    }
}
