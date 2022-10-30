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

class Categoria {
    constructor(body) {
        this.body = body;
        this.categ = null;
    }

    async create() {
        this.cleanUp();

        const findByNome = await CategoriaModel.findOne({ where: { nome: this.body.nome } });

        if(findByNome) throw new Error("Já existe uma categoria criado com este nome.");

        this.categ = await CategoriaModel.create(this.body);
    }

    async update(ID) {
        this.cleanUp();

        const find = await CategoriaModel.findOne({ where: { ID } });

        if (!find) throw new Error("Não existe nenhuma categoria atrelada a este ID.");

        await CategoriaModel.update(
            {
                ...this.body,
            },
            { where: { ID } }
        );

        this.categ = await CategoriaModel.findOne({ where: { ID } });
    }

    // Limpa e estrutura o corpo base 
    cleanUp() {
        for(let key in this.body) {
            if(typeof(this.body[key]) !== "string") this.body[key] = '';
        }

        const nome = this.body.nome;

        this.body = {
            nome: (nome.length > 0) ? nome : '',
        }
    }

    // Static metodos
    static async findById(ID) {
        const categ = await CategoriaModel.findOne({ where: { ID } });

        if (!categ) throw new Error("Não existe nenhuma categoria atrelada a este ID.");

        return categ;
    }

    static async findByNome(nome) {
        const categ = await CategoriaModel.findOne({ where: { nome } });

        if (!categ) throw new Error("Não existe nenhuma categoria atrelada a este nome.");

        return categ;
    }

    static async findAll() {
        const all = await CategoriaModel.findAll();

        if (all.length == 0) throw new Error("Não existe nenhuma categoria adicionada no sistema.");

        return all;
    }
}

module.exports.Categoria = Categoria;
