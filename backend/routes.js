const express = require("express");

const route = express.Router();

const UserController = require("./src/controllers/UserController");
const CategoriaController = require("./src/controllers/CategoriaController");
const PostController = require("./src/controllers/PostController");

route.get('/', (req, res) => {
    res.send("Siga Saudavel - API");
});

// User
route.get('/user/login', UserController.login);
route.get('/user/all', UserController.findAll);
route.get('/user/:id', UserController.findById);

route.post('/user/register', UserController.register);

route.put('/user/update/:id', UserController.update);

route.delete('/user/delete/:id', UserController.deleteById);

// Publications
route.get('/pub/all', PostController.findAll);
route.get('/pub/:id', PostController.findById);
route.get('/pub/user/:id', PostController.findByUser);

route.post('/pub/create', PostController.create);

// route.put('/pub/update/:id', PostController.update);

// route.delete('/pub/delete/:id', PostController.delete);

// Categorias
route.get('/categoria/all', CategoriaController.findAll);
route.get('/categoria/:id', CategoriaController.findById);

route.post('/categoria/create', CategoriaController.create);

route.put('/categoria/update/:id', CategoriaController.update);

module.exports = route;