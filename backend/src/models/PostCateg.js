const { Sequelize } = require("sequelize");
const database = require("../../db");
const { Categoria } = require("./CategoriaModel");
const { Post } = require("./PostModel");

const PostCategModel = database.define('post_categ', {
    ID: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    }
});

PostCategModel.belongsTo(Categoria.Model, {
    constraints: true,
    foreignKey: 'IDCateg'
});

PostCategModel.belongsTo(Post.Model, {
    constraints: true,
    foreignKey: 'IDPost'
});

exports.PostCateg = PostCategModel;
