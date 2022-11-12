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
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cpf: {
        type: Sequelize.STRING,
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

        for(let key in this.body) {
            if(this.body[key] === "") throw new Error("Favor preencher todos os campos!");
        }

        const findUserEqual = await UserModel.findOne({ where: { email: this.body.email } });
        if(findUserEqual) throw new Error("E-mail inserido já foi cadastrado no sistema.");


        // criptografando a senha
        const salt = bcryptjs.genSaltSync();
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);

        this.user = await UserModel.create(this.body);
    }

    async login() {
        if (!this.valida()) {
            throw new Error('Email inválido!');
        }

        this.user = await UserModel.findOne({
            where: { 
                email: this.body.email,
            }
        });

        this.user = (this.user != null && !bcryptjs.compareSync(this.body.senha, this.user.senha)) ? null : this.user;
        
        if (this.user == null) {
            throw new Error('Email ou senha incorretos!');
        }
    }

    async update(ID) {
        if(!this.valida()) throw new Error('E-mail inválido!');

        const existUser = await UserModel.findOne({ where: { ID } });

        if(!existUser) throw new Error("Não existe nenhum usuario atrelado a este ID.");

        await UserModel.update(
            { ...this.body },
            { where: { ID } }
        );
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
        for(let key in this.body) {
            if(typeof(this.body[key]) !== "string") this.body[key] = '';
        }

        this.body = {
            nome: this.body.nome || '',
            cpf: this.body.cpf || '',
            email: this.body.email || '',
            nick: this.body.nick || '',
            senha: this.body.senha || '',
            dataNasc: this.body.dataNasc || '',
        }
    }

    // Métodos static
    static async findById(id) {
        const user = await UserModel.findOne({ where: { ID: id } });
        
        if(!user) throw new Error("Não existe nenhum usuario atrelado a este id.");

        return user;
    }

    static async findAllUser() {
        const allUsers = await UserModel.findAll();

        if(allUsers.length == 0) throw new Error("Não existe nenhum usuario cadastrado no sistema.");

        return allUsers;
    }

    static async deleteById(id) {
        const user = await UserModel.findOne({ where: { ID: id } });
        
        if(!user) throw new Error("Não existe nenhum usuario atrelado a este id.");

        await user.destroy();
    }

    static get Model() {
        return UserModel;
    }
}

module.exports.User = User;
