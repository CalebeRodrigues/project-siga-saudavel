const express = require("express");

const route = express.Router();

route.get('/', (req, res) => {
    res.send("Siga Saudavel - API");
});


module.exports = route;