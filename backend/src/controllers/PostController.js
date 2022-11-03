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
