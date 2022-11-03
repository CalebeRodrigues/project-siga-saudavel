const { Sequelize } = require("sequelize");
const database = require("../../db");
const { User } = require("./UserModel");

const PostModel = database.define('post', {
    ID: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ingredientes: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    conteudo: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

PostModel.belongsTo(User.Model, {
    constraints: true,
    foreignKey: 'IDUser',
});

class Post {
    constructor(body){
        this.body = body;
        this.post = null;

        this.cleanUp();
    }

    async create() {
        this.cleanUp();

        const user = await User.findById(this.body.IDUser);

        if (!user) throw new Error("Não existe nenhum usuario atrelado a este ID.");

        try {
            this.post = await PostModel.create(this.body);
        }
        catch(e) {
            throw new Error("Ocorreu um erro inesperado ao realizar a publicação.");
        } 
    }

    cleanUp() {
        const idUser = this.body['IDUser'];

        for(let key in this.body){
            if(typeof this.body[key] !== "string") this.body[key] = '';
        }

        this.body = {
            ...this.body,
            titulo: this.body.titulo,
            ingredientes: this.body.ingredientes,
            imagem: this.body.imagem,
            conteudo: this.body.conteudo,
            IDUser: Number(idUser),
        };
    }

    // Static methods
    static async findById(ID) {
        const post = await PostModel.findOne({ where: { ID }});

        if (!post) throw new Error("Não existe nenhuma publicação atrelada a este ID");

        return post;
    }

    static async findByUser(IDUser) {
        const post = await PostModel.findAll({ where: { IDUser }});

        if (post.length == 0) {
            const user = await User.Model.findOne({ where: { ID: IDUser } });

            if(user) throw new Error("Ainda não existem publicações feitas por este usuario.");

            throw new Error("Não existe um usuario atrelado a este ID;");
        }

        return post;
    }

    static async findAll() {
        const posts = await PostModel.findAll();

        if(posts.length == 0) throw new Error("Ainda não existem publicações na plataforma.");

        return posts;
    }
}

exports.Post = Post;
