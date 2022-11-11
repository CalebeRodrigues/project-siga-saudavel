const { Sequelize } = require("sequelize");
const database = require("../../db");
const { Categoria } = require("./CategoriaModel");
const { User } = require("./UserModel");

const { PostCateg, PostCategClass } = require("./PostCateg");

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

PostModel.hasMany(PostCateg, {
    constraints: true,
    foreignKey: 'IDPost',
    foreignKeyConstraint: 'IDPost'
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

            const id = this.post['ID'];

            const categs = this.body['IDCateg'].split("%@");

            for(let value of categs) {
                if(value.length == 0) break;

                let categ = await Categoria.findById(value);

                if (!categ) throw new Error("Favor inserir pelo menos uma categoria valida para a publicação.");

                await PostCateg.create({
                    IDPost: id,
                    IDCateg: categ['ID']
                });
            }
        }
        catch(e) {
            if(this.post) {
                PostCateg.destroy({
                    where: {
                        IDPost: this.post['ID']
                    }
                });

                this.post.destroy();
            }
            // throw new Error(e.message);
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
            IDCateg: this.body.IDCateg
        };
    }

    // Static methods
    static async findById(ID) {
        const post = await PostModel.findOne({ where: { ID }, include: [PostCateg] });
        
        const post_categs = post['post_categs'];
        const categs = [];

        for(let value of post_categs) {
            const temp = await Categoria.findById(value['IDCateg']);
            categs.push({ nome: temp.nome});
        }

        console.log("----------------------------------------------------\n");
        console.log(`Categoria: ${categs}`)
        console.log("\n----------------------------------------------------");


        if (!post) throw new Error("Não existe nenhuma publicação atrelada a este ID");

        const obj = this.estruturaObj(post, categs);

        return obj;
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

    static get Model() {
        return PostModel;
    }

    static estruturaObj({titulo, ingredientes, imagem, conteudo, IDUser, createdAt, updatedAt}, categorias) {
        const obj = {
            titulo, ingredientes, imagem,
            conteudo, IDUser, createdAt, updatedAt,
            categorias
        };

        return obj;
    }
}

exports.Post = Post;
