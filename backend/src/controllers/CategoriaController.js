const { Sequelize } = require("sequelize");
const database = require("../../db");

const CategoriaModel = database.define('categoria', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nome: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    }
})

