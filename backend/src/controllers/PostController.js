const { Post } = require("../models/PostModel");

exports.create = async (req, res) => {
    const pub = new Post(req.body);

    try {
        await pub.create();

        res.status(200).send(pub.post);
    }
    catch(e) {
        res.status(400).send(e.message);
    }
}

exports.findAll = async (req, res) => {
    try {
        const pubs = await Post.findAll();

        res.status(200).send(pubs);
    }
    catch(e) {
        res.status(400).send(e.message);
    }
}

exports.findById = async (req, res) => {
    try {
        const pub = await Post.findById(req.params.id);

        res.status(200).send(pub);
    }
    catch(e) {
        res.status(400).send(e.message);
    }
}

exports.findByUser = async (req, res) => {
    try {
        const pub = await Post.findByUser(req.params.id);

        res.status(200).send(pub);
    }
    catch(e) {
        res.status(400).send(e.message);
    }
}
