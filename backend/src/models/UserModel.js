const { Sequelize } = require("sequelize");
const database = require("../../db");

const validator = require("validator");
const bcryptjs = require("bcrypt");

const UserModel = database.define('pessoa', {
    ID: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cpf: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    nick: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    dataNasc: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

class User {
    constructor(body) {
        this.body = body;
        this.user = null;
    }

    async register() {
        if(!this.valida()) throw new Error('E-mail inválido!');

        for(let value of this.body) {
            if(value === "") throw new Error("Favor preencher todos os campos!");
        }

        const findUserEqual = await UserModel.findOne({ where: { email: this.body.email } });

        if(findUserEqual) throw new Error("E-mail inserido já foi cadastrado no sistema.");

        // criptografando a senha
        const salt = bcryptjs.genSaltSync();
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);

        this.user = await UserModel.create(this.body);
    }

    valida() {
        this.cleanUp();
        
        if(!validator.isEmail(this.body.email)){
            return false;
        }
        
        return true;        
    }

    // Limpa e estrutura o corpo base 
    cleanUp() {
        for(let value of this.body) {
            if(typeof(value) !== "string") value = '';
        }

        this.body = {
            nome: this.body.nome,
            cpf: this.body.cpf,
            nick: this.body.nick,
            senha: this.body.senha,
            dataNasc: this.body.dataNasc,
        }
    }
}

module.exports.User = User;
