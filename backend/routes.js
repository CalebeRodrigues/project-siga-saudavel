const express = require("express");

const route = express.Router();

const UserController = require("./src/controllers/UserController");
const CategoriaController = require("./src/controllers/CategoriaController");

route.get('/', (req, res) => {
    res.send("Siga Saudavel - API");
});

// User
route.get('/user/all', UserController.findAll);
route.get('/user/:id', UserController.findById);

route.post('/user/register', UserController.register);

route.put('/user/update/:id', UserController.update);

route.delete('/user/delete/:id', UserController.deleteById);

// Categorias
route.get('/categoria/all', CategoriaController.findAll);
route.get('/categoria/:id', CategoriaController.findById);

route.post('/categoria/create', CategoriaController.create);

route.put('/categoria/update/:id', CategoriaController.update);

module.exports = route;