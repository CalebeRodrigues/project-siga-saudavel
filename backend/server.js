const express = require("express");
const app = express();

const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const { middleWareGlobal } = require("./src/middlewares/middleware");

const routes = require("./routes");


app.use(cors());
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));;

app.use(cors(corsOptions));;

app.use(helmet());
app.use(express.urlencoded( {extended: true} )); 
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(middleWareGlobal);

app.use(routes);

const database = require('./db');

database.sync().then(() => {
    app.emit('online');
}).catch(e => console.log(e));

app.on('online', () => {
    app.listen(8080, () => {
        console.log('\n');
        console.log('Servidor online!');
        console.log('Acesse em: http://localhost:8080');
        console.log('Servidor ativo na porta: [8080]!');
        console.log('\n');
    })
});
