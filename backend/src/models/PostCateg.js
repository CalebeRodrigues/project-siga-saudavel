const { Sequelize } = require("sequelize");
const database = require("../../db");
const { Categoria } = require("./CategoriaModel");

const PostCategModel = database.define('post_categ', {
    ID: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    IDPost: {
        type: Sequelize.INTEGER,
        references: {
            model: 'posts',
            key: 'ID'
        }
    },
    IDCateg: {
        type: Sequelize.INTEGER,
        references: {
            model: 'categoria',
            key: 'ID'
        }
    }
});

// PostCategModel.belongsTo(Categoria.Model, {
//     constraints: true,
//     foreignKey: 'IDCateg'
// });

exports.PostCateg = PostCategModel;
